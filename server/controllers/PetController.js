const Pet = require("../models/PetModel");
const User = require("../models/UserModel");
const petFormValidator = require("../helpers/petFormValidator");
const messages = require("../helpers/messages");
const getTokenData = require("../helpers/getTokenData");
const { isValidObjectId } = require("mongoose");
const removeImageFromDisk = require("../helpers/removeImageFromDisk");

class PetController {
    // Creates the pet on the collection
    static async create(req, res) {
        const { name, breed, color, age } = req.body;
        let images = req.file;

        if (!petFormValidator(name, breed, color, age, images)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        if (images.size >= 100000) {
            removeImageFromDisk(images.filename);
            res.status(415).json({ message: messages.imgSize });
            return;
        }

        images = images.filename;

        const token = req.headers.authorization;
        const owner = getTokenData(token).data; // user id

        const pet = new Pet({
            name,
            breed,
            color,
            age,
            images,
            owner,
        });
        await pet.save();

        res.status(200).json({ message: messages.petCreated });
    }

    // Updates the pet in database
    static async update(req, res) {
        const { id, name, breed, color, age } = req.body;
        let images = req.file;

        if (!petFormValidator(name, breed, color, age, images)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        if (images.size >= 100000) {
            removeImageFromDisk(images.filename);
            res.status(415).json({ message: messages.imgSize });
            return;
        }

        images = images.filename;

        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        const pet = await Pet.findById(id);
        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        if (pet.owner != user) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        pet.images.forEach((image) => {
            removeImageFromDisk(image);
        });

        await Pet.updateOne(
            { _id: id },
            {
                name,
                breed,
                color,
                age,
                images,
            }
        );

        res.status(200).json({ message: messages.petUpdated });
    }

    // Removes the pet from collection
    static async remove(req, res) {
        const id = req.params.id;

        if (!id || !isValidObjectId(id)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        const pet = await Pet.findById(id);
        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        if (pet.owner != user) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        pet.images.forEach((image) => {
            removeImageFromDisk(image);
        });

        await Pet.deleteOne({ _id: id });

        res.status(200).json({ message: messages.petRemoved });
    }

    // Get pet data from collection
    static async getPetInfo(req, res) {
        const id = req.params.id;

        if (!id || !isValidObjectId(id)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        const pet = await Pet.findById(id).select("-_id name breed color age images owner").lean();

        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        // Get user
        // const token = req.headers.authorization;
        // const user = getTokenData(token).data;

        // Checks if the user is the owner
        // if (pet.owner != user) {
        //     res.status(403).json({ message: messages.forbidden });
        //     return;
        // }

        res.status(200).json({ message: messages.petData, ...pet });
    }

    // Adds the user in pendingOwners list
    static async schedule(req, res) {
        const id = req.body.id;

        if (!id || !isValidObjectId(id)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        const pet = await Pet.findById(id);
        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        if (pet.newOwner) {
            res.status(406).json({ message: messages.petAdopted });
            return;
        }

        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        if (pet.owner == user) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        let isUserInList = false;
        if (pet.pendingOwners) {
            pet.pendingOwners.forEach((value) => {
                if (value == user) isUserInList = true;
            });
        }

        if (isUserInList) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        let pendingOwners = pet.pendingOwners;
        pendingOwners.push(user);

        await Pet.updateOne({ _id: id }, { pendingOwners });

        const phone = await User.findById(pet.owner).select("-_id phone").lean();

        res.status(200).json({ message: messages.petScheduled, ...phone });
    }

    // Concludes the adoption process
    static async finishAdoption(req, res) {
        const { petId, newOwnerId } = req.body;

        if (!petId || !newOwnerId || !isValidObjectId(petId) || !isValidObjectId(newOwnerId)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        const pet = await Pet.findById(petId).lean();
        if (!pet) {
            res.status(404).json({ message: messages.petNotFound });
            return;
        }

        if (pet.newOwner) {
            res.status(403).json({ message: messages.petAdopted });
            return;
        }

        const newOwner = await User.findById(newOwnerId).lean();
        if (!newOwner) {
            res.status(404).json({ message: messages.userNotFound });
            return;
        }

        let isNewOwnerOnList = false;
        pet.pendingOwners.forEach((value) => {
            if (value == newOwnerId) isNewOwnerOnList = true;
        });

        if (!isNewOwnerOnList) {
            res.status(500).json({ message: messages.error });
            return;
        }

        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        if (!isValidObjectId(user)) {
            res.status(404).json({ message: messages.userNotFound });
            return;
        }

        if (pet.owner !== user) {
            res.status(403).json({ message: messages.forbidden });
            return;
        }

        await Pet.updateOne({ _id: petId }, { pendingOwners: [], newOwner: newOwnerId });

        res.status(200).json({ message: messages.petFinish });
    }

    // Returns all pets
    static async getAllPets(req, res) {
        const pets = await Pet.find().lean();

        res.status(200).json({ message: messages.allPets, pets });
    }

    // Returns all my pets
    static async getMyPets(req, res) {
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        const myPets = await Pet.find({ owner: user }).lean();

        // TO DO: Get pending owners name

        res.status(200).json({ message: messages.myPets, myPets });
    }

    // Returns all my adoptions
    static async getMyAdoptions(req, res) {
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        const myAdoptions = await Pet.find({ newOwner: user }).lean();

        res.status(200).json({ message: messages.myAdoptions, myAdoptions });
    }
}

module.exports = PetController;

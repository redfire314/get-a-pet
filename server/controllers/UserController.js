const bcryptjs = require("bcryptjs");
const User = require("../models/UserModel");
const Pet = require("../models/PetModel");
const userFormValidator = require("../helpers/userFormValidator");
const loginFormValidator = require("../helpers/loginFormValidator");
const generateToken = require("../helpers/generateToken");
const getTokenData = require("../helpers/getTokenData");
const messages = require("../helpers/messages");

class UserController {
    // Creates the user on the collection
    static async create(req, res) {
        const { name, email, phone, zip, password, password2 } = req.body;

        if (!userFormValidator(name, email, phone, zip, password, password2)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        const userExists = await User.findOne({ email }).select("email");
        if (userExists) {
            res.status(200).json({ message: messages.emailBusy });
            return;
        }

        const salt = bcryptjs.genSaltSync();
        const hashedPass = bcryptjs.hashSync(password, salt);

        const user = new User({
            name,
            email,
            phone,
            zipCode: zip,
            password: hashedPass,
        });
        await user.save();

        const token = generateToken({ data: user.id }, "3h");

        res.status(200).json({ message: messages.userCreated, token });
    }

    // Checks if the user exists and returns a token
    static async login(req, res) {
        const { email, password } = req.body;

        if (!loginFormValidator(email, password)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        const user = await User.findOne({ email });
        if (user) {
            const isSamePass = bcryptjs.compareSync(password, user.password);
            if (!isSamePass) {
                res.status(200).json({ message: messages.userNotFound });
                return;
            }
        } else {
            res.status(200).json({ message: messages.userNotFound });
            return;
        }

        const token = generateToken({ data: user.id }, "3h");

        res.status(200).json({ message: messages.userLoggedIn, token });
    }

    // Updates the user in database
    static async update(req, res) {
        const { name, email, phone, zip, password, password2 } = req.body;

        if (!userFormValidator(name, email, phone, zip, password, password2)) {
            res.status(400).json({ message: messages.badRequest });
            return;
        }

        const token = req.headers.authorization;
        const data = getTokenData(token).data; // user id

        const user = await User.findOne({ email });
        if (user && user.id !== data) {
            res.status(200).json({ message: messages.emailBusy });
            return;
        }

        const salt = bcryptjs.genSaltSync();
        const hashedPass = bcryptjs.hashSync(password, salt);

        await User.updateOne(
            { id: data },
            {
                name,
                email,
                phone,
                zipCode: zip,
                password: hashedPass,
            }
        );

        res.status(200).json({ message: messages.userUpdated });
    }

    // Gets pets that are adopted by the user
    static async getPetsAdopted(req, res) {
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        const petsAdopted = await Pet.find({ newOwner: user }).select("name breed color age images").lean();

        res.status(200).json({ messages: messages.usersAdopted, petsAdopted });
    }

    // Get user pets from collection
    static async getUserPets(req, res) {
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        const pets = await Pet.find({ owner: user }).select("name breed color age images pendingOwners newOwner").lean();

        res.status(200).json({ messages: messages.usersPet, pets });
    }

    // Get user info for update form
    static async getUserInfo(req, res) {
        const token = req.headers.authorization;
        const user = getTokenData(token).data; // user id

        const userDb = await User.findById(user).select("-_id name email phone zipCode").lean();

        res.status(200).json({ message: messages.userData, ...userDb });
    }
}

module.exports = UserController;

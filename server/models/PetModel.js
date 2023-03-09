const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = {
    name: {
        type: String,
        require: true,
    },
    breed: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    images: {
        type: Array,
        require: true,
    },
    owner: {
        type: String,
        require: true,
    },
    pendingOwners: {
        type: Array,
    },
    newOwner: {
        type: Object,
    },
};

const Pet = mongoose.model("Pet", new Schema(schema, { timestamps: true }));

module.exports = Pet;

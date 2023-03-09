const path = require("path");
const multer = require("multer");
const messages = require("./messages");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/upload/images/pets");
    },
    filename: (req, file, cb) => {
        let unique = Math.floor(Math.random() * 999);
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}-${unique}${ext}`;
        cb(null, name);
    },
});

const filter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|webp)$/)) {
        return cb(new Error(messages.imgExt));
    }

    cb(undefined, true);
};

const upload = multer({
    storage,
    fileFilter: filter,
});

module.exports = upload;

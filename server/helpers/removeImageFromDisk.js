const fs = require("fs");

function removeImageFromDisk(img) {
    const path = "public\\upload\\images\\pets\\";

    fs.unlinkSync(`${path}${img}`, (err) => {
        console.error(err);
    });
}

module.exports = removeImageFromDisk;

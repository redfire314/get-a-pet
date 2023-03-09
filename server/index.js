require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conn = require("./db/conn");
const apisRoutes = require("./routes/api/apisRoutes");

const app = express();
const port = process.env.EXPRESS_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/api", apisRoutes);

conn()
    .then((success) => {
        console.log("Mongoose connected.");

        app.listen(port, () => {
            console.log(`Server running on port ${port}.`);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to the database.", err);
    });

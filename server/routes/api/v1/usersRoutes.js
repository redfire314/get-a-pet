const router = require("express").Router();
const userController = require("../../../controllers/UserController");
const auth = require("../../../middlewares/auth");

router.post("/create", userController.create);
router.post("/login", userController.login);

router.patch("/update", auth, userController.update);

router.get("/adopted", auth, userController.getPetsAdopted);
router.get("/pets", auth, userController.getUserPets);
router.get("/profile", auth, userController.getUserInfo);

module.exports = router;

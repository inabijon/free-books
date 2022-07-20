const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.post("/signup", userController.createUser);
router.post("/login", userController.userLogin);
router.get("/users", userController.users);

module.exports = router;

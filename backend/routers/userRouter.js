const express = require("express");
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", authMiddleware, userController.logout);

module.exports = router;

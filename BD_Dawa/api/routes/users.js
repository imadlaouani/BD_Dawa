const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.get("/signup",UserController.signup_get);
router.post("/signup", UserController.signup);
router.get('/login', UserController.login_get);
router.post("/login", UserController.login_post);
router.get("/logout", UserController.logout_get);


router.delete("/:userId", UserController.delete_user);

module.exports = router;

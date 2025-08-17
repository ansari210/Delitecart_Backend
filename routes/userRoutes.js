const express = require("express");
const {register,login,logout,genrate_otp,verify_otp,reset_password,mobile_otp} = require("../services/userService");
const auth = require("../middleware/auth");

const router = express.Router();

// Public lki
router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout);
router.post("/forget_password/otp",genrate_otp);
router.post("/forget_password/otp_verify",verify_otp)
router.post("/forget_password/password_reset",reset_password);
// router.post("/forget_password/mobile_otp",mobile_otp)

// Protected
// router.get("/", auth, getUsers);
// router.get("/:id", auth, getUser);
// router.put("/:id", auth, updateUser);
// router.delete("/:id", auth, deleteUser);

module.exports = router;

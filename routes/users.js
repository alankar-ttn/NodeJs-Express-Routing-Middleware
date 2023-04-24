const express = require("express");
const { register, login, getProfile } = require("../controller/auth");
const { validateRegister, validateLogin, validateUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", validateLogin, async (req, res) => {
    await login(req, res);
});

router.post("/register", validateRegister, async (req, res) => {
    await register(req, res);
});

router.get("/profile", validateUser, async (req, res) => {
    await getProfile(req, res);
})

module.exports = router;
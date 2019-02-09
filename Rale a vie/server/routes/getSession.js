const { Router } = require("express");
const { generateToken } = require("../Authentication");
const verifyUser = require("../controllers/verifyUser");

const router = Router();

router.post("/login", async (req, res) => {
    let userToLogin = null;

    try {
        userToLogin = await verifyUser(
            req.body.user_email,
            req.body.user_password
        );
    } catch (error) {
        console.log("Erreur dans verifyUser :", error);
        return res.status(500).json(error.message);
    }

    res.cookie("token", generateToken(userToLogin.user_id));

    res.status(200).send(`Bienvenue, ${userToLogin.user_pseudo}`);
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");

    res.status(200).send("token deleted");
});

module.exports = router;

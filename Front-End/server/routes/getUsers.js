const { Router } = require("express");

const queries = require("../database/connexion");
const {
    getUserId,
    getUsers,
    addUsers,
    editUsers,
    deleteUsers,
    getOneUser
} = require("../controllers/users");
const { generateToken } = require("../Authentication");

const router = Router();

// Get all user Id
router.get("/all", async (req, res) => {
    let queryResult = null;

    try {
        queryResult = await getUsers(queries);
    } catch (error) {
        console.log(error);
        return res.status(500).send(new Error("Erreur dans Users", error));
    }

    return res.status(200).send(queryResult);
});

// probleme requete
router.get("/userInfos", async (req, res) => {
    let getOneResult = null;

    try {
        getOneResult = await getUserId(queries);
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error("Erreur dans One User", error));
    }

    return res.status(200).send(getOneResult);
});

router.post("/add", async (req, res) => {
    const userInfos = {
        firstname: req.body.user.firstname,
        lastname: req.body.user.lastname,
        email: req.body.user.email,
        password: req.body.user.password,
        pseudo: req.body.user.pseudo,
        type: req.body.user.type
    };
    try {
        const addedUser = await addUsers(userInfos);
        const token = generateToken(addedUser.user_id);
        res.cookie("token", token);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }

    return res.status(200).send(userInfos);
});

router.put("/edit/:id", async (req, res) => {
    let editUsersResult = null;

    try {
        editUsersResult = await editUsers(req.params.id, {
            firstname: req.body.user_firstname,
            lastname: req.body.user_lastname,
            email: req.body.user_email,
            password: req.body.user_password,
            pseudo: req.body.user_pseudo,
            type: req.body.user_type
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error("Erreur dans Edit User", error));
    }

    return res.status(200).send(editUsersResult.rows);
});

router.delete("/delete/:id", async (req, res) => {
    let deleteUserResult = null;

    try {
        deleteUserResult = await deleteUsers(req.params.id);
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error("Erreur dans Delete User", error));
    }

    return res.status(200).send(deleteUserResult);
});

module.exports = router;

const { Router } = require('express');

const queries = require('../database/connexion');
const {
    getUsers,
    addUsers,
    editUsers,
    deleteUsers,
    getOneUser
} = require('../controllers/users');

const router = Router();

router.get('/all', async (req, res) => {
    let queryResult = null;

    try {
        queryResult = await getUsers();
    } catch (error) {
        console.log(error);
        return res.status(500).send(new Error("Erreur dans Users", error));
    }

    return res.status(200).send(queryResult);
});

router.get('/:id', async (req, res) => {
    let getOneResult = null;

    try {
        getOneResult = await getOneUser(req.params.id)
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .send(new Error("Erreur dans One User", error));
    }

    return res.status(200).send(getOneResult.rows);
})

router.post('/add', async (req, res) => {
    const userInfos = {
        firstname: req.body.user_firstname,
        lastname: req.body.user_lastname,
        email: req.body.user_email,
        password: req.body.user_password,
        pseudo: req.body.user_pseudo,
        type: req.body.user_type
    }
    try {
        await addUsers(userInfos)
    } catch (error) {
        console.log(error);
        return res.status(500).send(new Error("Erreur dans AddUsers", error));
    }

    return res.status(200).send(userInfos);
})

router.put('/edit/:id', async (req, res) => {
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
        res
        .status(500)
        .send(new Error("Erreur dans Edit User", error));
    }

    return res.status(200).send(editUsersResult.rows);
});

router.delete('/delete/:id', async (req, res) => {
    let deleteUserResult = null;

    try {
        deleteUserResult = await deleteUsers(req.params.id);
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .send(new Error("Erreur dans Delete User", error));
    }

    return res.status(200).send(deleteUserResult);
});

module.exports= router;

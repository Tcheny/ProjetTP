const { Router } = require('express');

const queries = require('../database/connexion');
const { getUsersId, addUsers, editUsers } = require('../controllers/users');
const { generateToken } = require('../Authentication');

const router = Router();

// Get all user Id
router.get('/all', async (req, res) => {
    let queryResult = null;

    try {
        queryResult = await getUsersId(queries);
    } catch (error) {
        console.log(error);
        return res.status(500).send(new Error('Erreur dans Users', error));
    }

    return res.status(200).send(queryResult);
});

router.post('/add', async (req, res) => {
    const userInfos = {
        firstname: req.body.user.firstname,
        lastname: req.body.user.lastname,
        email: req.body.user.email,
        password: req.body.user.password,
        pseudo: req.body.user.pseudo,
        type: req.body.user.type,
        infos: req.body.user.infos,
    };

    try {
        const addedUser = await addUsers(userInfos);
        const token = generateToken(addedUser.user_id);
        res.cookie('token', token);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }

    return res.status(200).send(userInfos);
});

router.post('/edit', async (req, res) => {
    let editUsersResult = null;

    try {
        editUsersResult = await editUsers(req.body.user_id, {
            firstname: req.body.user.user_firstname,
            lastname: req.body.user.user_lastname,
            email: req.body.user.user_email,
            password: req.body.user.user_password,
            pseudo: req.body.user.user_pseudo,
            infos: req.body.user.user_infos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error('Erreur dans Edit User', error));
    }

    return res.status(200).send(editUsersResult);
});

module.exports = router;

import { Router } from 'express';
import auth from '../controllers/auth'

import queries from '../database/connexion';
import {
    getUsers,
    addUsers,
    editUsers,
    deleteUsers,
    getOneUser
} from '../controllers/users';

import { createOne, getOne } from '../controllers/registrer'

const router = Router();

router.get('/all', async (req, res) => {
    let queryResult = null;

    try {
        queryResult = await getUsers(queries);
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .send(new Error("Erreur dans Users", error));
    }

    return res.status(200).send(queryResult.rows);
});





// TEST SARA

router.get('/user', async (req, res) => {
    console.log("GETONE HEERRRE:", req.query)

    let queryResult = null;

    try {
        queryResult = await getOne(req.query);
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .send(new Error("Erreur dans Users", error));
    }

    return res.status(200).send(queryResult.rows);
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

router.get('/:email', async (req, res) => {
    let getOneUSERResult = null;

    try {
        getOneUSERResult = await getOne(req.body)
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .send(new Error("Erreur dans One User", error));
    }

    return res.status(200).send(getOneUSERResult.rows);
})

router.post('/add', async (req, res) => {
    console.log(req.body)

    let addUsersResult = null;
    try {
        addUsersResult = await createOne({
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
        .send(new Error("Erreur dans Add User", error));
    }

    return res.status(200).send(addUsersResult.rows);
});

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


export default router;

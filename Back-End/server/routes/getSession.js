import { Router } from 'express';

import queries from '../database/connexion';
import auth from '../controllers/auth';
import { addUsers } from '../controllers/users';
import { createOne , getOne } from '../controllers/registrer';

const router = Router();


router.post('/register', async (req, res) => {
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

router.post('/login', auth)

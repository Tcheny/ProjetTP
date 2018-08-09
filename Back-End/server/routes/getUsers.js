import { Router } from 'express';

import queries from '../database/connexion';

import { getUsers,
         insertUsers,
         editUsers } from '../controllers/users';

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

router.post('/add', async (req, res) => {
  let insertUsersResult = null;

  try {
    insertUsersResult = await insertUsers({
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

  return res.status(200).send(insertUsersResult.rows);
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

export default router;
import { Router } from 'express';

import queries from '../database/connexion';
import { getUsers,
         insertUsers,
         editUsers,
         deleteUsers,
         getOneUser
        }
        from '../controllers/users';

const router = Router();

router.get('/users', async (req, res) => {
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

router.get('/user/:id', async (req, res) => {
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

router.post('/user/add', async (req, res) => {
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

router.put('/user/edit/:id', async (req, res) => {
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

router.delete('/user/delete/:id', async (req, res) => {
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
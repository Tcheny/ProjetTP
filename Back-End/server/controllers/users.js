const SQL = require("sql-template-strings");

import client from '../database/connexion';

const getUsers = async () => {
    const query = SQL`
        SELECT
            *
        FROM
            users
    `;

    // execute la requete SQL
    const queryResult = await client.query(query);
    return queryResult;
};

const getOneUser = async (id) => {
    const getOne = SQL`
        SELECT
            *
        FROM users
        WHERE user_id = ${id}
    `;

    const getOneResult = await client.query(getOne);
    return getOneResult;
};

const addUsers = async (userInfos) => {
    const addUser = SQL`
        INSERT INTO users (
            user_firstname,
            user_lastname,
            user_email,
            user_password,
            user_pseudo,
            user_type
        ) VALUES (
            ${userInfos.firstname},
            ${userInfos.lastname},
            ${userInfos.email},
            ${userInfos.password},
            ${userInfos.pseudo},
            ${userInfos.type}
        ) RETURNING *
    `;

    const addUserResult = await client.query(addUser);
    return addUserResult;
};

const editUsers = async (id, userInfos) => {
    const editUser = SQL`
        UPDATE users
        SET user_firstname = ${userInfos.firstname},
            user_lastname = ${userInfos.lastname},
            user_email = ${userInfos.email},
            user_password = ${userInfos.password},
            user_pseudo = ${userInfos.pseudo},
            user_type = ${userInfos.type}
        WHERE user_id = ${id}
        RETURNING *
    `;

        const editUserResult = await client.query(editUser);
        return editUserResult;
};

const deleteUsers = async(id) => {
    const deleteUser = SQL`
        DELETE FROM users
        WHERE user_id = ${id}
        RETURNING *
    `;

    const deleteUserResult =  await client.query(deleteUser);
    return deleteUserResult;
};

module.exports = {
  getUsers,
  addUsers,
  editUsers,
  deleteUsers,
  getOneUser
};

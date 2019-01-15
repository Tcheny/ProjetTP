const SQL = require("sql-template-strings");

import client from '../database/connexion';

const createOne = async (newUser) => {
    const query = SQL`
        INSERT INTO users(
            user_firstname,
            user_lastname,
            user_email,
            user_password,
            user_pseudo,
            user_type
        ) VALUES (
            ${newUser.firstname},
            ${newUser.lastname},
            ${newUser.email},
            ${newUser.password},
            ${newUser.pseudo},
            ${newUser.type}
        ) RETURNING *
    `;

    const queryResult = await client.query(query);
    return queryResult;

}

const getOne = async (user) => {
    const getOne = SQL`
        SELECT
            *
        FROM users
        WHERE user_email = ${user.user_email}
    `;

    const getOneResult = await client.query(getOne);
    return getOneResult;
};

module.exports = {
    createOne,
    getOne
}

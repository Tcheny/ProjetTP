const SQL = require("sql-template-strings");

import client from '../database/connexion';

const createOne = async (newUser) => {
    const query = SQL`
        INSERT INTO users(
            user_email,
            user_password
        ) VALUES (
            ${newUser.user_firstname},
            ${newUser.user_password}
        )`

    const queryResult = await client.query(query);
    return queryResult;

}

const getOne = async (user) => {
    const getOne = SQL`
        SELECT
            *
        FROM users
        WHERE user_email = ${user}
    `;

    const getOneResult = await client.query(getOne);
    return getOneResult;
};

module.exports = {
    createOne,
    getOne
}

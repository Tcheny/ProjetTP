const SQL = require("sql-template-strings");

const client = require("../database/connexion");
const encryptPassword = require("./miscs/encryptPassword");

const getUsers = async () => {
    const query = SQL`
        SELECT
            *
        FROM
            users
    `;

    // execute la requete SQL
    const queryResult = await client.query(query);
    return queryResult.rows;
};

const getOneUser = async userId => {
    const getOne = SQL`
        SELECT
            user_firstname,
            user_lastname,
            user_email,
            user_password,
            user_pseudo,
            user_type
        FROM users
        WHERE user_id = ${userId}
    `;

    const getOneResult = await client.query(getOne);
    if (!getOneResult.rowCount) {
        throw new Error("Pas de User avec id :", userId);
    }
    return getOneResult.rows[0];
};

const addUsers = async newUser => {
    if (await verifyUsernameExists(newUser.email)) {
        throw new Error("Email déjà utilisé");
    }
    const encryptedPassword = await encryptPassword(newUser.password);

    const addUser = SQL`
        INSERT INTO users (
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
            ${encryptedPassword},
            ${newUser.pseudo},
            ${newUser.type}
        ) RETURNING *
    `;

    const addUserResult = await client.query(addUser);
    return addUserResult.rows[0];
};

const verifyUsernameExists = async username => {
    const verify = SQL`
        SELECT
            *
        FROM users
        WHERE user_email = ${username}
    `;
    const retrievedUser = await client.query(verify);
    if (retrievedUser.rowCount) {
        return true;
    }
    return false;
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

const deleteUsers = async id => {
    const deleteUser = SQL`
        DELETE FROM users
        WHERE user_id = ${id}
        RETURNING *
    `;

    const deleteUserResult = await client.query(deleteUser);
    return deleteUserResult;
};

module.exports = {
    getUsers,
    addUsers,
    editUsers,
    deleteUsers,
    getOneUser
};

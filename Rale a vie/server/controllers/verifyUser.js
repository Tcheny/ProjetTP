const SQL = require("sql-template-strings");
const bcrypt = require("bcrypt");

const client = require("../database/connexion");

const verifyUser = async (useremail, password) => {
    const verify = SQL`
            SELECT
                user_id,
                user_firstname,
                user_lastname,
                user_email,
                user_password,
                user_pseudo,
                user_type
            FROM users
            WHERE user_email = ${useremail}
        `;

    const retrievedUser = await client.query(verify);

    if (!retrievedUser.rowCount) {
        throw new Error(`${useremail} ne correspond à aucun compte.`);
    }

    const passwordRight = await bcrypt.compare(
        password,
        retrievedUser.rows[0].user_password
    );

    if (!passwordRight) {
        throw new Error("Le mot de passe est incorrect.");
    }

    return retrievedUser.rows[0];
};

module.exports = verifyUser;

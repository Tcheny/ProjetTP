const SQL = require("sql-template-strings");
import bcrypt from 'bcrypt'

import client from '../database/connexion';

export const verifyUser = async (username, password) => {
    console.log(username)
        const verify = SQL`
            SELECT
                user_firstname,
                user_lastname,
                user_email,
                user_password,
                user_pseudo,
                user_type
            FROM users
            WHERE user_email = ${username}
        `;

        const retrievedUser = await client.query(verify)

        if (!retrievedUser.rowCount) {
            throw new Error(`Aucun utilisation ${username}`)
        }

        const passwordRight = await bcrypt.compare(password, retrievedUser.rows[0].user_password)

        if (!passwordRight) {
            throw new Error('Mot de passe incorrect')
        }

        return retrievedUser.rows[0]
    }

export default verifyUser;

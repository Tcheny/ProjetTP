const SQL = require("sql-template-strings");
const client = require("../../database/connexion");

const deleteLike = async id => {
    const query = SQL`
        DELETE FROM likes
        WHERE like_id = ${id}
        RETURNING *
    `;

    const queryResult = await client.query(query);
    return queryResult;
};

module.exports = deleteLike;

const SQL = require("sql-template-strings");

const client = require("../database/connexion");

const getAllCommentsFromPosts = async () => {
    const query = SQL`
        SELECT
            *
        FROM comments
        INNER JOIN posts ON posts.post_id = comments.post_id
    `;

    const queryResult = await client.query(query);
    return queryResult;
};

module.exports = getAllCommentsFromPosts;

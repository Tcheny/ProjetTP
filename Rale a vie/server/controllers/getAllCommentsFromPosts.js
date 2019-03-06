const SQL = require('sql-template-strings');

const client = require('../database/connexion');

const getAllCommentsFromPosts = async id => {
    const query = SQL`
        SELECT
            comments.comment_id,
            comments.user_id,
            comments.comment,
            comments.date_creation
        FROM comments
        INNER JOIN posts ON posts.post_id = comments.post_id
        WHERE comments.post_id = ${id}
    `;

    const queryResult = await client.query(query);
    return queryResult;
};

module.exports = getAllCommentsFromPosts;

const SQL = require("sql-template-strings");

const client = require("../../database/connexion");

// INSERT like
const insertLike = async likeInfos => {
    const query = SQL`
        INSERT INTO likes (
            user_id,
            post_id,
            like_type_id
        ) VALUES (
            ${likeInfos.user_id},
            ${likeInfos.post_id},
            ${likeInfos.like_type_id}
        ) RETURNING *
    `;

    const queryResult = await client.query(query);
    return queryResult.rows[0];
};

const deleteLikedPost = async (userId, postId) => {
    const query = SQL`
        DELETE FROM likes
        WHERE
            user_id = ${userId}
            AND
            post_id = ${postId}
        RETURNING *
    `;

    const queryResult = await client.query(query);
    return queryResult;
};

module.exports = { insertLike, deleteLikedPost };

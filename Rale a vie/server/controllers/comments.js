const SQL = require('sql-template-strings');

const client = require('../database/connexion');

const insertComments = async commentInfos => {
    const insertComment = SQL`
        INSERT INTO comments (
            user_id,
            post_id,
            comment,
            date_creation
        ) VALUES (
            ${commentInfos.user_id},
            ${commentInfos.post_id},
            ${commentInfos.comment},
            ${commentInfos.date_creation}
        ) RETURNING *
    `;

    const insertCommentResult = await client.query(insertComment);
    return insertCommentResult.rows[0];
};

const getOneComment = async id => {
    const getOne = SQL`
        SELECT
            *
        FROM comments
        INNER JOIN users ON users.user_id = comments.user_id
        WHERE comment_id = ${id}
    `;

    const getOneResult = await client.query(getOne);
    return getOneResult.rows[0];
};

const deleteComments = async id => {
    const deleteComment = SQL`
        DELETE FROM comments
        WHERE comment_id = ${id}
        RETURNING *
    `;

    const deleteCommentResult = await client.query(deleteComment);
    return deleteCommentResult;
};

module.exports = {
    insertComments,
    getOneComment,
    deleteComments,
};

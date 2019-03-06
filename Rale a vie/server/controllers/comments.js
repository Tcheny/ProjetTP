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
    deleteComments,
};

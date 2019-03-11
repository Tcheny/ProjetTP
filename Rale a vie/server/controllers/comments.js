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

const getAllCommentsFromPosts = async id => {
    const query = SQL`
        SELECT
            comments.comment_id,
            comments.post_id,
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
    getAllCommentsFromPosts,
    deleteComments,
};

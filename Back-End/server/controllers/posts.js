const SQL = require("sql-template-strings");

const client = require('../database/connexion');

const getAllPostsIds = async () => {
    const query = SQL`
        SELECT
            post_id
        FROM
            posts
    `;

    const queryResult = await client.query(query);
    return queryResult;
};

const getPostInfosById = async (id) => {

    // INNER JOIN jointure users et posts pour le user_id en commun pour select user_firstname, user_pseudo

    const infos = SQL`
        SELECT
            user_firstname,
            user_pseudo,
            post,
            type_media,
            date_creation
        FROM posts
        INNER JOIN users ON users.user_id = posts.user_id
        WHERE post_id = ${id}
    `;

    const infosResult = await client.query(infos);
    return infosResult.rows[0];
}

const getOnePost = async (id) => {
    const getOne = SQL`
        SELECT
            *
        FROM posts
        WHERE post_id = ${id}
    `;

    const getOneResult = await client.query(getOne);
    return getOneResult;
};

const insertPosts = async postInfos => {
    const insertPost = SQL`
        INSERT INTO posts (
            user_id,
            post,
            path_media,
            type_media,
            date_creation
        ) VALUES (
            ${postInfos.user_id},
            ${postInfos.post},
            ${postInfos.path_media},
            ${postInfos.type_media},
            ${postInfos.date_creation}
        ) RETURNING *
    `;

    const insertPostResult = await client.query(insertPost);
    return insertPostResult.rows[0];
};

const editPosts = async (id, postInfos) => {
    const editPost = SQL`
        UPDATE posts
        SET user_id = ${postInfos.user_id},
            post = ${postInfos.post},
            path_media = ${postInfos.path_media},
            type_media = ${postInfos.type_media},
            date_creation = ${postInfos.date_creation}
        WHERE post_id = ${id}
        RETURNING *
    `;

    const editPostResult = await client.query(editPost);
    return editPostResult;
};

const deletePosts = async (id) => {
    const deletePost = SQL `
        DELETE FROM posts
        WHERE post_id = ${id}
        RETURNING *
    `;

    const deletePostResult = await client.query(deletePost);
    return deletePostResult;
};

module.exports = {
    getAllPostsIds,
    getPostInfosById,
    getOnePost,
    insertPosts,
    editPosts,
    deletePosts
};

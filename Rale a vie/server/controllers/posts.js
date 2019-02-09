const SQL = require("sql-template-strings");

const client = require("../database/connexion");

// Select post_id from table posts
const getAllPostsIds = async () => {
    const query = SQL`
        SELECT
            post_id
        FROM
            posts
        ORDER BY date_creation desc 
    `;

    const queryResult = await client.query(query);
    return queryResult;
};

// requete des values nécessaires a un post
// Select les valeurs from posts ou le user_id == post_id
const getPostInfosById = async id => {
    // INNER JOIN jointure users et posts pour le user_id en commun pour select user_firstname, user_pseudo

    const infos = SQL`
        SELECT
            user_firstname,
            user_pseudo,
            post,
            type_media,
            path_media,
            date_creation
        FROM posts
        INNER JOIN users ON users.user_id = posts.user_id
        WHERE post_id = ${id}
    `;

    const infosResult = await client.query(infos);
    return infosResult.rows[0];
};

const getOnePost = async () => {
    const getOne = SQL`
        SELECT
            *
        FROM posts
    `;

    const getOneResult = await client.query(getOne);
    return getOneResult;
};

// Insert un post
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

const deletePosts = async id => {
    const deletePost = SQL`
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

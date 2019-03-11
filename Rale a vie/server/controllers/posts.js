const SQL = require('sql-template-strings');

const client = require('../database/connexion');

// Select post_id from table posts
const getAllRalesIds = async () => {
    const query = SQL`
        SELECT
            post_id,
            user_id
        FROM
            posts
        ORDER BY date_creation desc 
    `;

    const queryResult = await client.query(query);
    return queryResult;
};

// Request values to get posts infos
const getPostInfosById = async (postId, userId) => {
    // SELECT  values 
    // ASSEMBLE toutes les valeurs like sous la forme d'un tableau JSON 
    // FROM la table posts 
    // INNER JOIN jointure entre les tables users et posts pour le user_id en commun pour select user_firstname, user_pseudo
    // LEFT OUTER JOIN lister résultats de la table likes pour récupérer les likes.post_id == posts.post_id
    // WHERE post_id = postId (front)


    const infos = SQL`
        SELECT
            user_firstname,
            user_pseudo,
            posts.user_id,
            posts.post_id,
            post,
            type_media,
            path_media,
            date_creation,
		JSON_AGG(likes.*) as likes
        FROM posts
        INNER JOIN users ON users.user_id = posts.user_id
		LEFT OUTER JOIN likes ON likes.post_id = posts.post_id
        WHERE posts.post_id = ${postId}
		GROUP BY posts.post_id, users.user_id
    `;

    const infosResult = await client.query(infos);
    const post = infosResult.rows[0];

    const likeState = [
        {
            likeType: 1,
            likeCount: 0,
            isLikedByUser: false,
            likeIcon: '😂',
        },
        {
            likeType: 2,
            likeCount: 0,
            isLikedByUser: false,
            likeIcon: '😡',
        },
        {
            likeType: 3,
            likeCount: 0,
            isLikedByUser: false,
            likeIcon: '😱',
        },
    ];

    post.likes.forEach(like => {
        if (like === null) {
            return;
        }
        const isFromUser = like.user_id == userId;

        switch (like.like_type_id) {
            case 1:
                likeState[0].likeCount = likeState[0].likeCount + 1;
                likeState[0].isLikedByUser = isFromUser;
                break;
            case 2:
                likeState[1].likeCount = likeState[1].likeCount + 1;
                likeState[1].isLikedByUser = isFromUser;
                break;
            case 3:
                likeState[2].likeCount = likeState[2].likeCount + 1;
                likeState[2].isLikedByUser = isFromUser;
                break;
        }
    });

    post.likeState = likeState;

    return post;
};

// Insert post
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
    getAllRalesIds,
    getPostInfosById,
    insertPosts,
    deletePosts,
};

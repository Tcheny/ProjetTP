const SQL = require("sql-template-strings");

import client from '../database/connexion';

const getPosts = async () => {
  const query = SQL `
    SELECT 
      *
    FROM
      posts
  `;

  const queryResult = await client.query(query);
  return queryResult;
};

const getOnePost = async (id) => {
  const getOne = SQL `
    SELECT 
      *
    FROM posts
    WHERE post_id = ${id}
  `;

  const getOneResult = await client.query(getOne);
  return getOneResult;
};

const insertPosts = async postInfos => {
  const insertPost = SQL `
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
  return insertPostResult;
};

const editPosts = async (id, postInfos) => {
  const editPost = SQL `
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
  getPosts,
  getOnePost,
  insertPosts,
  editPosts,
  deletePosts
};
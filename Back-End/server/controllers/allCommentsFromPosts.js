const SQL = require("sql-template-strings");

import client from '../database/connexion';

const getAllCommentsFromPosts = async () => {
  const query = SQL `
    SELECT 
      *
    FROM comments
    INNER JOIN posts ON posts.post_id = comments.post_id
  `;

  const queryResult = await client.query(query);
  return queryResult;
};

module.exports = {
  getAllCommentsFromPosts
};
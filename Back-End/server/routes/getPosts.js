import {
  Router
} from 'express';

import queries from '../database/connexion';
import {
  getPosts,
  getOnePost,
  insertPosts,
  editPosts,
  deletePosts
}
from '../controllers/posts';

const router = Router();

router.get('/all', async (req, res) => {
  let queryResult = null;

  try {
    queryResult = await getPosts(queries);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans posts", error));
  }

  return res.status(200).send(queryResult.rows);
});

router.get('/:id', async (req, res) => {
  let getOneResult = null;

  try {
    getOneResult = await getOnePost(req.params.id)
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans One Post", error));
  }

  return res.status(200).send(getOneResult.rows);
})

router.post('/add', async (req, res) => {
  let insertPostsResult = null;

  try {
    insertPostsResult = await insertPosts({
      user_id: req.body.user_id,
      post: req.body.post,
      path_media: req.body.path_media,
      type_media: req.body.type_media,
      date_creation: req.body.date_creation
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans Add Post", error));
  }

  return res.status(200).send(insertPostsResult.rows);
});

router.put('/edit/:id', async (req, res) => {
  let editPostsResult = null;

  try {
    editPostsResult = await editPosts(req.params.id, {
      user_id: req.body.user_id,
      post: req.body.post,
      path_media: req.body.path_media,
      type_media: req.body.type_media,
      date_creation: req.body.date_creation
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans Edit Post", error));
  }

  return res.status(200).send(editPostsResult.rows);
});

router.delete('/delete/:id', async (req, res) => {
  let deletePostResult = null;

  try {
    deletePostResult = await deletePosts(req.params.id);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans Delete Post", error));
  }

  return res.status(200).send(deletePostResult);
});

export default router;

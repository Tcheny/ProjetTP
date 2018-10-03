import { Router } from 'express';
import {   getAllCommentsFromPosts } from '../controllers/allCommentsFromPosts';

const router = Router();

router.get('/post/:id/comments', async (req, res) => {
  let getAllResult = null;
  console.log("PARAMS", req.params)
  try {
    getAllResult = await getAllCommentsFromPosts(req.params.id)
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new Error("Erreur dans les commentaires du post", error));
  }

  return res.status(200).send(getAllResult.rows);
})

export default router;
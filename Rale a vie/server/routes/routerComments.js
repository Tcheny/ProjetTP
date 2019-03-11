const { Router } = require('express');
const moment = require('moment');

const { getOneComment, insertComments, getAllCommentsFromPosts, deleteComments } = require('../controllers/comments');

const router = Router();

router.post('/add', async (req, res) => {
    let addedComment = null;

    try {
        const insertCommentsResult = await insertComments({
            user_id: req.body.comment.user_id,
            post_id: req.body.comment.post_id,
            comment: req.body.comment.comment,
            date_creation: moment(),
        });
        addedComment = await getOneComment(insertCommentsResult.comment_id);
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error('Erreur dans Add Comment', error));
    }

    return res.status(200).send(addedComment);
});

router.get("/posts", async (req, res) => {
    let getAllResult = null;

    try {
        getAllResult = await getAllCommentsFromPosts(req.query.id);
    } catch (error) {
        console.log(error);
        res.status(500).send(
            new Error("Erreur dans les commentaires du post", error)
        );
    }

    return res.status(200).send(getAllResult.rows);
});

router.delete('/delete', async (req, res) => {
    let deleteCommentResult = null;

    try {
        deleteCommentResult = await deleteComments(req.query.id);
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error('Erreur dans Delete Post', error));
    }

    return res.status(200).send(deleteCommentResult.rows[0]);
});

module.exports = router;

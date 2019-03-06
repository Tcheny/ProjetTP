const { Router } = require('express');
const moment = require('moment');

const queries = require('../database/connexion');
const {
    getComments,
    getOneComment,
    insertComments,
    // editComments,
    deleteComments,
} = require('../controllers/comments');

const router = Router();

router.get('/allId', async (req, res) => {
    let queryResult = null;

    try {
        queryResult = await getComments(queries);
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error('Erreur dans comments', error));
    }

    return res.status(200).send(queryResult.rows);
});

router.get('/:id', async (req, res) => {
    let getOneResult = null;

    try {
        getOneResult = await getOneComment(req.params.id);
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error('Erreur dans One Comment', error));
    }

    return res.status(200).send(getOneResult.rows);
});

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

// router.put("/edit/:id", async (req, res) => {
//     let editCommentsResult = null;

//     try {
//         editCommentsResult = await editComments(req.params.id, {
//             user_id: req.body.user_id,
//             post_id: req.body.post_id,
//             comment: req.body.comment,
//             date_creation: req.body.date_creation
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(new Error("Erreur dans Edit Comment", error));
//     }

//     return res.status(200).send(editCommentsResult.rows);
// });

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

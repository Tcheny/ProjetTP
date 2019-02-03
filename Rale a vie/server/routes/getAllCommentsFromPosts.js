const { Router } = require('express');
const { getAllCommentsFromPosts } = require('../controllers/allCommentsFromPosts');

const router = Router();

router.get('/posts/:id/comments', async (req, res) => {
    let getAllResult = null;
    try {
        getAllResult = await getAllCommentsFromPosts(req.params.id)
    } catch (error) {
        console.log(error);
        res.status(500).send(new Error("Erreur dans les commentaires du post", error));
    }

    return res.status(200).send(getAllResult.rows);
})

module.exports= router;

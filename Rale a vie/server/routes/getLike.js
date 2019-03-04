const { Router } = require('express');
const insertLike = require('../controllers/likes/insertLike');

const router = Router();

router.post('/insertlike', async (req, res) => {

    // if (req.body.didUserAlreadyLikedThePost) {
    //     deletePrevLikeforthispost(req.body.like.post_id, req.session.userId)
    // }
    // si didUserAlreadyLikedThePost est true  on delete le like du user du post

    const likeInfos = {
        user_id: req.session.userId,
        post_id: req.body.like.post_id,
        like_type_id: req.body.like.like_type_id
    };
    try {
        await insertLike(likeInfos);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }

    return res.status(200).send(likeInfos);
});

router.delete('/deletelike', async (req, res) => {
    let deleteLike = null;

    try {
        deleteLike = await deletePosts(req.query.id);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(new Error('Erreur dans Delete Like', error));
    }

    return res.status(200).send(deleteLike.rows[0]);
});

module.exports = router;

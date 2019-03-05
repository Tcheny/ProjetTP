const { Router } = require('express');
const { insertLike, deleteLikedPost} = require('../controllers/likes/insertLike');

const router = Router();

router.post('/insertlike', async (req, res) => {
    if (req.body.like.isLikedByUser) {
        deleteLikedPost( req.session.userId, req.body.like.post_id )
    }

    const likeInfos = {
        user_id: req.session.userId,
        post_id: req.body.like.post_id,
        like_type_id: req.body.like.like_type_id,
        isLikedByUser: req.body.like.isLikedByUser
    };
    try {
        await insertLike(likeInfos);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }

    return res.status(200).send(likeInfos);
});

module.exports = router;

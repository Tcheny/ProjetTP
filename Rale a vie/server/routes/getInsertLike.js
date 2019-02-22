const { Router } = require("express");
const { insertLike } = require("../controllers/likes/insertLike");

const router = Router();

router.post("/insertlike", async (req, res) => {
    const likeInfos = {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        like_type_id: req.body.like_type_id
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

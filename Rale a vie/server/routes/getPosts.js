const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const moment = require("moment");
const path = require("path");

const queries = require("../database/connexion");
const {
    getAllPostsIds,
    getPostInfosById,
    insertPosts,
    // getOnePost,
    // editPosts,
    deletePosts
} = require("../controllers/posts");

const router = Router();
// configuring Multer to use files directory for storing files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all posts id
router.get("/allId", async (req, res) => {
    let queryResult = null;

    try {
        queryResult = await getAllPostsIds(queries);
    } catch (error) {
        console.log(error);
        return res.status(500).send(new Error("Erreur dans posts", error));
    }

    return res.status(200).send(queryResult.rows);
});

// chercher l'image dans l'infos du post
router.get("/postInfos", async (req, res) => {
    let infos = null;

    try {
        infos = await getPostInfosById(req.query.id);
        // create the file path
        const writePath = path.join(
            __dirname,
            "../mediaUploads",
            infos.path_media
        );
        const file = await fs.promises.readFile(writePath);
        infos.file = file;
    } catch (error) {
        console.log(error);
        return res.status(500).send(new Error("Erreur dans Post Infos By Id"));
    }

    return res.status(200).send(infos);
});

// router.get("/all", async (req, res) => {
//     let getOneResult = null;

//     try {
//         getOneResult = await getOnePost(queries);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(new Error("Erreur dans One Post", error));
//     }

//     return res.status(200).send(getOneResult.rows);
// });

// express route where we receive files from the client
// passing multer middleware
router.post("/add", upload.single("uploadFile"), async (req, res) => {
    let insertPostsResult = null;

    // create the filename
    const writePath = path.join(
        __dirname,
        "../mediaUploads",
        req.file.originalname
    );

    try {
        await fs.promises.writeFile(writePath, req.file.buffer);

        insertPostsResult = await insertPosts({
            user_id: req.session.userId,
            post: req.body.post,
            path_media: req.file.originalname,
            type_media: req.body.type_media,
            date_creation: moment()
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(new Error("Erreur dans Add Post", error));
    }

    return res.status(200).send(insertPostsResult);
});

// router.post("/edit/:id", async (req, res) => {
//     let editPostsResult = null;

//     try {
//         editPostsResult = await editPosts(req.params.id, {
//             user_id: req.body.user_id,
//             post: req.body.post,
//             path_media: req.body.path_media,
//             type_media: req.body.type_media,
//             date_creation: req.body.date_creation
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(new Error("Erreur dans Edit Post", error));
//     }

//     return res.status(200).send(editPostsResult.rows);
// });

router.delete("/delete", async (req, res) => {
    let deletePostResult = null;

    try {
        deletePostResult = await deletePosts(req.query.id);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send(new Error("Erreur dans Delete Post", error));
    }

    return res.status(200).send(deletePostResult.rows[0]);
});

module.exports = router;

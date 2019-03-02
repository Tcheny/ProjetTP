const { Router } = require("express");

const users = require("./getUsers");
const posts = require("./getPosts");
const comments = require("./getComments");
const session = require("./getSession");
const allComments = require("./getAllCommentsFromPosts");
const like = require("./getLike");

// Toutes les routes sont définis ici et envoyé a 'server.js'
const router = Router();

router.use("/users", users);
router.use("/posts", posts);
router.use("/comments", comments);
router.use("/likes", like);
router.use(allComments);
router.use(session);

module.exports = router;

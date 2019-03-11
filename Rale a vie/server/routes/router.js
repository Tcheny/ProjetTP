const { Router } = require('express');

const users = require('./routerUsers');
const posts = require('./routerPosts');
const comments = require('./routerComments');
const like = require('./routerLike');
// const allComments = require('./routerAllCommentsFromPosts');
const session = require('./routerSession');

// Toutes les routes sont définis ici et envoyé a 'server.js'
const router = Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/likes', like);
// router.use(allComments);
router.use(session);

module.exports = router;

const { Router } = require('express');

const users = require('./routerUsers');
const posts = require('./routerPosts');
const comments = require('./routerComments');
const like = require('./routerLike');
const session = require('./routerSession');

// All routes are defined here and sent to'server.js'
const router = Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use('/likes', like);
router.use(session);

module.exports = router;

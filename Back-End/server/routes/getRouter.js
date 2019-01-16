import { Router } from 'express';

import users from './getUsers';
import posts from './getPosts';
import comments from './getComments';
import session from './getSession';

// Toutes les routes sont définis ici et envoyé a 'server.js'
const router = Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
router.use(session);

export default router;

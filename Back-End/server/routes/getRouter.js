import { Router } from 'express';

import users from './getUsers';
import posts from './getPosts';
import comments from './getComments';

const router = Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);


export default router;

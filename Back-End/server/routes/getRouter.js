import { Router } from 'express';

import users from './getUsers';
import posts from './getPosts';
import comments from './getComments';
// import login from './getSession';
import auth from '../controllers/auth'


const router = Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);
// router.use(login)

router.post('/register', auth.register)
router.post('/login', auth.login)

export default router;

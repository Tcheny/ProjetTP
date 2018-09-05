import express from 'express';
import logger from 'morgan';
import config from './config/config';
import users from './routes/getUsers';
import posts from './routes/getPosts';
import comments from './routes/getComments';

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', users);
app.use('/', posts);
app.use('/', comments);

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))

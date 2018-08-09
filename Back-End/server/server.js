import express from 'express';
import logger from 'morgan';
import config from './config/config';
import users from './routes/getUsers';

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', users);

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))

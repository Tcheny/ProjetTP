import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import { validateToken } from './Authentication';
//import getUserFromToken from './controllers/getUserToken';
import config from './config/config';
import router from './routes/getRouter';

const app = express();

app.use(logger('dev'));

app.use(cookieParser());
// parser le body sous JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validateToken)
app.use(router);

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`))

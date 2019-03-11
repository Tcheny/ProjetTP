const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { validateToken } = require('./Authentication');
const config = require('./config/config');
const router = require('./routes/router');
const getUserToken = require('./controllers/getUserToken');

// create the server
const app = express();

app.use(logger('dev'));

// Specify the root directory of input files
app.use(express.static(__dirname + './../client'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(validateToken);
app.use(router);

// Route to authenticate user
app.get('/auth', async (req, res) => {
    let user = null;
    try {
        user = await getUserToken(req.cookies.token);
    } catch (error) {
        console.log("Erreur dans l'authentication : " + error);
        return res.status(401).send({ authenticated: false, user: null });
    }

    res.status(200).json({ authenticated: true, user });
});

// Entry-point
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(config.port, () =>  console.log(`App listening on port ${config.port}!`));

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { validateToken } = require('./Authentication');
const config = require('./config/config');
const router = require('./routes/router');
const getUserToken = require('./controllers/getUserToken');

// create the server
const app = express();

// log all requests to the console
app.use(logger('dev'));

// set static files location
app.use(express.static(__dirname + './../client'));
// parses Cookie header and populate req.cookies
app.use(cookieParser());
// parses incoming requests with JSON
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

// START THE SERVER
app.listen(config.port, () =>  console.log(`App listening on port ${config.port}!`));

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const { validateToken } = require("./Authentication");
const config = require("./config/config");
const router = require("./routes/getRouter");
const cors = require("cors");

const app = express();

app.use(logger("dev"));

app.use(cookieParser());
// parser le body sous JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(validateToken);
app.use(router);

app.listen(config.port, () =>
    console.log(`App listening on port ${config.port}!`)
);

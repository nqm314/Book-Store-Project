
const express = require('express')
const path = require('path');
const configSession = require('./config/session')
const initRoute = require('./routes')
require('dotenv').config();


const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

configSession(app)
initRoute(app)


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`);
});

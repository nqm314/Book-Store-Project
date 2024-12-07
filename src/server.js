const express = require('express')
const path = require('path');
const configSession = require('./config/session')
const initRoute = require('./routes')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'public/views'));

configSession(app)
initRoute(app)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`App is running on localhost:${port}`);
})
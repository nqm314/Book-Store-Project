const express = require('express')
const path = require('path');
const initRoute = require('./routes')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public/')))

initRoute(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App is running on localhost:${port}`);
})
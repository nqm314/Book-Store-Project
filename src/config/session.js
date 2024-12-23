const session = require('express-session');
require('dotenv').config()

const configSession = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }))
}

module.exports = configSession;
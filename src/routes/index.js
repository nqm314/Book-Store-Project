const apiRoute = require('./apiRoute');
const webRoute = require('./webRoute');
const bookRoute = require('./bookRoute')

const initRoute = (app) => {
    app.use('/api', apiRoute)
    app.use('/', webRoute)
    app.use("/books", bookRoute);
}

module.exports = initRoute
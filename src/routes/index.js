const apiRoute = require('./apiRoute');
const webRoute = require('./webRoute');

const initRoute = (app) => {
    app.use('/api', apiRoute)
    app.use('/', webRoute)
}

module.exports = initRoute
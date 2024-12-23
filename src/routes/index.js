
const apiRoute = require('./apiRoute');
const webRoute = require('./webRoute');
const authRoute = require('./authRoute')
const orderRoute = require('./orderRoute')
const cartRoute = require('./cartRoute')
const bookRoute = require("./bookRoute");
const searchRoute = require("./searchRoute");
const initRoute = (app) => {
  app.use("/api", apiRoute);
  app.use("/manageBooks", bookRoute);
  app.use("/manageOrders", orderRoute);
  app.use("/search", searchRoute);

  app.use("/", webRoute);

  app.use('/', authRoute);
  app.use('/', orderRoute);
  app.use('/', cartRoute);
};

module.exports = initRoute;

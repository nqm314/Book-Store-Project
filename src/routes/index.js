const apiRoute = require("./apiRoute");
const webRoute = require("./webRoute");
const bookRoute = require("./bookRoute");
const searchRoute = require("./searchRoute");
const orderRoute = require('./orderRoute');
const initRoute = (app) => {
  app.use("/api", apiRoute);
  app.use("/manageBooks", bookRoute);
  app.use("/manageOrders", orderRoute);
  app.use("/search", searchRoute);

  app.use("/", webRoute);
};

module.exports = initRoute;

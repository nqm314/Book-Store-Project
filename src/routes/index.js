const apiRoute = require("./apiRoute");
const webRoute = require("./webRoute");
const bookRoute = require("./bookRoute");
const initRoute = (app) => {
  app.use("/api", apiRoute);
  app.use("/create", bookRoute);
  app.use("/", webRoute);
};

module.exports = initRoute;

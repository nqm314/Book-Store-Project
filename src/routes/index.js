const apiRoute = require("./apiRoute");
const webRoute = require("./webRoute");
const bookRoute = require("./bookRoute");
const searchRoute = require("./searchRoute");
const initRoute = (app) => {
  app.use("/api", apiRoute);
  app.use("/manageBooks", bookRoute);
  app.use("/search", searchRoute);

  app.use("/", webRoute);
};

module.exports = initRoute;

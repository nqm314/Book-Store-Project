const { Router } = require("express");
const controllers = require("../controllers");
const { authMiddleware } = require("../middlewares")

const route = Router();
route.get("/book/:book_id",authMiddleware.checkLogin, controllers.searchController.getBookDetails);
route.get("/", authMiddleware.checkLogin, controllers.searchController.searchFieldBook);

module.exports = route;

const { Router } = require("express");
const controllers = require("../controllers");

const route = Router();
route.get("/book/:book_id", controllers.searchController.getBookDetails);
route.get("/", controllers.searchController.searchFieldBook);

module.exports = route;

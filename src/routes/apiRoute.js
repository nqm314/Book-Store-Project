const { Router } = require("express");
const controllers = require("../controllers");

const route = Router();

//Book route
route.get("/book/get-all", controllers.bookController.getAllBook);
route.get("/book/search", controllers.bookController.searchBook);
route.get("/book/:book_id", controllers.bookController.getBookById);
route.delete("/book/:book_id", controllers.bookController.destroyBook);

//Order route
route.get("/order/get-all", controllers.orderController.getAllOrder);
module.exports = route;

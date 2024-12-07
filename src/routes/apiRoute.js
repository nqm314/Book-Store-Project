const { Router } = require("express");
const controllers = require("../controllers");

const route = Router();

//Book route
route.get("/book/get-all", controllers.bookController.getAllBook);
route.get("/book/search", controllers.bookController.searchBook);
route.get("/book/:book_id", controllers.bookController.getBookById);
route.delete("/book/:book_id", controllers.manageBooksController.destroyBook);
route.get("/get-all-series", controllers.bookController.getAllSeries);
route.get("/get-book-info", controllers.bookController.getBookPubSer);
route.get("/book/edition/get-all", controllers.bookController.getAllEdition);
route.get("/book/issue/get-all", controllers.bookController.getAllIssue);
route.get(
  "/book/is-written/get-all",
  controllers.bookController.getAllIsWritten
);
route.get("/book/rating/get-all", controllers.bookController.getAllRating);

//Order route
route.get("/order/get-all", controllers.orderController.getAllOrder);

// Publisher
route.get("/publisher/get-all", controllers.bookController.getAllPublisher);
// Series
route.get("/series/get-all", controllers.bookController.getAllSeries);
route.get("/author/get-all", controllers.bookController.getAllAuthor);

// Get bt BOOK_ID
route.get(
  "/book/is-written/:book_id",
  controllers.bookController.getIsWrittenById
);
route.get("/book/edition/:book_id", controllers.bookController.getEditionById);
route.get("/book/issue/:book_id", controllers.bookController.getIssueById);
route.get("/publisher/:pub_id", controllers.bookController.getPublisherById);
route.get("/book/rating/:book_id", controllers.bookController.getRatingById);
module.exports = route;

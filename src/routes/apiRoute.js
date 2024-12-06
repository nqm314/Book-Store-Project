const { Router } = require('express');
const controllers = require('../controllers');

const route = Router()


//Book route
route.get('/book/get-all', controllers.bookController.getAllBook)
route.get('/book-paginated', controllers.bookController.getBookPaginated);
route.get('/book/search', controllers.bookController.searchBook)
route.get('/book/:book_id', controllers.bookController.getBookByID);
route.post('/book/store', controllers.bookController.storeBookToDB);
route.delete('/book/:book_id', controllers.bookController.deleteBook);
route.put('/book/:book_id', controllers.bookController.updateBook);
route.get('/filter-book', controllers.bookController.filterBooks);

//Edition route
route.post('/edition/store', controllers.bookController.storeEditionToDB);

//Issue route
route.post('/issue/store', controllers.bookController.storeIssueToDB);

//Order route
route.get("/order/get-all-order", controllers.orderController.getAllOrder);
route.get("/order/:orderId", controllers.orderController.getOrderDetail);
// route.get(
//   "/order/check-order-total-price",
//   controllers.orderController.getTotalPrice
// );
route.get(
  "/filter-by-threshold",
  controllers.orderController.getOrdersAboveThreshold
);

// Dashboard route
route.get('/dashboard', controllers.dashboardController.getDashboardData)

route.post("/login", controllers.loginController.login);

module.exports = route
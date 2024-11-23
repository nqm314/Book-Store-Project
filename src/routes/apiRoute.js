const { Router } = require('express');
const controllers = require('../controllers');

const route = Router()


//Book route
route.get('/book/get-all', controllers.bookController.getAllBook)
route.get('/book/search', controllers.bookController.searchBook)

//Order route
route.get('/order/get-all', controllers.orderController.getAllOrder)

// Dashboard route
route.get('/dashboard', controllers.dashboardController.getDashboardData)

module.exports = route
const { Router } = require('express');
const controllers = require('../controllers');

const route = Router()


//Book route
route.get('/book/get-all', controllers.bookController.getAllbook)

//Order route
route.get('/order/get-all', controllers.orderController.getAllOrder)

module.exports = route
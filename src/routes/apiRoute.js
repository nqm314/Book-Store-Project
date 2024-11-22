const { Router } = require('express');
const controllers = require('../controllers');

const route = Router()

//Auth route
route.post('/login', controllers.authController.login)
route.post('/logout', controllers.authController.logout)

//Book route
route.get('/book/get-all', controllers.bookController.getAllBook)
route.get('/book/search', controllers.bookController.searchBook)

//Order route
route.get('/order/get-all', controllers.orderController.getAllOrder)



module.exports = route
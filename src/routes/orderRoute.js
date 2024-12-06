const { Router } = require("express");
const { orderController } = require("../controllers")
const { authMiddleware } = require("../middlewares");

const route = Router()

route.get('/order', authMiddleware.isCustomer, orderController.showOrderPage)
route.post('/order', authMiddleware.isCustomer, orderController.addOrder)

module.exports = route
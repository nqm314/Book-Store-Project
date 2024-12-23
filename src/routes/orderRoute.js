
const { Router } = require("express");
const { orderController } = require("../controllers")
const { authMiddleware } = require("../middlewares");
const manageOrdersController = require('../controllers/orderController');

const route = Router()

route.get('/order', authMiddleware.isCustomer, orderController.showOrderPage)
route.post('/order', authMiddleware.isCustomer, orderController.addOrder)

route.get("/", authMiddleware.isStaff, manageOrdersController.showOders);
route.get("/edit", authMiddleware.isStaff, manageOrdersController.editOrder);

module.exports = route


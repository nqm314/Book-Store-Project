const { Router } = require("express");
const { cartController } = require("../controllers")
const { authMiddleware } = require("../middlewares");

const route = Router()

route.get('/cart', authMiddleware.isCustomer, cartController.showCartPage)
route.get('/remove', cartController.removeProduct)
route.get('/create', cartController.createCart)

module.exports = route
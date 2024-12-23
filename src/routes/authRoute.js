const { Router } = require("express");
const { authController } = require("../controllers")
const { authMiddleware } = require("../middlewares")

const route = Router()

//Customer Login
route.get('/login', authMiddleware.isAuthCustomer, authController.showLoginCustomer)
route.post('/login', authController.loginCustomer)


//Admin Login
route.get('/admin/login', authMiddleware.isAuthAdmin, authController.showLoginStaff)
route.post('/admin/login', authController.loginStaff)


route.get('/logout', authController.logout)

route.get('/info', authMiddleware.isCustomer, authController.showInfo)

module.exports = route
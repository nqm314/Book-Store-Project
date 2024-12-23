const express = require("express");
const route = express.Router();
const manageOrdersController = require('../controllers/orderController');
const path = require("path");


route.get("/", manageOrdersController.showOders);
route.get("/edit", manageOrdersController.editOrder);
module.exports = route;

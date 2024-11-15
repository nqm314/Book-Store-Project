const express = require("express");
const route = express.Router();
const createController = require("../controllers/bookController");
const path = require("path");
// router.get("/create", createController.createBook);
route.get("/", createController.createBook);
route.post("/store", createController.storeBook);
module.exports = route;

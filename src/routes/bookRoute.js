const express = require("express");
const route = express.Router();
const createController = require("../controllers/bookController");
const manageBooksController = require("../controllers/manageBooksController");
const { authMiddleware } = require("../middlewares")

const path = require("path");
// router.get("/create", createController.createBook);
route.get("/create", authMiddleware.isStaff, manageBooksController.createBook);
route.get("/edit", authMiddleware.isStaff, manageBooksController.editBook);
route.get('/search', authMiddleware.isStaff, manageBooksController.searchBooks);
route.post("/create/store", authMiddleware.isStaff, manageBooksController.storeBook);
route.post("/edition/store", authMiddleware.isStaff, manageBooksController.storeEditionToDB);
route.post("/issue/store", authMiddleware.isStaff, manageBooksController.storeIssueToDB);
route.get("/", authMiddleware.isStaff, manageBooksController.showBooks);
module.exports = route;

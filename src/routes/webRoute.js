const { Router } = require("express");
const path = require("path");
const createController = require("../controllers/bookController");
const route = Router();

route.get("/", (req, res) => {
  // return res.sendFile(path.join(__dirname, "../public/views/pages/home"));
  res.render("pages/home");
});

route.get("/login", (req, res) => {
  // return res.sendFile(path.join(__dirname, "../public/views/pages/login"));
  res.render("pages/login");
});

route.get("/info", (req, res) => {
  // return res.sendFile(path.join(__dirname, "../public/views/pages/customer"));
  res.render("pages/customer");
});

route.get("/admin/info", (req, res) => {
  res.render("pages/admin");
});

// Create

module.exports = route;

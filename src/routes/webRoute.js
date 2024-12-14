const { Router } = require("express");
const path = require("path");

const controllers = require("../controllers")
const { authMiddleware } = require("../middlewares")

const route = Router();

route.get('/', authMiddleware.checkLogin, controllers.homeController.showHomePage)
//     async (req, res) => {
//     if (req.session.loggedin) {
//         if (req.session.user.role === "CUSTOMER") {
//             const user = await customerService.findCustomerByUsername(
//                 req.session.user.username
//             );
//             res.locals.name = user.name;
//         } else {
//             return res.redirect("/404");
//         }
//     }
//     return res.render('pages/home')
//     return res.sendFile(path.join(__dirname, '../public/views/pages/home.html'))
// }

// route.get('/login', (req, res) => {
//     return res.render('pages/login')
//     return res.sendFile(path.join(__dirname, '../public/views/pages/login.html'))
// });

// route.get('/info', (req, res) => {
//     return res.sendFile(path.join(__dirname, "../public/views/pages/customer.html"));
// });
// =======
// const createController = require("../controllers/bookController");
// const route = Router();

// route.get("/", (req, res) => {
//   // return res.sendFile(path.join(__dirname, "../public/views/pages/home"));
//   res.render("pages/home");
// });

// route.get("/login", (req, res) => {
//   // return res.sendFile(path.join(__dirname, "../public/views/pages/login"));
//   res.render("pages/login");
// });
// >>>>>>> nat

// route.get("/info", (req, res) => {
//   // return res.sendFile(path.join(__dirname, "../public/views/pages/customer"));
//   res.render("pages/customer");
// });

// route.get("/admin/info", (req, res) => {
//   res.render("pages/admin");
// });

// route.get("/manageBooks", (req, res) => {
//   // return res.sendFile(path.join(__dirname, "../public/views/pages/login"));
//   res.render("pages/manageBooks");
// });

// Create

module.exports = route;

const { Router } = require("express");
const path = require("path");

const controllers = require("../controllers")
const { authMiddleware } = require("../middlewares")

const route = Router();

route.get('/', authMiddleware.checkLogin, controllers.homeController.showHomePage)
route.get('/admin', authMiddleware.isStaff, controllers.homeController.showAdminHomePage)
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

route.get('/infoAdmin', authMiddleware.isStaff, controllers.authController.showInfoAdmin)

route.get("/admin/add-edition", authMiddleware.isStaff, (req, res) => {
  res.render("pages/createEdition");
})

route.get("/admin/add-issue", authMiddleware.isStaff, (req, res) => {
  res.render("pages/createIssue");
})

route.get("/admin/edit-book", authMiddleware.isStaff, (req, res) => {
  res.render("pages/editBook");
})

route.get("/admin/manage-books", authMiddleware.isStaff, (req, res) => {
  res.render("pages/manageBooks");
});

route.get("/admin/manageOrders", authMiddleware.isStaff, (req, res) => {
  // return res.sendFile(path.join(__dirname, "../public/views/pages/login"));
  res.render("pages/manageOrders");
});

// Create

module.exports = route;

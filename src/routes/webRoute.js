const { Router } = require("express");
const path = require("path");
const controllers = require("../controllers")
const { authMiddleware } = require("../middlewares")
const { customerService } = require('../services')

const route = Router();

route.get('/', async (req, res) => {
    if (req.session.loggedin) {
        if (req.session.user.role === "CUSTOMER") {
            const user = await customerService.findCustomerByUsername(
                req.session.user.username
            );
            res.locals.name = user.name;
        } else {
            return res.redirect("/404");
        }
    }
    return res.render('pages/home')
    return res.sendFile(path.join(__dirname, '../public/views/pages/home.html'))
})

// route.get('/login', (req, res) => {
//     return res.render('pages/login')
//     return res.sendFile(path.join(__dirname, '../public/views/pages/login.html'))
// });

// route.get('/info', (req, res) => {
//     return res.sendFile(path.join(__dirname, "../public/views/pages/customer.html"));
// });

route.get('/admin/info', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/admin.html"));
});

module.exports = route



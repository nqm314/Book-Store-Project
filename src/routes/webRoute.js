const { Router } = require("express");
const path = require("path");

const route = Router();

route.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/login.html"));
})

// route.get('/login', (req, res) => {
//     return res.sendFile(path.join(__dirname, "../public/views/pages/login.html"));
// });

route.get('/admin/info', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/admin.html"));
});

route.get('/admin/dashboard', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/adminDashboard.html"));
})

route.get('/admin/add-book', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/addBook.html"));
})

route.get('/admin/add-edition', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/addEdition.html"));
})

route.get('/admin/add-issue', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/addIssue.html"));
})

route.get('/admin/edit-book', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/editBook.html"));
})

route.get('/admin/manage-books', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/manageBooks.html"));
})

route.get("/order", (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/order.html"));
});

module.exports = route



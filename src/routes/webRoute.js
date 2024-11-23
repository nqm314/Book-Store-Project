const { Router } = require("express");
const path = require("path");

const route = Router();

route.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/views/pages/home.html'));
})

route.get('/login', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/login.html"));
});

route.get('/info', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/customer.html"));
});

route.get('/admin/info', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/admin.html"));
});

route.get('/admin/dashboard', (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/adminDashboard.html"));
})

module.exports = route



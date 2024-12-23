const { bookService, customerService } = require('../services');

const showHomePage = async (req, res) => {

    return res.render('pages/home')
}

const showAdminHomePage = async (req, res) => {

    return res.render('pages/adminHome')
}

module.exports = {
    showHomePage,
    showAdminHomePage,
}
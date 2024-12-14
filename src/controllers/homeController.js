const { bookService, customerService } = require('../services');

const showHomePage = async (req, res) => {

    return res.render('pages/home')
}


module.exports = {
    showHomePage,
}
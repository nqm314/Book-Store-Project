const { bookService } = require('../services');

const getAllBook = async (req, res) => {
    try {
        const books = await bookService.getAll();
        return res.status(200).json(books);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

const searchBook = async (req, res) => {
    try {
        const books = await bookService.search(req.query.q);
        return res.status(200).json(books);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

module.exports = {
    getAllBook,
    searchBook,
}
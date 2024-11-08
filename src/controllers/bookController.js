const { bookService } = require('../services');

const getAllbook = async (req, res) => {
    try {
        const books = await bookService.getAll();
        return res.status(200).json(books);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

module.exports = {
    getAllbook,
}
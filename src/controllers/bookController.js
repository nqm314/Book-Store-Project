const {
  bookService,
  publisherService,
  bookDetailService,
} = require("../services");
const path = require("path");
const db = require("../config/db");
const {
  getDetailEditionById,
  getDetailIssueById,
} = require("../services/bookDetailService");
const getAllBook = async (req, res) => {
  try {
    const books = await bookService.getAll();
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getBookById = async (req, res) => {
  const bookId = req.params.book_id; // Extract book_id from the request parameters
  try {
    const book = await bookService.getBookById(bookId);
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while fetching the book.");
  }
};

const getIssueById = async (req, res) => {
  const bookId = req.params.book_id; // Extract book_id from the request parameters
  try {
    const book = await bookDetailService.getIssueById(bookId);
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while fetching the book.");
  }
};

const getEditionById = async (req, res) => {
  const bookId = req.params.book_id; // Extract book_id from the request parameters
  try {
    const book = await bookDetailService.getEditionById(bookId);
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while fetching the book.");
  }
};

const getRatingById = async (req, res) => {
  const bookId = req.params.book_id; // Extract book_id from the request parameters
  try {
    const book = await bookDetailService.getRatingById(bookId);
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while fetching the book.");
  }
};

const getSeriesById = async (req, res) => {
  const bookId = req.params.book_id; // Extract book_id from the request parameters
  try {
    const book = await bookDetailService.getSeriesById(bookId);
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while fetching the book.");
  }
};

const getIsWrittenById = async (req, res) => {
  const bookId = req.params.book_id; // Extract book_id from the request parameters
  try {
    const book = await bookDetailService.getAuthorById(bookId);
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while fetching the book.");
  }
};
const searchBook = async (req, res) => {
  try {
    const books = await bookService.search(req.query.q);
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getAllPublisher = async (req, res) => {
  try {
    const publishers = await publisherService.getAll();
    return res.status(200).json(publishers);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
const getPublisherById = async (req, res) => {
  const bookId = req.params.pub_id; // Extract book_id from the request parameters
  try {
    const book = await bookDetailService.getPublisherById(bookId);
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while fetching the book.");
  }
};

const getAllSeries = async (req, res) => {
  try {
    const series = await bookService.getAllSeries();
    return res.status(200).json(series);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
const getAllAuthor = async (req, res) => {
  try {
    const series = await bookService.getAllAuthor();
    return res.status(200).json(series);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getAllIsWritten = async (req, res) => {
  try {
    const series = await bookService.getAllIsWritten();
    return res.status(200).json(series);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getAllRating = async (req, res) => {
  try {
    const series = await bookService.getAllRating();
    return res.status(200).json(series);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getAllEdition = async (req, res) => {
  try {
    const series = await bookService.getAllEdition();
    return res.status(200).json(series);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getAllIssue = async (req, res) => {
  try {
    const series = await bookService.getAllIssue();
    return res.status(200).json(series);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getBookPubSer = async (req, res) => {
  try {
    const books = await bookService.getBookPubSer();
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getEdition = async (req, res) => {
  try {
    const books = await bookService.getEdition();
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

// Issue, Edition
const getDetailEdition = async (req, res) => {
  try {
    const books = await bookDetailService.getDetailEditionById(
      req.params.book_id,
      req.params.isbn
    );
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getDetailIssue = async (req, res) => {
  try {
    const books = await bookDetailService.getDetailIssueById(
      req.params.book_id,
      req.params.issn
    );
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
module.exports = {
  getAllBook,
  searchBook,
  getBookById,
  getAllPublisher,
  getAllSeries,
  getBookPubSer,
  getAllAuthor,
  getAllEdition,
  getAllIssue,
  getAllIsWritten,
  getAllRating,
  getPublisherById,
  getIssueById,
  getEditionById,
  getRatingById,
  getSeriesById,
  getIsWrittenById,
  getEdition,
  getDetailEdition,
  getDetailIssue,
};

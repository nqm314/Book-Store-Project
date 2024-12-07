const db = require("../config/db");

const getPublisherById = async (bookId) => {
  try {
    const result = await db.execute(
      "SELECT * FROM publisher, book WHERE publisher.pub_id = book.pub_id and book_id = ?",
      [bookId]
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getSeriesById = async (bookId) => {
  try {
    const result = await db.execute("SELECT * FROM series WHERE book_id = ?", [
      bookId,
    ]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getAuthorById = async (bookId) => {
  try {
    const result = await db.execute(
      "SELECT * FROM is_written, author  WHERE is_written.author_id = author.author_id and book_id = ?",
      [bookId]
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};
const getEditionById = async (bookId) => {
  try {
    const result = await db.execute("SELECT * FROM edition WHERE book_id = ?", [
      bookId,
    ]);
    return result[0];
  } catch (error) {
    throw error;
  }
};
const getRatingById = async (bookId) => {
  try {
    const result = await db.execute("SELECT * FROM rating WHERE book_id = ?", [
      bookId,
    ]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getIssueById = async (bookId) => {
  try {
    const result = await db.execute("SELECT * FROM issue WHERE book_id = ?", [
      bookId,
    ]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getEditionById,
  getIssueById,
  getAuthorById,
  getSeriesById,
  getRatingById,
  getPublisherById,
};

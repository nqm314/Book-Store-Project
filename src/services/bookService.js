const db = require("../config/db");

const getAll = async () => {
  try {
    const results = await db.execute("select * from book");
    return results[0];
  } catch (error) {
    throw error;
  }
};

const getBookById = async (bookId) => {
  try {
    const result = await db.execute("SELECT * FROM book WHERE book_id = ?", [
      bookId,
    ]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

const search = async (query) => {
  try {
    const results = await db.execute(
      "select * from book where title like ? limit 10",
      [`%${query}%`]
    );
    return results[0];
  } catch (error) {
    throw error;
  }
};

const getAllSeries = async () => {
  try {
    const result = await db.execute("SELECT * FROM series");
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getAllAuthor = async () => {
  try {
    const result = await db.execute(
      "SELECT * FROM author ORDER BY lastname ASC"
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getAllIsWritten = async () => {
  try {
    const result = await db.execute("SELECT * FROM is_written");
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getAllEdition = async () => {
  try {
    const result = await db.execute("SELECT * FROM edition");
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getAllRating = async () => {
  try {
    const result = await db.execute("SELECT * FROM rating");
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getAllIssue = async () => {
  try {
    const result = await db.execute("SELECT * FROM issue");
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getBookPubSer = async () => {
  try {
    const result = await db.execute(
      "SELECT book_id, title, book_type, book.pub_id, book.series_id, name, publishing_house FROM book LEFT JOIN publisher ON book.pub_id = publisher.pub_id LEFT JOIN series ON book.series_id = series.series_id"
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  search,
  getBookById,
  getAllSeries,
  getBookPubSer,
  getAllAuthor,
  getAllEdition,
  getAllIssue,
  getAllIsWritten,
  getAllRating,
};

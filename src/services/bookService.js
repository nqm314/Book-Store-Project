const db = require("../config/db");

const getAll = async () => {
  try {
    const results = await db.execute(`SELECT DISTINCT
book.book_id,
book.pub_id,
book.title,
book.description,
book.book_type,
publisher.publishing_house,
COALESCE(edition.price, issue.price) AS price
FROM book
JOIN publisher ON book.pub_id = publisher.pub_id
LEFT JOIN edition ON book.book_id = edition.book_id
LEFT JOIN issue ON book.book_id = issue.book_id`);
    return results[0];
  } catch (error) {
    throw error;
  }
};

const getBookById = async (bookId) => {
  try {
    const result = await db.execute("call getByBookID(?)", [
      bookId,
    ]);
    return result[0][0];
  } catch (error) {
    throw error;
  }
};

const search = async (query) => {
  try {
    const results = await db.execute(
      "SELECT book_id, title, book_type, book.pub_id, book.series_id, name, publishing_house FROM book LEFT JOIN publisher ON book.pub_id = publisher.pub_id LEFT JOIN series ON book.series_id = series.series_id WHERE title like ?",
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
    const result = await db.execute(`select * from edition`);
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
    const result = await db.execute(`select * from issue`);
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
    // console.log(result[0]);
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getAllBookInfo = async (query) => {
  try {
    // Xử lý các điều kiện từ query
    const conditions = [];
    const params = [];

    if (query.price) {
      // Nếu `price` chứa dấu '-' thì lấy khoảng BETWEEN
      if (query.price.includes("-")) {
        const [minPrice, maxPrice] = query.price
          .split("-")
          .map((p) => parseFloat(p.trim()));
        conditions.push(
          "(COALESCE(edition.price, issue.price) BETWEEN ? AND ?)"
        );
        params.push(minPrice, maxPrice);
      } else {
        // Nếu không có dấu '-' thì dùng điều kiện = giá trị cụ thể
        conditions.push("(COALESCE(edition.price, issue.price) >= ?)");
        params.push(parseFloat(query.price.trim()));
      }
    }
    if (query.pub_id) {
      conditions.push("publisher.pub_id = ?");
      params.push(query.pub_id);
    }
    if (query.author_id) {
      conditions.push(
        "book.book_id IN (SELECT book_id FROM is_written WHERE author_id = ?)"
      );
      params.push(query.author_id);
    }

    // Tạo câu WHERE nếu có điều kiện
    const whereClause = conditions.length
      ? ` WHERE ${conditions.join(" AND ")}`
      : "";

    const orderBy = query.sort
      ? ` ORDER BY price ${query.sort === "asc" ? "ASC" : "DESC"}`
      : "";

    // Kết hợp câu truy vấn đầy đủ
    const sqlQuery = `
      SELECT DISTINCT
        book.book_id,
        book.pub_id,
        book.title,
        book.description,
        book.book_type,
        publisher.publishing_house,
        COALESCE(edition.price, issue.price) AS price
      FROM book
      JOIN publisher ON book.pub_id = publisher.pub_id
      LEFT JOIN edition ON book.book_id = edition.book_id
      LEFT JOIN issue ON book.book_id = issue.book_id
      ${whereClause}
      ${orderBy}
    `;
    // console.log(sqlQuery);
    // console.log(params);
    // Thực hiện truy vấn với tham số
    const [rows] = await db.execute(sqlQuery, params);

    return rows;
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
  getAllBookInfo,
};

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
    const result = await db.execute(
      `SELECT 
    b.book_id,
    b.title,
    b.description,
    b.volume_number,
    b.pub_id,
    b.book_type,
    b.series_id,
    b.total_point,
    b.num_of_rating,
    p.publishing_house,
    e.publication_date,
    e.print_run_size,
    e.pages,
    e.format,
    e.price,
    e.isbn,
    r.average_rating
FROM 
    book b
JOIN 
    publisher p ON b.pub_id = p.pub_id
JOIN 
    edition e ON b.book_id = e.book_id
LEFT JOIN (
    SELECT 
        book_id,
        AVG(rating) AS average_rating
    FROM 
        rating
    GROUP BY 
        book_id
) r ON b.book_id = r.book_id
WHERE e.book_id = ?
ORDER BY 
    b.book_id, e.publication_date;
`,
      [bookId]
    );
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
    const result = await db.execute(
      `SELECT 
    b.book_id,
    b.title,
    b.description,
    b.volume_number,
    b.pub_id,
    b.book_type,
    b.series_id,
    b.total_point,
    b.num_of_rating,
    p.publishing_house,
    i.publication_date,
    i.issue_number,
    i.pages,
    i.special_issue,
    i.price,
    i.volume,
    i.issn,
    r.average_rating
FROM 
    book b
JOIN 
    publisher p ON b.pub_id = p.pub_id
JOIN 
    issue i ON b.book_id = i.book_id
LEFT JOIN (
    SELECT 
        book_id,
        AVG(rating) AS average_rating
    FROM 
        rating
    GROUP BY 
        book_id
) r ON b.book_id = r.book_id
WHERE i.book_id = ?
ORDER BY 
    b.book_id, i.issue_number;
`,
      [bookId]
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getDetailIssueById = async (bookId, issn) => {
  try {
    const result = await db.execute(
      `SELECT 
    b.book_id,
    b.title,
    b.description,
    b.volume_number,
    b.pub_id,
    b.book_type,
    b.series_id,
    b.total_point,
    b.num_of_rating,
    p.publishing_house,
    i.publication_date,
    i.issue_number,
    i.pages,
    i.special_issue,
    i.price,
    i.volume,
    i.issn,
    r.average_rating
FROM 
    book b
JOIN 
    publisher p ON b.pub_id = p.pub_id
JOIN 
    issue i ON b.book_id = i.book_id
LEFT JOIN (
    SELECT 
        book_id,
        AVG(rating) AS average_rating
    FROM 
        rating
    GROUP BY 
        book_id
) r ON b.book_id = r.book_id
WHERE i.book_id = ? AND i.issn = ?
ORDER BY 
    b.book_id, i.issue_number;
`,
      [bookId, issn]
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getDetailEditionById = async (bookId, isbn) => {
  try {
    const result = await db.execute(
      `SELECT 
    b.book_id,
    b.title,
    b.description,
    b.volume_number,
    b.pub_id,
    b.book_type,
    b.series_id,
    b.total_point,
    b.num_of_rating,
    p.publishing_house,
    e.publication_date,
    e.print_run_size,
    e.pages,
    e.format,
    e.price,
    e.isbn,
    r.average_rating
FROM 
    book b
JOIN 
    publisher p ON b.pub_id = p.pub_id
JOIN 
    edition e ON b.book_id = e.book_id
LEFT JOIN (
    SELECT 
        book_id,
        AVG(rating) AS average_rating
    FROM 
        rating
    GROUP BY 
        book_id
) r ON b.book_id = r.book_id
WHERE e.book_id = ? AND e.isbn = ?
ORDER BY 
    b.book_id, e.publication_date;
`,
      [bookId, isbn]
    );
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
  getDetailIssueById,
  getDetailEditionById,
};

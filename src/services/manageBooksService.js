const db = require("../config/db");

// tạo book_id
const generateBookID = async (bookType) => {
  let prefix;
  switch (bookType) {
    case "Truyện tranh":
      prefix = "CO";
      break;
    case "Tiểu thuyết":
      prefix = "NO";
      break;
    case "Tạp chí":
      prefix = "MA";
      break;
    case "Sách tham khảo":
      prefix = "RE";
      break;
    default:
      throw new Error("Invalid book type");
  }

  const query = `SELECT book_id FROM book WHERE book_id LIKE '${prefix}%' ORDER BY book_id ASC`;
  const [rows] = await db.execute(query);

  let nextNumber = 1;
  for (let i = 0; i < rows.length; i++) {
    const currentNumber = parseInt(rows[i].book_id.slice(2), 10);
    if (currentNumber > nextNumber) break;
    nextNumber = currentNumber + 1;
  }
  return `${prefix}${String(nextNumber).padStart(3, "0")}`;
};

const createBook = async (book) => {
  const { book_type, title, description, volume_number, pub_id, series_id } =
    book;
  const book_id = await generateBookID(book_type);
  // Xác định giá trị `series_id`

  const query = `
    INSERT INTO book (book_id, title, description, volume_number, book_type, pub_id, series_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  return db.query(query, [
    book_id,
    title,
    description || null,
    volume_number || null,
    book_type,
    pub_id,
    series_id || null,
  ]);
};

const deleteBook = async (bookId) => {
  const query = "DELETE FROM book WHERE book_id = ?";
  return db.query(query, [bookId]);
};

module.exports = {
  createBook,
  deleteBook,
};

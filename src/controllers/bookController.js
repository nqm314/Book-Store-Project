const { bookService } = require("../services");
const path = require("path");
const db = require("../config/db");
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

const searchBook = async (req, res) => {
  try {
    const books = await bookService.search(req.query.q);
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const createBook = (req, res) => {
  res.render("pages/create");
};

const storeBook = async (req, res) => {
  const {
    book_id,
    title,
    link_img,
    description,
    volume_number,
    book_type,
    pub_id,
    series_id,
  } = req.body;

  if (!book_id || !title || !book_type || !pub_id) {
    return res.render("pages/create", { error: "Thiếu thông tin cần thiết" });
  }

  // Xác định giá trị series_id cần ghi vào cơ sở dữ liệu
  const seriesIdValue =
    book_type === "Sách tham khảo" || book_type === "Tiểu thuyết"
      ? series_id
      : null; // Chỉ thêm series_id nếu là "Sách tham khảo" hoặc "Tiểu thuyết"

  try {
    const query = `
      INSERT INTO book (book_id, title, description, volume_number, book_type, pub_id, series_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      book_id,
      title,
      description,
      volume_number,
      book_type,
      pub_id,
      seriesIdValue,
    ]);
    res.redirect("/"); // Chuyển hướng nếu thêm thành công
  } catch (err) {
    console.error("Lỗi khi thêm sách:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.render("pages/create", { error: "Book_ID đã tồn tại." });
    }
    return res.render("pages/create", {
      error: "Lỗi khi thêm sách vào cơ sở dữ liệu",
    });
  }
};

const destroyBook = async (req, res) => {
  const bookId = req.params.book_id; // Lấy book_id từ URL params
  try {
    const query = "DELETE FROM book WHERE book_id = ?";
    await db.query(query, [bookId], (err, result) => {
      if (err) {
        console.log("Lỗi:", err);
        return res.status(500).send("Lỗi khi xóa sách khỏi cơ sở dữ liệu");
      }
      res.status(200).json({ message: "Sách đã được xóa thành công" });
    });
  } catch (err) {
    console.log("Lỗi:", err);
    return res.status(500).send("Lỗi khi xóa sách khỏi cơ sở dữ liệu");
  }
};

module.exports = {
  getAllBook,
  searchBook,
  createBook,
  storeBook,
  destroyBook,
  getBookById,
};

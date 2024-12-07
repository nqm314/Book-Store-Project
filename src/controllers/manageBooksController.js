const path = require("path");
const bookService = require("../services/manageBooksService");
const { response } = require("express");

const createBook = async (req, res) => {
  try {
    const responsePublishers = await fetch(
      "http://localhost:5000/api/publisher/get-all"
    );
    const publishers = await responsePublishers.json();
    const responseSeries = await fetch(
      "http://localhost:5000/api/get-all-series"
    );
    const series = await responseSeries.json();
    res.render("pages/create", {
      success: req.query.success,
      publishers: publishers,
      series: series,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhà xuất bản hoặc series:", error);
    res.render("pages/create", {
      success: req.query.success,
      publishers: [],
      series: [],
    });
  }
};

const showBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params
  const limit = 20; // Số sách mỗi trang
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    // Lấy dữ liệu sách từ API
    const response = await fetch("http://localhost:5000/api/get-book-info");
    const books = await response.json();

    const paginatedBooks = books.slice(startIndex, endIndex); // Lấy sách theo trang

    // Tính tổng số trang
    const totalPages = Math.ceil(books.length / limit);

    // Render trang với dữ liệu sách và thông tin phân trang
    res.render("pages/manageBooks", {
      books: paginatedBooks,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách sách:", err);
    res.status(500).send("Lỗi khi lấy danh sách sách");
  }
};

const storeBook = async (req, res) => {
  const book = req.body;

  // Kiểm tra các trường bắt buộc
  if (!book.title || !book.book_type || !book.pub_id) {
    return res.render("pages/create", {
      error: "Thiếu thông tin cần thiết",
      values: req.body,
    });
  }

  try {
    await bookService.createBook(book);
    res.redirect("/manageBooks/create?success=true"); // Chuyển hướng nếu thêm thành công
  } catch (err) {
    console.error("Lỗi khi thêm sách:", err);
    let errorMsg = "Lỗi khi thêm sách vào cơ sở dữ liệu";
    if (err.code === "ER_DUP_ENTRY") {
      errorMsg = "Book_ID đã tồn tại.";
    }
    return res.render("pages/create", {
      error: errorMsg,
      values: req.body,
    });
  }
};

const destroyBook = async (req, res) => {
  const bookId = req.params.book_id; // Lấy book_id từ URL params
  try {
    await bookService.deleteBook(bookId);
    res.status(200).json({ message: "Sách đã được xóa thành công" });
  } catch (err) {
    console.log("Lỗi:", err);
    return res.status(500).send("Lỗi khi xóa sách khỏi cơ sở dữ liệu");
  }
};

module.exports = {
  createBook,
  storeBook,
  destroyBook,
  showBooks,
};

const path = require("path");
const bookService = require("../services/manageBooksService");
const db = require('../config/db');
const { response } = require("express");
require('dotenv').config()
const baseUrl = `http://localhost:${process.env.PORT || 5000}`;
const createBook = async (req, res) => {
  try {
    const responsePublishers = await fetch(
      `${baseUrl}/api/publisher/get-all`
    );
    const publishers = await responsePublishers.json();
    const responseSeries = await fetch(
      `${baseUrl}/api/get-all-series`
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

const editBook = async (req, res) => {
  try {
    const responsePublishers = await fetch(
      `${baseUrl}/api/publisher/get-all`
    );
    const publishers = await responsePublishers.json();
    const responseSeries = await fetch(
      `${baseUrl}/api/get-all-series`
    );
    const series = await responseSeries.json();
    res.render("pages/editBook", {
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

const searchBooks = async (req, res) => {
  const searchQuery = req.query.q || ""; // Lấy từ khóa tìm kiếm từ query params
  const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params
  const limit = 20; // Số sách mỗi trang
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const sort = req.query.sort || "book_id"; // Lấy tiêu chí sắp xếp từ query params

  console.log("Từ khóa tìm kiếm o trang quan ly sach:", searchQuery);
  console.log("Tiêu chí sắp xếp:", sort);

  try {
    // Lấy dữ liệu sách từ API
    const response = await fetch(`${baseUrl}/api/book/search?q=${encodeURIComponent(searchQuery)}`);
    let books = await response.json();

    console.log("Danh sách sách tìm kiếm được:", books);

    // Sắp xếp sách theo tiêu chí
    books = books.sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      } else if (sort === "type") {
        return a.book_type.localeCompare(b.book_type);
      } else if (sort === "publisher") {
        return a.publishing_house.localeCompare(b.publishing_house);
      } else {
        return a.book_id - b.book_id; // Sắp xếp theo ID sách mặc định
      }
    });

    const paginatedBooks = books.slice(startIndex, endIndex); // Lấy sách theo trang

    // Tính tổng số trang
    const totalPages = Math.ceil(books.length / limit);

    // Render trang với dữ liệu sách và thông tin phân trang
    res.render("pages/manageBooks", {
      books: paginatedBooks,
      currentPage: page,
      totalPages: totalPages,
      searchQuery: searchQuery,
      sort: sort, // Truyền tiêu chí sắp xếp vào template
    });
  } catch (err) {
    console.error("Lỗi khi tìm kiếm sách:", err);
    res.status(500).send("Lỗi khi tìm kiếm sách");
  }
};

const showBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params
  const limit = 20; // Số sách mỗi trang
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const sort = req.query.sort || "book_id"; // Lấy tiêu chí sắp xếp từ query params

  try {
    // Lấy dữ liệu sách từ API
    const response = await fetch(`${baseUrl}/api/get-book-info`);
    let books = await response.json();

    // Sắp xếp sách theo tiêu chí
    books = books.sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      } else if (sort === "type") {
        return a.book_type.localeCompare(b.book_type);
      } else if (sort === "publisher") {
        return a.publishing_house.localeCompare(b.publishing_house);
      } else {
        return a.book_id - b.book_id; // Sắp xếp theo ID sách mặc định
      }
    });

    const paginatedBooks = books.slice(startIndex, endIndex); // Lấy sách theo trang

    // Tính tổng số trang
    const totalPages = Math.ceil(books.length / limit);

    // Render trang với dữ liệu sách và thông tin phân trang
    res.render("pages/manageBooks", {
      books: paginatedBooks,
      currentPage: page,
      totalPages: totalPages,
      searchQuery: "", // Pass an empty searchQuery
      sort: sort, // Truyền tiêu chí sắp xếp vào template
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách sách:", err);
    res.status(500).send("Lỗi khi lấy danh sách sách");
  }
};

const storeBook = async (req, res) => {
  console.log('Body data: ', req.body); // Kiểm tra dữ liệu đầu vào từ client

  // Lấy thông tin từ request body
  const { Title, Description, VolumeNumber, Type, PubName, SeriesName } = req.body;

  // Kiểm tra dữ liệu bắt buộc
  if (!Title || !PubName) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết! Vui lòng kiểm tra tên sách và nhà xuất bản.' });
  }

  try {
      // Gọi thủ tục lưu trữ để thêm sách
      const query = `CALL insertBook(?, ?, ?, ?, ?, ?)`;
      const [rows] = await db.execute(query, [
          Title,           // Tên sách
          Description,     // Mô tả
          VolumeNumber,    // Số tập (nếu là series)
          Type,            // Loại sách
          PubName,         // Tên nhà xuất bản
          SeriesName       // Tên bộ sách (nếu có)
      ]);

      // Kiểm tra kết quả trả về từ thủ tục lưu trữ
      if (rows && rows[0] && rows[0][0] && rows[0][0].BookID) {
          const bookID = rows[0][0].BookID; // Lấy BookID của sách vừa thêm
          console.log("BookID mới được thêm: ", bookID);
          return res.status(200).json({ message: "Thêm sách thành công!", BookID: bookID });
      } else {
          throw new Error("Không thể lấy BookID sau khi thêm sách.");
      }
  } catch (err) {
      console.error("Database error: ", err.sqlMessage || err.message);
      return res.status(500).json({ message: err.sqlMessage || "Đã xảy ra lỗi khi thêm sách vào cơ sở dữ liệu." });
  }
};


const storeEditionToDB = async (req, res) => {
  console.log('Body data: ', req.body); // Kiểm tra dữ liệu đầu vào từ client

  // Lấy thông tin từ request body
  const { ISBN, PubDate, PrnRunSz, Pages, Format, Price, Amount, BookID } = req.body;

  // Kiểm tra dữ liệu bắt buộc
  if (!ISBN || !PubDate || !PrnRunSz || !Pages || !Format || !Price) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết! Vui lòng kiểm tra.' });
  }

  try {
      // Gọi thủ tục lưu trữ để thêm sách
      const query = `CALL insertEdition(?,?,?,?,?,?,?,?)`;
      const [rows] = await db.execute(query, [
          ISBN,
          PubDate, 
          PrnRunSz,
          Pages,
          Format,
          Price,
          BookID,
          Amount
      ]);

      // Kiểm tra kết quả trả về từ thủ tục lưu trữ
      if (rows && rows[0] && rows[0][0] && rows[0][0].NewISBN) {
          return res.status(200).json({ message: "Thêm ấn bản thành công!", newISBN: rows[0][0].NewISBN });
      } else {
          throw new Error("Không thể lấy ISBN sau khi thêm edition.");
      }
  } catch (err) {
      console.error("Database error: ", err.sqlMessage || err.message);

      // Trả về lỗi cụ thể từ SQL hoặc thông báo lỗi chung
      return res.status(500).json({
          message: err.sqlMessage || "Đã xảy ra lỗi khi thêm ấn bản vào cơ sở dữ liệu.",
      });
  }
};


const storeIssueToDB = async (req, res) => {
  console.log('Body data: ', req.body); // Kiểm tra dữ liệu đầu vào từ client

  // Lấy thông tin từ request body
  const { ISSN, IssueNumber, PubDate, Pages, SpecialIssue, Volume, Price, Amount, BookID } = req.body;

  // Kiểm tra dữ liệu bắt buộc
  if (!ISSN || !IssueNumber || !PubDate || !Pages || !Price || !Volume) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết! Vui lòng kiểm tra.' });
  }

  try {
      // Gọi thủ tục lưu trữ để thêm sách
      const query = `CALL insertIssue(?,?,?,?,?,?,?,?,?)`;
      const [rows] = await db.execute(query, [
          ISSN,
          IssueNumber, 
          PubDate,
          Pages,
          SpecialIssue,
          Volume,
          Price,
          Amount,
          BookID
      ]);

      // Kiểm tra kết quả trả về từ thủ tục lưu trữ
      if (rows && rows[0] && rows[0][0] && rows[0][0].NewISSN) {
          return res.status(200).json({ message: "Thêm số phát hành thành công!", newISSN: rows[0][0].NewISSN });
      } else {
          throw new Error("Không thể lấy ISSN sau khi thêm issue.");
      }
  } catch (err) {
      console.error("Database error: ", err.sqlMessage || err.message);

      // Trả về lỗi cụ thể từ SQL hoặc thông báo lỗi chung
      return res.status(500).json({
          message: err.sqlMessage || "Đã xảy ra lỗi khi thêm số phát hành vào cơ sở dữ liệu.",
      });
  }
};

const destroyBook = async (req, res) => {
  const bookId = req.params.book_id; // Lấy book_id từ URL params
  console.log(bookId);
  try {
    await bookService.deleteBook(bookId);
    res.status(200).json({ message: "Sách đã được xóa thành công" });
  } catch (err) {
    console.log("Lỗi:", err);
    return res.status(500).send("Lỗi khi xóa sách khỏi cơ sở dữ liệu");
  }
};

const updateBook = async (req, res) => {
  try {
      const bookID = req.params.book_id; // Lấy ID sách từ URL
      console.log(bookID);
      console.log(req.body);
      const {
          title,
          description,
          volume_number,
          bookType,
          PublisherName,
          SeriesName,
      } = req.body; // Lấy dữ liệu từ request body

      // Đảm bảo các tham số không phải undefined, thay vào đó là null nếu không được cung cấp
      const titleValue = title || null;
      const descriptionValue = description || null;
      const volumeNumberValue = volume_number || null;
      const typeValue = bookType || null;
      const publisherNameValue = PublisherName || null;
      const seriesNameValue = SeriesName || null;
      // const discountIDValue = null;

      // Gọi procedure updateBook
      const query = 'CALL updateBook(?, ?, ?, ?, ?, ?, ?)';
      const [rows, fields] = await db.execute(query, [
          bookID,
          titleValue,
          descriptionValue,
          volumeNumberValue,
          typeValue,
          publisherNameValue,
          seriesNameValue,
          // discountIDValue,
      ]);

      res.status(200).json({message: "Cập nhật sách thành công!"});
  } catch (error) {
      console.error("Database error: ", error.sqlMessage);
      res.status(400).json({message: error.sqlMessage || "Đã xảy ra lỗi."});
  }
};

module.exports = {
  createBook,
  editBook,
  storeBook,
  searchBooks,
  storeEditionToDB,
  storeIssueToDB,
  destroyBook,
  showBooks,
  updateBook,
};

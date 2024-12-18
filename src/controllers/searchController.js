const { response } = require("express");
const db = require("../config/db");
const bookService = require("../services/bookService");
const publisherService = require("../services/publisherService");

const searchFieldBook = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const field = req.query;
  // console.log(field);
  try {
    const query = {
      title: req.query.title || "",
      price: req.query.price || "",
      pub_id: req.query.pub_id || "",
      author_id: req.query.author_id || "",
      sort: req.query.sort || "",
    };
    const [publishers, authors, books, is_writtens] = await Promise.all([
      publisherService.getAll(),
      bookService.getAllAuthor(),
      bookService.getAllBookInfo(field),
      bookService.getAllIsWritten(),
    ]);
    

    // Thực hiện phân trang
    const totalBooks = books.length;
    const totalPages = Math.ceil(totalBooks / limit);
    const paginatedBooks = books.slice(startIndex, endIndex);

    res.locals.bookPage = true;
    // Render trang searchFieldBook với dữ liệu đã lọc
    res.render("pages/searchFieldBook", {
      publishers: publishers,
      authors: authors,
      books: books,
      is_writtens: is_writtens,
      paginatedBooks: paginatedBooks,
      currentPage: page,
      totalPages: totalPages,
      query: query,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("pages/searchFieldBook", {
      publishers: [],
      authors: [],
      books: [],
      is_writtens: [],
      paginatedBooks: [],
      currentPage: 1,
      totalPages: 1,
    });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.book_id;
    const selectedVersion = req.query.version || ""; // Lấy giá trị từ query string
    const authors = await fetch(
      `http://localhost:5000/api/book/is-written/${bookId}`
    ).then((response) => response.json());
    const editions = await fetch(
      `http://localhost:5000/api/book/edition/${bookId}`
    ).then((response) => response.json());
    const issues = await fetch(
      `http://localhost:5000/api/book/issue/${bookId}`
    ).then((response) => response.json());
    const edition = await fetch(
      `http://localhost:5000/api/book/edition/${bookId}/${selectedVersion}`
    ).then((response) => response.json());
    const issue = await fetch(
      `http://localhost:5000/api/book/issue/${bookId}/${selectedVersion}`
    ).then((response) => response.json());
    const authorsList = authors.map(
      (author) => `${author.lastname} ${author.firstname}`
    );

    const book_des =
      bookId.startsWith("CO") || bookId.startsWith("MA") ? issues : editions;
    const book_de =
      bookId.startsWith("CO") || bookId.startsWith("MA") ? issue : edition;
    res.render("pages/bookDetail", {
      authors: authorsList,
      book_des: book_des,
      book_de: book_de[0],
      selectedVersion, // Truyền giá trị này qua view
    });
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).send("Lỗi khi lấy thông tin chi tiết sách");
  }
};

module.exports = {
  searchFieldBook,
  getBookDetails,
};

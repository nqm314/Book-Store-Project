const searchFieldBook = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    // Lấy danh sách từ API
    const [publishers, authors, books, editions, issues, is_writtens, ratings] =
      await Promise.all([
        fetch("http://localhost:5000/api/publisher/get-all").then((response) =>
          response.json()
        ),
        fetch("http://localhost:5000/api/author/get-all").then((response) =>
          response.json()
        ),
        fetch("http://localhost:5000/api/book/get-all").then((response) =>
          response.json()
        ),
        fetch("http://localhost:5000/api/book/edition/get-all").then(
          (response) => response.json()
        ),
        fetch("http://localhost:5000/api/book/issue/get-all").then((response) =>
          response.json()
        ),
        fetch("http://localhost:5000/api/book/is-written/get-all").then(
          (response) => response.json()
        ),
        fetch("http://localhost:5000/api/book/rating/get-all").then(
          (response) => response.json()
        ),
      ]);

    const paginatedBooks = books.slice(startIndex, endIndex);
    const totalPages = Math.ceil(books.length / limit);

    console.log(authors);
    // Render trang searchFieldBook với dữ liệu từ API
    res.render("pages/searchFieldBook", {
      publishers: publishers,
      authors: authors,
      books: books,
      editions: editions,
      issues: issues,
      is_writtens: is_writtens,
      ratings: ratings,
      paginatedBooks: paginatedBooks,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("pages/searchFieldBook", {
      publishers: [],
      authors: [],
      books: [],
      editions: [],
      issues: [],
      is_writtens: [],
      ratings: [],
    });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.book_id;
    const book = await fetch(`http://localhost:5000/api/book/${bookId}`).then(
      (response) => response.json()
    );
    const authors = await fetch(
      `http://localhost:5000/api/book/is-written/${bookId}`
    ).then((response) => response.json());
    const editions = await fetch(
      `http://localhost:5000/api/book/edition/${bookId}`
    ).then((response) => response.json());
    const issues = await fetch(
      `http://localhost:5000/api/book/issue/${bookId}`
    ).then((response) => response.json());
    const publisher = await fetch(
      `http://localhost:5000/api/publisher/${bookId}`
    ).then((response) => response.json());

    const authorsList = authors.map(
      (author) => `${author.lastname} ${author.firstname}`
    );
    const prices = [
      ...editions.map((edition) => edition.price),
      ...issues.map((issue) => issue.price),
    ];
    const price = prices.length > 0 ? Math.min(...prices) : null;
    const book_de =
      book[0].book_type === "Truyện tranh" || book[0].book_type === "Tạp chí"
        ? issues
        : editions;
    res.render("pages/bookDetail", {
      book: book[0],
      authors: authorsList,
      publisher: publisher[0],
      price: price,
      book_de: book_de[0],
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

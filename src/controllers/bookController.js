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
// const storeBook = async (req, res) => {
//   const {
//     book_id,
//     title,
//     link_img,
//     description,
//     volume_number,
//     book_type,
//     pub_id,
//   } = req.body;
//   console.log(req.body);
//   if (!book_id || !title || !book_type || !pub_id) {
//     return res.status(400).send("Thiếu thông tin cần thiết");
//   }
//   try {
//     const query =
//       "INSERT INTO book (book_id, title, description, volume_number, book_type, pub_id) VALUES (?, ?, ?, ?, ?, ?)";
//     await db.query(
//       query,
//       [book_id, title, description, volumn_number, book_type, pub_id],
//       (err, result) => {
//         if (err) {
//           if (err.code === "ER_DUP_ENTRY") {
//             return res.render("create", { error: "Book_ID đã tồn tại." });
//           }
//           return res.status(500).send("Lỗi khi thêm sách vào cơ sở dữ liệu");
//         }
//         res.redirect("/");
//       }
//     );
//   } catch (err) {
//     console.error("Lỗi khi thêm sách:", err);
//     if (err.code == "ER_DUP_ENTRY") {
//       res.return;
//     }
//     return res.status(500).send("Lỗi khi thêm sách vào cơ sở dữ liệu");
//   }
// };
// const storeBook = async (req, res) => {
//   const {
//     book_id,
//     title,
//     link_img,
//     description,
//     volume_number,
//     book_type,
//     pub_id,
//   } = req.body;

//   if (!book_id || !title || !book_type || !pub_id) {
//     return res.render("pages/create", {
//       error: "Thiếu thông tin cần thiết",
//     });
//   }

//   try {
//     const query =
//       "INSERT INTO book (book_id, title, description, volume_number, book_type, pub_id) VALUES (?, ?, ?, ?, ?, ?)";
//     await db.query(query, [
//       book_id,
//       title,
//       description,
//       volume_number,
//       book_type,
//       pub_id,
//     ]);

//     // Sau khi thêm thành công, chuyển hướng về trang chủ
//     return res.redirect("/");
//   } catch (err) {
//     console.error("Lỗi khi thêm sách:", err);
//     if (err.code == "ER_DUP_ENTRY") {
//       return res.render("pages/create", {
//         error: "Book ID đã tồn tại",
//       });
//     }
//     return res.status(500).send("Lỗi khi thêm sách vào cơ sở dữ liệu");
//   }
// };
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

    return res.redirect("/"); // Chuyển hướng nếu thêm thành công
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

module.exports = {
  getAllBook,
  searchBook,
  createBook,
  storeBook,
};

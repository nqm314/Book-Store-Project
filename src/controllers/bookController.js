const { bookService } = require('../services');
const path = require('path') 
const db = require('../config/db');
const { error } = require('console');

const getAllBook = async (req, res) => {
    try {
        const books = await bookService.getAll();
        return res.status(200).json(books);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

const searchBook = async (req, res) => {
    try {
        const books = await bookService.search(req.query.q);
        return res.status(200).json(books);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

const addBook = (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/views/pages/addBook.html"));
}

const getBookByID = async (req, res) => {
    const bookID = req.params.book_id;
    console.log("bookController nha ", bookID);
    try {
        const book = await bookService.getBookByID(bookID);

        if (!book) {
            return res.status(404).json({ message: "Không tìm thấy sách." });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred while fetching the book.")
    }
}

const storeBookToDB = async (req, res) => {
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
    const { BookID, ISBN, PubDate, PrnRunSz, Pages, Format, Price, Amount } = req.body;

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
    const { ISSN, IssueNumber, PubDate, Pages, SpecialIssue, Volume, Price, BookID, Amount } = req.body;

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
            BookID,
            Amount
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


const deleteBook = async (req, res) => {
    const bookID = req.params.book_id;
    try {
        // Gọi procedure deleteBook
        const query = 'CALL deleteBook(?)';
        const [rows, fields] = await db.execute(query, [bookID]);

        // Kiểm tra kết quả trả về từ procedure (Message)
        if (rows && rows.length > 0) {
            res.status(200).json({ message: rows[0].Message });
        } else {
            res.status(400).send('Lỗi khi xóa sách khỏi cơ sở dữ liệu');
        }
    } catch (err) {
        console.log("Lỗi: ", err);
        return res.status(500).send("Lỗi khi xóa sách khỏi cơ sở dữ liệu");
    }
};


const updateBook = async (req, res) => {
    try {
        const bookID = req.params.book_id; // Lấy ID sách từ URL
        const {
            Title,
            Description,
            VolumeNumber,
            Type,
            PubName,
            SeriesName,
        } = req.body; // Lấy dữ liệu từ request body

        // Đảm bảo các tham số không phải undefined, thay vào đó là null nếu không được cung cấp
        const titleValue = Title || null;
        const descriptionValue = Description || null;
        const volumeNumberValue = VolumeNumber || null;
        const typeValue = Type || null;
        const publisherNameValue = PubName || null;
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


const filterBooks = async (req, res) => {
    console.log('Full request URL: ', req.originalUrl);
    console.log('Query parameters: ', req.query); // Log lại

    const type = req.query.type;
    const priceRange = req.query.priceRange;
    const rating = req.query.rating;
    console.log('Type: ', type);
    console.log('Price Range: ', priceRange);
    console.log('Rating: ', rating);

    try {
        // Calling the stored procedure
        const [books] = await db.execute(
            'CALL book_filter(?, ?, ?)', 
            [type || null, priceRange || null, rating || null]
        );
        // console.log(books[0]);

        res.status(200).json(books[0]); // Send back the filtered books
    } catch (error) {
        console.error("Error while filtering books: ", error);
        res.status(500).send("An error occurred while filtering books.");
    }
};

const getBookPaginated = async (req, res) => {
    const { page, limit } = req.query;

    // Ép kiểu và đảm bảo giá trị hợp lệ
    const pageValue = parseInt(page, 10) || 1; // Page mặc định là 1
    const limitValue = parseInt(limit, 10) || 20; // Limit mặc định là 20
    const offset = (pageValue - 1) * limitValue; // Tính offset

    console.log('Page:', pageValue, 'Limit:', limitValue, 'Offset:', offset);

    try {
        // Kiểm tra giá trị trước khi truyền vào truy vấn
        if (isNaN(limitValue) || isNaN(offset)) {
            throw new Error('Invalid input for LIMIT or OFFSET');
        }

        // Truy vấn danh sách sách
        const [books] = await db.execute(
            `SELECT * FROM book_store.book LIMIT ? OFFSET ?`,
            [limitValue, offset]
        );

        // Truy vấn tổng số sách
        const [totalBooks] = await db.execute(`
            SELECT COUNT(*) AS total FROM book_store.book
        `);

        const totalPages = Math.ceil(totalBooks[0].total / limitValue); // Tổng số trang

        // Trả kết quả JSON
        res.status(200).json({
            books,
            currentPage: pageValue,
            totalPages,
        });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sách.' });
    }
};



module.exports = {
    getAllBook,
    searchBook,
    addBook, 
    getBookByID,
    storeBookToDB,
    deleteBook,
    updateBook,
    filterBooks,
    getBookPaginated,
    storeEditionToDB,
    storeIssueToDB,
}
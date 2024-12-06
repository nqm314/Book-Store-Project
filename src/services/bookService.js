const db = require('../config/db');

const getAll = async () => {
    try {
        const query = `
        SELECT *
        FROM (
            SELECT *
            FROM book_store.book
            ORDER BY BookID DESC
            LIMIT 20
        ) AS subquery
        ORDER BY BookID ASC;`;

        const results = await db.execute(query);
        return results[0];
    } catch (error) {
        throw error;
    }
};

const search = async (query) => {
    try {
        const results = await db.execute('select * from book where title like ? limit 10',[`%${query}%`]);
        return results[0];
    } catch (error) {
        throw error;
    }
}

const getBookByID = async (bookId) => {
    try {
      const result = await db.execute("call getByBookID(?)", [
        bookId,
      ]);
      return result[0][0];
    } catch (error) {
      throw error;
    }
};

// const updateBookByID = (bookId, updatedFields) => {
//     const q = `UPDATE book
//     SET 
//       Title = ?,
//       Image = ?,
//       Description = ?,
//       VolumeNumber = ?,
//       BookType = ?,
//       SeriesID = ?,
//       PubID = ?
//     WHERE BookID = ?`;

//     const values = [
//         updatedFields.Title,
//         updatedFields.Image,
//         updatedFields.Description,
//         updatedFields.VolumeNumber,
//         updatedFields.BookType,
//         updatedFields.SeriesID,
//         updatedFields.PubID,
//         bookId,
//     ];

//     return new Promise((resolve, reject) => {
//         db.query(q, values, (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         });
//     });
// }

module.exports = {
    getAll,
    search,
    getBookByID,
    // updateBookByID,
}
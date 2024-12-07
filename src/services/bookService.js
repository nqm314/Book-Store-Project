const db = require('../config/db');

const getAll = async () => {
    try {
        const results = await db.execute('select * from book limit 10');
        return results[0];
    } catch (error) {
        throw error;
    }
}

const getComicHot = async () => {
    try {
        const query = `
            SELECT b.*, i.price, (SUM(r.rating) / COUNT(r.rating)) AS rate, COUNT(r.rating) AS count 
            FROM book b
            JOIN rating r ON b.book_id = r.book_id
            JOIN issue i ON b.book_id = i.book_id
            WHERE b.book_type = 'Truyện tranh'
            GROUP BY b.book_id, i.price
            ORDER BY (SUM(r.rating) / COUNT(r.rating)) DESC 
            LIMIT 6;`
        const result = await db.execute(query);
        return result[0];
    } catch (error) {
        throw error;
    }
}

const getMagazineHot = async () => {
    try {
        const query = `
            SELECT b.*, i.price, (SUM(r.rating) / COUNT(r.rating)) AS rate, COUNT(r.rating) AS count 
            FROM book b
            JOIN rating r ON b.book_id = r.book_id
            JOIN issue i ON b.book_id = i.book_id
            WHERE b.book_type = 'Tạp chí'
            GROUP BY b.book_id, i.price
            ORDER BY (SUM(r.rating) / COUNT(r.rating)) DESC 
            LIMIT 6;`
        const result = await db.execute(query);
        return result[0];
    } catch (error) {
        throw error;
    }
}

const getNovelHot = async () => {
    try {
        const query = `
            SELECT b.*, e.price, (SUM(r.rating) / COUNT(r.rating)) AS rate, COUNT(r.rating) AS count 
            FROM book b
            JOIN rating r ON b.book_id = r.book_id
            JOIN edition e ON b.book_id = e.book_id
            WHERE b.book_type = 'Tiểu thuyết'
            GROUP BY b.book_id, e.price
            ORDER BY (SUM(r.rating) / COUNT(r.rating)) DESC 
            LIMIT 6;`
        const result = await db.execute(query);
        return result[0];
    } catch (error) {
        throw error;
    }
}

const getReferenceHot = async () => {
    try {
        const query = `
            SELECT b.*, e.price, (SUM(r.rating) / COUNT(r.rating)) AS rate, COUNT(r.rating) AS count 
            FROM book b
            JOIN rating r ON b.book_id = r.book_id
            JOIN edition e ON b.book_id = e.book_id
            WHERE b.book_type = 'Sách tham khảo'
            GROUP BY b.book_id, e.price
            ORDER BY (SUM(r.rating) / COUNT(r.rating)) DESC 
            LIMIT 6;`
        const result = await db.execute(query);
        return result[0];
    } catch (error) {
        throw error;
    }
}

const search = async (query) => {
    try {
        const results = await db.execute('select * from book where title like ? limit 10',[`%${query}%`]);
        return results[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    getComicHot,
    getMagazineHot,
    getNovelHot,
    getReferenceHot,
    search,
}
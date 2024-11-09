const db = require('../config/db');

const getAll = async () => {
    try {
        const results = await db.execute('select * from book where book_type = ? limit 10',["Truyện tranh"]);
        return results[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
}
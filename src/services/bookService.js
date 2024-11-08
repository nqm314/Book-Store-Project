const db = require('../config/db');

const getAll = async () => {
    try {
        const results = await db.execute('select * from book limit 10');
        return results[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
}
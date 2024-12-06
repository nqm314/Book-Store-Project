const db = require('../config/db');

const findStaffByUsername = async (username) => {
    try {
        const result = await db.query('SELECT * FROM staff WHERE username = ?', [username]);
        return result[0][0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findStaffByUsername,
}
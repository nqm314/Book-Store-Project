const db = require('../config/db');

const findCustomerByUsername = async (username) => {
    try {
        const result = await db.query('SELECT * FROM customer WHERE username = ?', [username]);
        return result[0][0];
    } catch (error) {
        throw error;
    }
}

const findCustomerById = async (customerID) => {
    try {
        const result = await db.query('SELECT * FROM customer WHERE customer_id = ?', [customerID]);
        return result[0][0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findCustomerByUsername,
    findCustomerById,
}
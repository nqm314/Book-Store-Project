const db = require('../config/db');

const getNumOfCustomers = async () => {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) AS total_customers FROM customer');
        return rows[0].total_customers;
    } catch (error) {
        console.error('Error fetching number of customers:', error.message);
        throw error; 
    }
}

const getTotalRevenue = async () => {
    try {
        const [rows] = await db.execute('SELECT SUM(Cost) AS total_revenue FROM `order`');
        return rows[0].total_revenue; 
    } catch (error) {
        console.error('Error fetching total revenue:', error.message);
        throw error; 
    }
}

const getNumOfBooks = async () => {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) AS total_books FROM book');
        return rows[0].total_books; 
    } catch (error) {
        console.error('Error fetching number of books:', error.message);
        throw error; 
    }
}

module.exports = {
    getNumOfCustomers, 
    getTotalRevenue,
    getNumOfBooks
};

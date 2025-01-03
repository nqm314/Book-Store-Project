const db = require('../config/db');

const getNumOfCustomers = async () => {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) AS total_customers FROM book_store.customer');
        return rows[0].total_customers;
    } catch (error) {
        console.error('Error fetching number of customers:', error.message);
        throw error; 
    }
}

const getNumOfOrders = async () => {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) AS total_orders FROM book_store.orders;');
        return rows[0].total_orders; 
    } catch (error) {
        console.error('Error fetching total revenue:', error.message);
        throw error; 
    }
}

const getNumOfBooks = async () => {
    try {
        const [rows] = await db.execute('SELECT COUNT(*) AS total_books FROM book_store.book');
        return rows[0].total_books; 
    } catch (error) {
        console.error('Error fetching number of books:', error.message);
        throw error; 
    }
}

const getTopCustomers = async () => {
    try {
        const [rows] = await db.execute('SELECT customer_id, name, sex, level, order_sum FROM customer ORDER BY order_sum DESC LIMIT 10;');
        return rows;
    } catch (error) {
        console.error('Error fetching top customers:', error.message);
        throw error; 
    }
}

module.exports = {
    getNumOfCustomers, 
    getNumOfOrders,
    getNumOfBooks,
    getTopCustomers,
};
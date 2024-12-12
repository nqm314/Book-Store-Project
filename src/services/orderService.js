const db = require("../config/db");

const totalPages = async (customer_id) => {
    try {
        const limit = 10;
        const result = await db.execute(
            'SELECT COUNT(*) AS total FROM orders WHERE customer_id = ?',
            [customer_id]
        );
        return Math.ceil(result[0][0].total / limit);
    } catch (error) {
        throw error;
    }
}

const getOrderByCustomer = async (customer_id, page = 1, start_date, end_date) => {
    try {
        const limit = 10;
        const offset = (Number(page) - 1) * limit

        if(!start_date) {
            start_date = '2024-01-01'
        }
        if(!end_date) {
            const today = new Date();
            end_date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
        }

        const result = await db.execute(
            `SELECT * FROM orders 
            WHERE customer_id = ? AND date BETWEEN ? AND ?
            ORDER BY date DESC, order_id DESC 
            LIMIT ${limit} OFFSET ${offset}`,
            [customer_id, start_date, end_date]
        );
        for (const data of result[0]) {
            const date = new Date(data.date);
            data.date = `${String(date.getDate()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getFullYear())}`
        }
        return result[0];
    } catch (error) {
        throw error;
    }
};

const createOrder = async (customerID, cart, address) => {
    try {
        const totalPrice = Math.ceil(cart.totalPrice * (100 - cart.discount.percentage) / 100);
        const result = await db.execute('CALL createOrder(?, ?, ?, ?)', [customerID, cart.shipfee, totalPrice, address])
        return result[0][0][0].order_id;
    } catch (error) {
        throw error;
    }
}

const addProductToOrder = async (orderID, bookType, isbn, issn, quantity) => {
    try {
        let productID;
        if(bookType === 'Truyện tranh' || bookType === 'Tạp chí') {
            productID = issn;
        } else {
            productID = isbn;
        }
        const result = await db.execute('CALL addProductToOrder (?, ?, ?, ?)', [orderID, bookType, productID, quantity]);
        return result;
    } catch (error) {
        throw error;
    }
}

const addDiscountToOrder = async (orderID, discountID) => {
    try {
        const result = await db.execute('INSERT INTO is_applied_for VALUES (?, ?)', [orderID, discountID])
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    totalPages,
    getOrderByCustomer,
    createOrder,
    addProductToOrder,
    addDiscountToOrder,
};
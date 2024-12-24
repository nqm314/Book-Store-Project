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
const getAll = async () => {
  try {
    const result = await db.execute(
      "SELECT * FROM orders o LEFT JOIN customer c ON o.customer_id = c.customer_id");
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getDetailOrder = async (orderId) => {
  try {
    const query = `
      SELECT 
        o.order_id, o.date, o.address, o.status, 
        o.shipment_cost,
        o.original_price AS OriginalPrice,
        o.customer_id, o.staff_id, o.shipment_id,
        c.name AS CustomerName, c.sex AS CustomerSex, c.age AS CustomerAge, c.level AS CustomerLevel, c.order_sum as CustomerOrderSum,
        CONCAT(s.firstname, " ", s.lastname) AS StaffName, s.Salary AS StaffSalary, s.hire_date AS StaffHired 
      FROM orders o
      LEFT JOIN customer c ON o.customer_id = c.customer_id
      LEFT JOIN staff s ON o.staff_id = s.staff_id 
      WHERE o.order_id = ?
      `;
    const [rows] = await db.execute(query, [orderId]); // Execute query with parameterized inputs
    return rows[0]; // Return the first matching order or `undefined` if no match
  } catch (error) {
    console.error("Error in getDetailOrder:", error);
    throw error;
  }
};


const getOrderByCustomer = async (customer_id, page = 1, start_date, end_date) => {
    try {
        const limit = 10;
        const offset = (Number(page) - 1) * limit

        if(!start_date) {
            start_date = '2022-01-01'
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

const checkout = async (customer_id, cart, address) => {
    const product = JSON.stringify(cart.products);
    await db.beginTransaction();
    try {
        await db.execute('CALL checkout (?, ?, ?, ?, ?, ?)', [customer_id, cart.shipfee, address, cart.discount.discount_id, cart.discount.percentage, product]);
        await db.commit();
    } catch (err) {
        await db.rollback();
        throw err;
    }
}

module.exports = {
    totalPages,
    getOrderByCustomer,
    checkout,
  getAll,
  getDetailOrder,

};
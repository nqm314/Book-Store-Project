const db = require("../config/db");

const getAll = async () => {
  try {
    const result = await db.execute("SELECT * FROM `orders`");
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


module.exports = {
  getAll,
  getDetailOrder,
};
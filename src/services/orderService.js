const db = require("../config/db");

const getAll = async () => {
  try {
    const result = await db.execute("SELECT * FROM `customerorder` LIMIT 10");
    return result[0];
  } catch (error) {
    throw error;
  }
};

const getDetailOrder = async (orderId) => {
  try {
    const query = `
      SELECT 
        o.OrderID, o.OrderDate, o.OrderAddress, o.OrderStatus, 
        o.ShipFee, o.PaymentMethod, o.PaymentTime, o.ExpectedComplete,
        o.original_price AS OriginalPrice,
        o.CustomerID, o.StaffID, o.ShipperID,
        c.name AS CustomerName, c.sex AS CustomerSex, c.age AS CustomerAge, c.level AS CustomerLevel, c.order_sum as CustomerOrderSum,
        CONCAT(s.fname, " ", s.lname) AS StaffName, s.Salary AS StaffSalary, s.HireDate AS StaffHired,
 		    sh.ShipperName, sh.PhoneNumber, sh.City, sh.Address
      FROM \`customerorder\` o
      LEFT JOIN customer c ON o.CustomerID = c.CustomerID
      LEFT JOIN staff s ON o.StaffID = s.StaffID
      LEFT JOIN shipper sh ON o.ShipperID = sh.ShipperID
      WHERE o.OrderID = ?
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
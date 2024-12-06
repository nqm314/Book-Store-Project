const { orderService } = require("../services");
const db = require("../config/db");

const getAllOrder = async (req, res) => {
  try {
    const orders = await orderService.getAll();
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};

const getOrderDetail = async (req, res) => {
  const orderID = req.params.orderId;
  try {
    const order = await orderService.getDetailOrder(orderID);
    return res.status(200).json(order);
  } catch (error) {
    throw error;
  }
};

const getOrdersAboveThreshold = async (req, res) => {
  console.log("Body data: ", req.query);

  // Lấy và kiểm tra giá trị từ query string
  const { threshold, status, paymentMethod } = req.query;

  // Kiểm tra threshold
  if (!threshold || isNaN(threshold)) {
    return res.status(400).json({ error: "Invalid threshold value." });
  }

  try {
    // Gọi service với các giá trị lọc
    const [orders] = await db.execute(`
      CALL orderFilter(?,?,?)`,
      [parseInt(threshold), status || null, paymentMethod || null] 
    );

    res.status(200).json(orders[0]);
  } catch (error) {
    // Bắt lỗi từ service và gửi thông báo lỗi chi tiết
      console.error("Error while filtering orders: ", error);
      res.status(500).send("An error occurred while filtering orders.");
  }
};


module.exports = {
  getAllOrder,
  getOrderDetail,
  getOrdersAboveThreshold,
};
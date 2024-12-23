const { orderService } = require("../services");
const db = require("../config/db");

const showOders = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params
    const limit = 20; // Số sách mỗi trang
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    try {
      // Lấy dữ liệu từ API
      const ordersRes = await orderService.getAll();
  
      const paginatedOrders = ordersRes.slice(startIndex, endIndex); // Lấy theo trang

      console.log("Orders: ", paginatedOrders);
  
      // Tính tổng số trang
      const totalPages = Math.ceil(ordersRes.length / limit);
  
      // Render trang với dữ liệu sách và thông tin phân trang
      res.render("pages/manageOrders", {
        orders: paginatedOrders,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (err) {
      console.error("Lỗi khi lấy danh sách don hang:", err);
      res.status(500).send("Lỗi khi lấy danh sách don hang");
    }
  };

const editOrder = async (req, res) => {
    const orderID = req.query.id;

    console.log("Order ID: ", orderID);

    try {
        const order = await orderService.getDetailOrder(orderID);
        res.render("pages/editOrder", { order });
    } catch (error) {
        console.error("Error while getting order detail: ", error);
        res.status(500).send("An error occurred while getting order detail.");
    }
}

const getOrderDetail = async (req, res) => {
  const orderID = req.params.orderId;
  try {
    const order = await orderService.getDetailOrder(orderID);
    return res.status(200).json(order);
  } catch (error) {
    throw error;
  }
};

const getAllOrder = async (req, res) => {
    try {
        const [orders] = await db.execute(`SELECT * FROM customerorder`);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error while getting all orders: ", error);
        res.status(500).send("An error occurred while getting all orders.");
    }
}

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

const updateOrder = async (req, res) => {
    const { order_id, status } = req.body;

    console.log("Update order: ", order_id, status);

    try {
      const [result] = await db.execute(
        `call updateOrder(?,?)`,
        [order_id, status]
      );
  
      if (result.affectedRows) {
        return res.status(200).json({ message: "Order updated successfully." });
      }
  
      return res.status(404).json({ error: "Order not found." });
    } catch (error) {
      console.error("Error while updating order: ", error);
      res.status(500).send("An error occurred while updating order.");
    }
  };

module.exports = {
  getAllOrder,
  showOders,
  editOrder,
  getOrderDetail,
  getOrdersAboveThreshold,
  updateOrder, 
};
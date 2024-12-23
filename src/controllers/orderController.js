const { orderService } = require("../services");


const showOrderPage = async (req, res) => {
    const customer_id = req.session.user.customer_id;
    const totalPages = await orderService.totalPages(customer_id);

    let page = req.query.page;
    if (page && page <= 0) page = 1;
    else if (page && page > totalPages) page = totalPages;
    else if (!page) page = 1;

    const orders = await orderService.getOrderByCustomer(customer_id, page, req.query.start_date, req.query.end_date);
    if (orders.length === 0) res.locals.notFound = true;
    else {
        res.locals.orders = orders;
        res.locals.totalPages = Number(totalPages);
        res.locals.currentPage = Number(page);
        res.locals.start_date = req.query.start_date;
        res.locals.end_date = req.query.end_date;
    }

    res.locals.orderPage = true;
    return res.render("pages/order");
};

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
};

const addOrder = async (req, res) => {
    const customer_id = req.session.user.customer_id;
    const cart = req.session.cart;
    
    await orderService.checkout(customer_id, cart, req.body.address);

    req.session.cart = {
        products: [],
        totalPrice: null,
        orderDiscount: null,
        levelDiscount: null,
        shipfee: null,
    };

    return res.redirect('/order');
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


module.exports = {
  showOrderPage,
  addOrder,
  getAllOrder,
  showOders,
  editOrder,
  getOrderDetail,
  getOrdersAboveThreshold,
};

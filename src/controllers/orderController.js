const { orderService } = require("../services");
const db = require("../config/db");


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

const searchOrders = async (req, res) => {
  const searchQuery = req.query.q || ""; // Lấy từ khóa tìm kiếm từ query params
  const page = parseInt(req.query.page) || 1; // Lấy trang hiện tại từ query params
  const limit = 20; // Số đơn hàng mỗi trang
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const sort = req.query.sort || "order_id"; // Lấy tiêu chí sắp xếp từ query params

  console.log("Từ khóa tìm kiếm:", searchQuery);
  console.log("Tiêu chí sắp xếp:", sort);

  try {
    // Lấy dữ liệu đơn hàng từ cơ sở dữ liệu (giả định)
    const response = await db.execute(
      `SELECT * 
FROM orders o LEFT JOIN customer c ON o.customer_id = c.customer_id 
WHERE 
          (? = '' OR MATCH(o.order_id) AGAINST(? IN NATURAL LANGUAGE MODE) OR
          MATCH(c.name) AGAINST(? IN NATURAL LANGUAGE MODE) OR
          MATCH(o.address) AGAINST(? IN NATURAL LANGUAGE MODE) OR
          MATCH(o.status) AGAINST(? IN NATURAL LANGUAGE MODE))
        `,
      [searchQuery, searchQuery, searchQuery, searchQuery, searchQuery]
    );
    let orders = response[0];

    console.log("Danh sách đơn hàng tìm kiếm được:", orders);

    // Sắp xếp đơn hàng theo tiêu chí
    orders = orders.sort((a, b) => {
      if (sort === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sort === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sort === 'price') {
        return a.original_price - b.original_price;
      } else {
        return a.order_id - b.order_id;
      }
    });

    // Lấy các đơn hàng cho trang hiện tại
    const paginatedOrders = orders.slice(startIndex, endIndex);

    console.log("Orders: ", paginatedOrders);

    // Tính tổng số trang
    const totalPages = Math.ceil(orders.length / limit);

    // Render trang với danh sách đơn hàng và thông tin phân trang
    res.render("pages/manageOrders", {
      orders: paginatedOrders,
      currentPage: page,
      totalPages: totalPages,
      sort: sort,
      searchQuery: searchQuery,
    });
  } catch (err) {
    console.error("Lỗi khi tìm kiếm đơn hàng:", err);
    res.status(500).send("Lỗi khi tìm kiếm đơn hàng");
  }
};

const showOders = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the current page from query params
  const limit = 20; // Number of orders per page
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const sort = req.query.sort || 'order_id'; // Get the sort criteria from query params, default to 'order_id'
  const searchQuery = req.query.q || ''; // Get the search query from query params

  try {
    // Fetch orders from the service
    const ordersRes = await orderService.getAll();

    // Sort orders based on the specified criteria
    ordersRes.sort((a, b) => {
      if (sort === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sort === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sort === 'price') {
        return a.original_price - b.original_price;
      } else {
        return a.order_id - b.order_id;
      }
    });

    // Get the orders for the current page
    const paginatedOrders = ordersRes.slice(startIndex, endIndex);

    console.log("Orders: ", paginatedOrders);

    // Calculate total pages
    const totalPages = Math.ceil(ordersRes.length / limit);

    // Render the page with the orders and pagination info
    res.render("pages/manageOrders", {
      orders: paginatedOrders,
      currentPage: page,
      totalPages: totalPages,
      sort: sort,
      searchQuery: searchQuery,
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Error fetching orders");
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
  showOrderPage,
  addOrder,
  getAllOrder,
  showOders,
  searchOrders,
  editOrder,
  getOrderDetail,
  getOrdersAboveThreshold,
  updateOrder, 
};

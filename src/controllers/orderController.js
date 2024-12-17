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

const addOrder = async (req, res) => {
    const customer_id = req.session.user.customer_id;
    const cart = req.session.cart;
    const orderID = await orderService.createOrder(customer_id, cart, req.body.address);
    for (const product of cart.products) {
        await orderService.addProductToOrder(orderID, product.book_type, product.isbn, product.issn, product.quantity);
        if(product.discount_id) {
            await orderService.addDiscountToOrder(orderID, product.discount_id);
        }
    }
    if(cart.discount.discount_id)
    await orderService.addDiscountToOrder(orderID, cart.discount.discount_id);

    req.session.cart = {
        products: [],
        totalPrice: null,
        orderDiscount: null,
        levelDiscount: null,
        shipfee: null,
    };

    return res.redirect('/order');
};

module.exports = {
    showOrderPage,
    addOrder,
};

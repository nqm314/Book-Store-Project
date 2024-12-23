const { cartService } = require("../services");

const showCartPage = async (req, res) => {
    const products = req.session.cart?.products;
    let totalPrice = 0;
    if (products && products.length !== 0) {
        for (const product of products) {
            if (!product.discount) {
                const productDiscount = await cartService.getDiscountForBook(
                    product.bookID
                );
                if (productDiscount) {
                    product.discount = productDiscount;
                } else {
                    product.discount = {
                        discount_id: null,
                        percentage: 0,
                    };
                }
            }
            product.totalTemp = Math.ceil(
                (product.price *
                    product.quantity *
                    (100 - product.discount.percentage)) /
                    100
            );
            totalPrice += product.totalTemp;
        }
        req.session.cart.totalPrice = totalPrice;

        const orderDiscount = await cartService.getDiscountForOrder(totalPrice);
        const levelDiscount = await cartService.getDiscountForLevel(
            req.session.user.customer_id
        );

        req.session.cart.discount = {
            discount_id: null,
            percentage: 0,
        };

        if (
            orderDiscount &&
            orderDiscount.percentage > req.session.cart.discount.percentage
        ) {
            req.session.cart.discount = orderDiscount;
        }
        if (
            levelDiscount &&
            levelDiscount.percentage > req.session.cart.discount.percentage
        ) {
            req.session.cart.discount = levelDiscount;
        }

        if (!req.session.cart.shipfee)
            req.session.cart.shipfee =
                Math.floor(Math.random() * (45 - 10 + 1) + 10) * 1000;

        res.locals.products = products;
        res.locals.totalPrice = totalPrice;
        res.locals.discount = req.session.cart.discount;
        res.locals.shipfee = req.session.cart.shipfee;
    }
    res.locals.cartPage = true;
    return res.render("pages/cart");
};

const addToCart = async (req, res) => {
    try {
        const isExistBook = req.session.cart.products.filter(
            (product) =>
                (product.bookID ===
                    req.body.bookID &&
                    product.issn === req.body.issn &&
                    product.isbn === req.body.isbn)
        );
        if(isExistBook.length === 0)
            req.session.cart.products.push(req.body);
        else 
            isExistBook[0].quantity++;
        res.status(200).json();
    } catch (error) {
        res.status(500).json();
    }
};

const removeProduct = async (req, res) => {
    const bookID = req.query.bookID;
    req.session.cart.products = req.session.cart.products.filter(
        (product) => product.bookID != bookID
    );

    return res.redirect("/cart");
};

const changeQuantity = async (req, res) => {
    const { versionID, quantity } = req.params;
    const products = req.session.cart.products;

    const book = products.filter((product) => (product.issn === versionID || product.isbn === versionID))
    console.log(book);
    book[0].quantity = quantity;
    return res.redirect('/cart')
}

const createCart = async (req, res) => {
    const products = [];
    products.push({
        bookID: "CO001",
        name: "Doraemon",
        book_type: "Truyện tranh",
        issn: "22230688",
        isbn: null,
        price: 163000,
        quantity: 2,
    });
    products.push({
        bookID: "NO088",
        name: "Chiếc Lông Vũ Tử Thần",
        book_type: "Tiểu thuyết",
        issn: null,
        isbn: "9786417242875",
        price: 459000,
        quantity: 1,
    });
    products.push({
        bookID: "CO007",
        name: "Thần Đồng Đất Việt",
        book_type: "Truyện tranh",
        issn: "35712426",
        isbn: null,
        price: 339000,
        quantity: 2,
    });

    req.session.cart = {
        products: products,
        totalPrice: null,
        orderDiscount: null,
        levelDiscount: null,
        shipfee: null,
    };

    return res.redirect("/cart");
};

module.exports = {
    showCartPage,
    removeProduct,
    createCart,
    addToCart,
    changeQuantity,
};

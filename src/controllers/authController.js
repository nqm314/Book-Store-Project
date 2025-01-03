const brycpt = require("bcryptjs");
const { customerService, staffService } = require("../services");

const showLoginCustomer = async (req, res) => {
    return res.render("pages/login");
};

const showLoginStaff = async (req, res) => {
    return res.render("pages/adminLogin");
}

const loginCustomer = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await customerService.findCustomerByUsername(username);
    if (user?.password && brycpt.compareSync(password, user.password)) {
        req.session.loggedin = true;
        req.session.user = {
            customer_id: user.customer_id,
            username: username,
            role: "CUSTOMER",
        };
        req.session.cart = {
            products: [],
            totalPrice: null,
            orderDiscount: null,
            levelDiscount: null,
            shipfee: null,
        };
        return res.redirect("/");
    }
    return res.render("pages/login", {
        username: username,
        password: password,
        loginFailed: true,
    });
};

const loginStaff = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await staffService.findStaffByUsername(username);
    if (user?.password && brycpt.compareSync(password, user.password)) {
        req.session.loggedin = true;
        req.session.user = {
            staff_id: user.staff_id,
            username: username,
            role: "STAFF",
        };
        return res.redirect("/admin");
    }
    return res.render("pages/adminLogin", {
        username: username,
        password: password,
        loginFailed: true,
    });
};

const logout = async (req, res) => {
    const role = req.session.user.role;
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
    });
    if (role === "STAFF") {
        return res.redirect("/admin/login");
    } else {
        return res.redirect("/login");
    }
};


const showInfo = async (req, res) => {
    const customerID = req.session.user.customer_id;
    const customer = await customerService.findCustomerById(customerID);
    res.locals.customer = customer;
    return res.render('pages/info')
}

const showInfoAdmin = async (req, res) => {
    const staffUsername = req.session.user.username;
    const staff = await staffService.findStaffByUsername(staffUsername);
    res.locals.staff = staff;
    return res.render('pages/infoAdmin')
}

module.exports = {
    showLoginCustomer,
    showLoginStaff,
    loginCustomer,
    loginStaff,
    logout,
    showInfoAdmin,
    showInfo,
};

const { customerService, staffService } = require("../services");

const isCustomer = async (req, res, next) => {
    if (req.session.loggedin) {
        if (req.session.user.role === "CUSTOMER") {
            const user = await customerService.findCustomerByUsername(
                req.session.user.username
            );
            res.locals.name = user.name;
            return next();
        } else {
            return res.redirect("/404");
        }
    } else {
        return res.redirect("/login");
    }
};

const isStaff = async (req, res, next) => {
    if (req.session.loggedin) {
        if (req.session.user.role === "STAFF") {
            const user = await staffService.findStaffByUsername(
                req.session.user.username
            );
            res.locals.name = `${user.lastname} ${user.firstname}`;
            next();
        } else {
            res.redirect("/404");
        }
    } else {
        res.redirect("/admin/login");
    }
};

const isAuthCustomer = async (req, res, next) => {
    if (req.session.loggedin) {
        res.redirect('/')
    } else {
        next()
    }
};

const isAuthAdmin = async (req, res, next) => {
    if (req.session.loggedin) {
        res.redirect('/admin')
    } else {
        next()
    }
};

module.exports = {
    isCustomer,
    isStaff,
    isAuthCustomer,
    isAuthAdmin,
};

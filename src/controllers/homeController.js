const { bookService, customerService } = require('../services');

const showHomePage = async (req, res) => {
    if (req.session.loggedin) {
        if (req.session.user.role === "CUSTOMER") {
            const user = await customerService.findCustomerByUsername(
                req.session.user.username
            );
            res.locals.name = user.name;
        } else {
            return res.redirect("/404");
        }
    }

    res.locals.comic =  await bookService.getComicHot();
    res.locals.magazine =  await bookService.getMagazineHot();
    res.locals.novel =  await bookService.getNovelHot();
    res.locals.reference =  await bookService.getReferenceHot();

    return res.render('pages/home')
}


module.exports = {
    showHomePage,
}
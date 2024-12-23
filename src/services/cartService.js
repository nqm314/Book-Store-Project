const db = require("../config/db");

const getDiscountForBook = async (bookID) => {
    const result = await db.execute('CALL getDiscountForBook(?)', [bookID]);
    return result[0][0][0];
};

const getDiscountForOrder = async (totalOrder) => {
    const result = await db.execute('CALL getDiscountForOrder(?)', [totalOrder])
    return result[0][0][0];

};

const getDiscountForLevel = async (customerID ) => {
    const result = await db.execute('CALL getDiscountForLevel(?)', [customerID])
    return result[0][0][0];
};

module.exports = {
    getDiscountForBook,
    getDiscountForOrder,
    getDiscountForLevel,
}

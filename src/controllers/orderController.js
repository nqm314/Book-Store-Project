const { orderService } = require('../services');

const getAllOrder = async (req, res) => {
    try {
        const orders = await orderService.getAll();
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

module.exports = {
    getAllOrder,
}
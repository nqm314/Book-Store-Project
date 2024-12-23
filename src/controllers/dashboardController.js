const { dashboardService } = require('../services');

const getDashboardData = async (req, res) => {
    try {
        const numOfCustomers = await dashboardService.getNumOfCustomers();
        const numOfOrders = await dashboardService.getNumOfOrders();
        const numOfBooks = await dashboardService.getNumOfBooks();
        return res.status(200).json({
            numOfCustomers,
            numOfOrders,
            numOfBooks
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDashboardData
};
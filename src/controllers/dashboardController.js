const { dashboardService } = require('../services');

const getDashboardData = async (req, res) => {
    try {
        const numOfCustomers = await dashboardService.getNumOfCustomers();
        const totalRevenue = await dashboardService.getTotalRevenue();
        const numOfBooks = await dashboardService.getNumOfBooks();
        return res.status(200).json({
            numOfCustomers,
            totalRevenue,
            numOfBooks
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDashboardData
};
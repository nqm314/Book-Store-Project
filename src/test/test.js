const db = require('../config/db');

(async () => {
    try {
        // Kiểm tra kết nối trước khi chạy truy vấn
        await db.execute('SELECT 1'); // Query đơn giản để kiểm tra kết nối
        console.log('Database connection is successful.');

        const [rows] = await db.execute('SELECT COUNT(*) AS total_customers FROM customer');
        console.log('Query result:', rows[0].total_customers);
    } catch (error) {
        console.error('Database connection/query error:', error.message);
    }
})();
const express = require('express');
const cors = require('cors'); 
const connection = require('./db');
const app = express();
const PORT = 3000;


app.use(cors());


connection.connect((err) => {
    if (err) {
      console.error('Lỗi khi kết nối MySQL:', err);
      return;
    }
    console.log('Đã kết nối MySQL thành công');
});


app.get('/books', (req, res) => {
    const query = 'SELECT * FROM book';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy dữ liệu sách:', err);
            res.status(500).json({ error: 'Lỗi server' });
            return;
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

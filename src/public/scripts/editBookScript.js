// Script for editBook.html
const responseModal = document.getElementById('response-modal');
const responseMessage = document.getElementById('response-message');
const okBtn = document.getElementById('ok-btn');
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id")
console.log("editBookScript nha ", bookId);

require('dotenv').config()
const baseUrl = `http://localhost:${process.env.PORT || 5000}`;

function fetchBookDetails() {
    console.log("Đang fetch thông tin cho Book ID:", bookId);
    fetch(`${baseUrl}/api/book/${bookId}`)
    .then((response) => {
        console.log("Response nhận được:", response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log("Dữ liệu JSON nhận được:", data);
        const book = data[0];
        if (book) {
            console.log("Thông tin sách: ", book);
            // Map đúng với tên trường từ API
            document.getElementById('book-id').value = book.book_id || "";
            document.getElementById('book-title').value = book.title || "";
            document.getElementById('book-description').value = book.description || "";
            document.getElementById('book-chapters').value = book.volume_number || "";
            document.getElementById('book-type').value = book.bookType || ""; // Chú ý: bookType không phải book_type
            document.getElementById('publisher').value = book.PublisherName || ""; // Chú ý: PublisherName
            document.getElementById('series').value = book.SeriesName || ""; // Chú ý: SeriesName
        } else {
            alert("Không tìm thấy thông tin sách");
        }
    })
    .catch((error) => {
        console.error("Lỗi khi lấy thông tin sách: ", error);
        alert("Có lỗi xảy ra khi tải thông tin sách.");
    });
}

document.getElementById('edit-book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedBook = {
        book_id: document.getElementById("book-id").value,
        title: document.getElementById("book-title").value || null,
        description: document.getElementById("book-description").value || null,
        volume_number: document.getElementById("book-chapters").value || null,
        bookType: document.getElementById("book-type").value || null, // Chú ý: bookType
        PublisherName: document.getElementById("publisher").value || null, // Chú ý: PublisherName
        SeriesName: document.getElementById("series").value || null, // Chú ý: SeriesName
    };

    console.log(updatedBook);

    fetch(`${baseUrl}/api/book/${bookId}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(updatedBook),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message || "Đã xảy ra lỗi không xác định!");
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Response data:", data);
        responseMessage.innerHTML = "Cập nhật sách thành công!";
        responseModal.style.display = 'block';
        
        okBtn.onclick = function() {
            window.location.href = '/manageBooks';
        };
    })
    .catch((error) => {
        console.error("Lỗi khi cập nhật sách: ", error);
        responseMessage.innerHTML = error.message || "Có lỗi xảy ra khi cập nhật sách";
        responseModal.style.display = 'block';
        
        okBtn.onclick = function() {
            responseModal.style.display = 'none';
        };
    });
});

fetchBookDetails();
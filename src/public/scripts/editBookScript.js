// Script for editBook.html
const responseModal = document.getElementById('response-modal');
const responseMessage = document.getElementById('response-message');
const okBtn = document.getElementById('ok-btn');
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id")
console.log("editBookScript nha ", bookId);

function fetchBookDetails() {
    console.log("Đang fetch thông tin cho Book ID:", bookId); // Log thêm
    fetch(`http://localhost:3000/api/book/${bookId}`)
    .then((response) => {
        console.log("Response nhận được:", response);
        return response.json();
    })
    .then((data) => {
        console.log("Dữ liệu JSON nhận được:", data);
        const book = data[0];
        if (book) {
            console.log("Thong tin sach: ", book);
            // document.getElementById("book-id").value = book.bookId || "";
            // document.getElementById("book-id").innerHTML = data.bookId || "";
            document.getElementById('book-title').value = book.Title || "";
            document.getElementById('book-description').value = book.Description || "";
            // document.getElementById('link-book-img').value = book.Image || "";
            document.getElementById('book-chapters').value = book.VolumeNumber || "";         
            document.getElementById('book-type').value = book.BookType || "";
            document.getElementById('publisher').value = book.PublisherName || "";
            document.getElementById('series').value = book.SeriesName || "";
        }
        else {
            alert("Khong tim thay thong tin sach")
        }
    })
    .catch ((error) => {
        console.error("Loi khi lay thong tin sach: ", error);
        alert("Co loi xay ra khi tai thong tin sach.");
    });
}

document.getElementById('edit-book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedBook = {
        Title: document.getElementById("book-title").value || null,
        // Image: document.getElementById("link-book-img").value,
        Description: document.getElementById("book-description").value || null,
        VolumeNumber: document.getElementById("book-chapters").value || null,
        Type: document.getElementById("book-type").value || null,
        PubName: document.getElementById("publisher").value || null,
        SeriesName: document.getElementById("series").value || null,
    }

    fetch(`http://localhost:3000/api/book/${bookId}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(updatedBook),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message || "Đã xảy ra lỗi ko xác định!");
            })
        }
        return response.json();
    })
    .then(data => {
        console.log("Response data:", data);
        console.log("Sach da duoc cap nhat thanh cong!!");
        // alert('Sach da duoc cap nhat thanh cong!');
        responseMessage.innerHTML = "Cập nhật sách thành công!";
        responseModal.style.display = 'block';
        okBtn.addEventListener('click', function() {
            window.location.href = '/admin/manage-books';
        });
    })
    .catch((error) => {
        console.error("Loi khi cap nhat sach: ", error);
        // alert("Co loi khi cap nhat sach.");
        responseMessage.innerHTML = `${error.message}`;
        responseModal.style.display = 'block';
        okBtn.addEventListener('click', function() {
            responseModal.style.display = 'none'; // Ẩn modal khi nhấn Ok
        });
    })
})

fetchBookDetails();
let announceError = document.getElementById('announce-error')
let bookModal = document.getElementById('book-modal')
const seriesContainer = document.getElementById('series-container')
const responseModal = document.getElementById('response-modal');
const responseMessage = document.getElementById('response-message');
const okBtn = document.getElementById('ok-btn');
const form = document.getElementById('form-add-edition-content');


if (typeof error !== 'undefined' && error) {
    announceError.innerHTML = error;
}

// Lấy BookID từ URL
const urlParams = new URLSearchParams(window.location.search);
const bookID = urlParams.get('bookID');

// Hiển thị BookID trong input readonly
if (bookID) {
    document.getElementById('bookID').value = bookID;
}

function closeModal() {
    window.location.href = '/admin/manage-books';
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = {
        ISBN: document.getElementById("ISBN").value || null,
        PubDate: document.getElementById("pub-date").value || null,
        PrnRunSz: document.getElementById("PrnRunSz").value || null,
        Pages: document.getElementById("pages-num").value || null,
        Format: document.getElementById("Format").value || null,
        Price: document.getElementById("price").value || null,
        BookID: document.getElementById('bookID').value || null,
        Amount: document.getElementById('amount').value || null,
    };

    // Gửi dữ liệu bằng fetch API
    fetch('/api/edition/store', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
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
        console.log("data: ", data);
        if (data.message === 'Thêm ấn bản thành công!') {
            // Thông báo thành công
            responseMessage.innerHTML = "Thêm ấn bản thành công!";
            responseModal.style.display = 'block';
            okBtn.addEventListener('click', function() {
                window.location.href = '/admin/manage-books';
            });
        } 
    })
    .catch(error => {
        console.error('Error:', error.message);

        // Hiển thị thông báo lỗi từ SQL hoặc lỗi chung
        responseMessage.innerHTML = `Lỗi: ${error.message}`;
        responseModal.style.display = 'block';
        okBtn.addEventListener('click', function() {
            responseModal.style.display = 'none'; // Ẩn modal khi nhấn Ok
        });
    });
});



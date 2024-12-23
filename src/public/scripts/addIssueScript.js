let announceError = document.getElementById('announce-error');
let responseModal = document.getElementById('response-modal');
let responseMessage = document.getElementById('response-message');
let okBtn = document.getElementById('ok-btn');
let form = document.getElementById('form-add-issue-content');

// Lấy BookID từ URL và gán vào input readonly
const urlParams = new URLSearchParams(window.location.search);
const bookID = urlParams.get('bookID');
if (bookID) {
    document.getElementById('bookID').value = bookID;
}

// Hàm đóng modal và quay về trang quản lý sách
function closeModal() {
    const searchQuery = '';
    const sortType = 'book_id';
    // Redirect to the manageBooks page with current search and sort parameters
    const queryParams = `q=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(sortType)}`;
    window.location.href = `/manageBooks?${queryParams}`;
}

// Xử lý submit form bằng fetch API
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Thu thập dữ liệu từ form
    const formData = {
        ISSN: document.getElementById("ISSN").value || null,
        IssueNumber: document.getElementById("issue-number").value || null,
        PubDate: document.getElementById("pub-date").value || null,
        Pages: document.getElementById("pages-num").value || null,
        SpecialIssue: document.getElementById("special-issue").checked ? '1' : '0',
        Volume: document.getElementById("volume").value || null,
        Price: document.getElementById("price").value || null,
        Amount: document.getElementById('amount').value || null,
        BookID: document.getElementById('bookID').value || null,
    };

    // Gửi dữ liệu bằng fetch API
    fetch('/manageBooks/issue/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message || 'Có lỗi xảy ra trong quá trình xử lý!');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Thêm số phát hành thành công!') {
            // Hiển thị thông báo thành công
            responseMessage.textContent = '🎉 Thêm số phát hành thành công!';
            responseModal.style.display = 'block';

            okBtn.onclick = function() {
                window.location.href = '/manageBooks';
            };
        }
    })
    .catch(error => {
        console.error('Error:', error.message);

        // Display error message in the modal
        responseMessage.innerHTML = `❌ Lỗi: ${error.message}`;
        responseModal.style.display = 'block';
        
        okBtn.onclick = () => {
            responseModal.style.display = 'none';
        };
    });
});
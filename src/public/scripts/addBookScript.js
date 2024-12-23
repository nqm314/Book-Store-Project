let announceError = document.getElementById('announce-error')
let bookModal = document.getElementById('book-modal')
const bookType = document.getElementById('book-type')
const seriesContainer = document.getElementById('series-container')
const responseModal = document.getElementById('response-modal');
const responseMessage = document.getElementById('response-message');
const okBtn = document.getElementById('ok-btn');
const form = document.getElementById('form-add-book-content');


if (typeof error !== 'undefined' && error) {
    announceError.innerHTML = error;
}

// Function to get query parameters from the form
function getQueryParams() {
    const searchQuery = '';
    const sortType = 'book_id';
    return `q=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(sortType)}`;
}

function closeModal() {
    // Redirect to the manageBooks page with current search and sort parameters
    const queryParams = getQueryParams();
    window.location.href = `/manageBooks?${queryParams}`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        Title: document.getElementById("book-title").value || null,
        Description: document.getElementById("book-description").value || null,
        VolumeNumber: document.getElementById("book-chapters").value || null,
        Type: document.getElementById("book-type").value || null,
        PubName: document.getElementById("publisher").value || null,
        SeriesName: document.getElementById("series").value || null,
    };

    // Gửi dữ liệu qua fetch API
    fetch('/manageBooks/create/store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message || 'Đã xảy ra lỗi không xác định!');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.message === 'Thêm sách thành công!' && data.BookID) {
                // Thành công: điều hướng đến trang thêm ấn bản với BookID
                const bookID = data.BookID;
                responseMessage.innerHTML = "🎉 Thêm sách thành công!";
                responseModal.style.display = 'block';

                // Đảm bảo chỉ có một sự kiện được đăng ký
                okBtn.onclick = function () {
                    if (formData.Type == 'Tiểu thuyết' || formData.Type == 'Sách tham khảo') {
                        window.location.href = `/admin/add-edition?bookID=${bookID}`;
                    }
                    else {
                        window.location.href = `/admin/add-issue?bookID=${bookID}`;
                    }
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
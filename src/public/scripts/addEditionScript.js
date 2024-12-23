// DOM Elements
const announceError = document.getElementById('announce-error'); // Error announcement container
const responseModal = document.getElementById('response-modal'); // Modal to show response
const responseMessage = document.getElementById('response-message'); // Message in response modal
const okBtn = document.getElementById('ok-btn'); // OK button in modal
const form = document.getElementById('form-add-edition-content'); // Main form element

// URL Parameters
const urlParams = new URLSearchParams(window.location.search);
const bookID = urlParams.get('bookID');

// Set BookID if exists
if (bookID) {
    const bookIDInput = document.getElementById('bookID');
    if (bookIDInput) {
        bookIDInput.value = bookID;
    }
}

function closeModal() {
    const searchQuery = '';
    const sortType = 'book_id';
    // Redirect to the manageBooks page with current search and sort parameters
    const queryParams = `q=${encodeURIComponent(searchQuery)}&sort=${encodeURIComponent(sortType)}`;
    window.location.href = `/manageBooks?${queryParams}`;
}

// Form submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
        ISBN: document.getElementById("ISBN")?.value || null,
        PubDate: document.getElementById("pub-date")?.value || null,
        PrnRunSz: document.getElementById("PrnRunSz")?.value || null,
        Pages: document.getElementById("pages-num")?.value || null,
        Format: document.getElementById("Format")?.value || null,
        Price: document.getElementById("price")?.value || null,
        BookID: bookID || document.getElementById('bookID')?.value || null,
        Amount: document.getElementById('amount')?.value || null,
    };

    // Send request using Fetch API
    fetch('/manageBooks/edition/store', {
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
        console.log("Response Data: ", data);

        // Check for success message
        if (data.message === 'Thêm ấn bản thành công!') {
            responseMessage.innerHTML = "🎉 Thêm ấn bản thành công!";
            responseModal.style.display = 'block';
            okBtn.onclick = () => closeModal();
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
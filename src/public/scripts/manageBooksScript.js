// Script for manageBookd.html
let currentPage = 1;

const search = document.getElementById('search-area');
const form = document.getElementById('form');
const bookList = document.getElementById('book-list');

//Delete
const confirmationDelBox = document.getElementById("confirmation-delete-box");
const confirmationEditBox = document.getElementById("confirmation-edit-box");
const confirmDelete = document.getElementById("confirm-delete");
const cancelDelete = document.getElementById("cancel-delete");
let bookToDeleteId = null; // Biến lưu trữ ID sách cần xóa
let bookTitle = null;

//Edit 
const confirmEdit = document.getElementById("confirm-edit");
const cancleEdit = document.getElementById("cancel-edit");
let bookToEdit = null; // Biến lưu trữ ID sách cần edit

// Filter 
const filterButton = document.getElementById('filter-button');
const resetButton = document.getElementById('reset-button');

const responseModal = document.getElementById('response-modal');
const responseMessage = document.getElementById('response-message');
const okBtn = document.getElementById('ok-btn');

fetchBooks('http://localhost:3000/api/book/get-all');

function fetchBooks(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayBook(data); 
        })
        .catch(error => console.error('Lỗi khi tải sách: ', error));
}

// fetchBooks();

// async function fetchBooks(page = 1) {
//     try {
//         const response = await fetch(`${/api/book-paginated}?page=${page}&limit=20`)
//         const data = await response.json();

//         displayBook(data);

//         currentPage = data.currentPage;
//         document.getElementById('currentPage').innerText = `Page ${currentPage}`;
//     } catch(error) {
//         console.error("Error fetching books: ", error);
//     }
// }

document.getElementById("prevPage").addEventListener('click', () => {
    if (currentPage > 1) {
        fetchBooks(currentPage - 1);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    fetchBooks(currentPage + 1);
});

function displayBook(data) {
    bookList.innerHTML = ''; // Xóa sách hiện tại trước khi hiển thị sách mới

    if (data.length === 0) {
        bookList.innerHTML = '<p>Không tìm thấy sách nào.</p>';
        return;
    }
    
    data.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        // const image = document.createElement('img');
        // image.setAttribute('class', 'poster');
        // image.src = `${book.Image}`;

        const center = document.createElement('center');
        const title = document.createElement('p')
        const type = document.createElement('p');
        // const identifier = document.createElement('p');
        title.innerHTML = `<strong>Tên sách</strong>: ${book.Title}`;
        type.innerHTML = `<strong>Thể loại</strong>: ${book.Type}`;
        // identifier.innerHTML = `<strong>Mã nhận dạng</strong>: ${book.Identifier}`;

        // Icon del
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-book-btn");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Xóa';

        deleteButton.onclick = () => {
            bookToDeleteId = book.BookID; // Lưu ID sách
            bookTitle = book.Title;
            confirmationDelBox.style.display = "flex"; // Hiển thị khung xác nhận
        };

        // Edit button 
        const editButton = document.createElement("button");
        editButton.classList.add("edit-book-btn");
        editButton.innerHTML = '<i class="fas fa-trash-alt"></i> Sửa';

        editButton.onclick = () => {
            bookToEdit = book.BookID; // Lưu ID sách
            bookTitle = book.Title;
            confirmationEditBox.style.display = "flex"; // Hiển thị khung xác nhận
        };

        // center.appendChild(image);
        bookDiv.appendChild(center);
        bookDiv.appendChild(title);
        bookDiv.appendChild(type);
        // bookDiv.appendChild(identifier);
        bookDiv.appendChild(editButton);
        bookDiv.appendChild(deleteButton); // Thêm nút xóa vào bookDiv
        div_column.appendChild(bookDiv);
        div_row.appendChild(div_column);

        bookList.appendChild(div_row);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    bookList.innerHTML = '';
    const query = search.value.toLowerCase();
    if (query) {
        fetch(`http://localhost:3000/api/book/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => displayBook(data))
        .catch(error => console.error("Lỗi khi tìm kiếm sách: ", error)); 
    }
    else {
        fetchBooks('http://localhost:3000/api/book/get-all');
    }
    search.value = ""; 
});

function deleteBook(bookId, bookTitle) {
    fetch(`http://localhost:3000/api/book/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi xóa sách.");
        }
        return response.json();
      })
      .then(() => {
        // Hiển thị modal thông báo
        responseMessage.innerHTML = `Xóa sách thành công!`;
        responseModal.style.display = "block";
  
        // Đóng modal khi nhấn nút OK
        okBtn.addEventListener("click", function () {
          responseModal.style.display = "none";
        });
        // Cập nhật giao diện sau khi xóa thành công
        fetchBooks("http://localhost:3000/api/book/get-all");
  
      })
      .catch((error) => {
        console.error("Đã có lỗi xảy ra:", error);
      });
};
  

function displayDetailBook(data) {
    bookList.innerHTML = ''; // Xóa sách hiện tại trước khi hiển thị sách mới

    if (data.length === 0) {
        responseMessage.innerHTML = `Không tìm thấy sách nào!`;
        responseModal.style.display = "block";
  
        // Đóng modal khi nhấn nút OK
        okBtn.addEventListener("click", function () {
          responseModal.style.display = "none";
        });
        return;
    }
    
    data.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        // const image = document.createElement('img');
        // image.setAttribute('class', 'poster');
        // image.src = `${book.Image}`;

        const center = document.createElement('center');
        const title = document.createElement('p')
        const type = document.createElement('p');
        const price = document.createElement('p');
        const rating = document.createElement('p');
        // const identifier = document.createElement('p');
        title.innerHTML = `<strong>Tên sách</strong>: ${book.Title}`;
        type.innerHTML = `<strong>Thể loại</strong>: ${book.Type}`;
        price.innerHTML = `<strong>Giá tiền</strong>: ${book.Price}`;
        rating.innerHTML = `<strong>Rating trung bình</strong>: ${book.AvgRating}`;
        // identifier.innerHTML = `<strong>Mã nhận dạng</strong>: ${book.Identifier}`;

        // Icon del
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-book-btn");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Xóa';

        deleteButton.onclick = () => {
            bookToDeleteId = book.BookID; // Lưu ID sách
            bookTitle = book.Title;
            confirmationDelBox.style.display = "flex"; // Hiển thị khung xác nhận
        };

        // Edit button 
        const editButton = document.createElement("button");
        editButton.classList.add("edit-book-btn");
        editButton.innerHTML = '<i class="fas fa-trash-alt"></i> Sửa';

        editButton.onclick = () => {
            bookToEdit = book.BookID; // Lưu ID sách
            bookTitle = book.Title;
            confirmationEditBox.style.display = "flex"; // Hiển thị khung xác nhận
        };

        // center.appendChild(image);
        bookDiv.appendChild(center);
        bookDiv.appendChild(title);
        bookDiv.appendChild(type);
        bookDiv.appendChild(price);
        bookDiv.appendChild(rating);
        // bookDiv.appendChild(identifier);
        bookDiv.appendChild(editButton);
        bookDiv.appendChild(deleteButton); // Thêm nút xóa vào bookDiv
        div_column.appendChild(bookDiv);
        div_row.appendChild(div_column);

        bookList.appendChild(div_row);
    });
}

filterButton.addEventListener('click', (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const priceRange = document.getElementById('priceRange').value;
    const rating = document.getElementById('rating').value;

    console.log("Type: ", type);
    console.log("Price Range: ", priceRange);
    console.log("Rating: ", rating);

    // Xây dựng URL cho API
    const url = `http://localhost:3000/api/filter-book?type=${type}&priceRange=${priceRange}&rating=${rating}`;
    console.log("Requesting API: ", url);

    // Gửi yêu cầu API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(books => {
            console.log("Books data: ", books); // Ghi log dữ liệu
            displayDetailBook(books); // Hiển thị sách
        })
        .catch(error => {
            console.error("Lỗi khi gọi API: ", error);
            bookList.innerHTML = '<p>Không thể tải dữ liệu sách.</p>'; // Thông báo lỗi
        });
});
  

  // Confirm delete button click handler
confirmDelete.onclick = () => {
    if (bookToDeleteId) {
      console.log(bookToDeleteId);
      deleteBook(bookToDeleteId, bookTitle); // Gọi hàm xóa sách
      bookToDeleteId = null; // Reset ID sách
      bookTitle = null;
      confirmationDelBox.style.display = "none"; // Ẩn khung xác nhận
    }
};

cancelDelete.onclick = () => {
    bookToDeleteId = null; // Reset ID sách
    bookTitle = null;
    confirmationDelBox.style.display = "none"; // Ẩn khung xác nhận
};

confirmEdit.onclick = () => {
    // console.log(bookToEdit)
    // editBook(bookToEdit)
    window.location.href = `/admin/edit-book?id=${bookToEdit}`;
    // confirmationEditBox.style.display = "none"; // Ẩn khung xác nhận
};

cancleEdit.onclick = () => {
    bookToEdit = null;
    bookTitle = null; 
    confirmationEditBox.style.display = "none"; // Ẩn khung xác nhận
};


// resetButton.addEventListener('click', () => {
//     filterForm.reset();  // Đặt lại tất cả các trường trong form
// });


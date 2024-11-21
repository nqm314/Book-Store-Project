const search = document.getElementById("search-area");
const form = document.getElementById("form");
const bookList = document.getElementById("book-list");

//Delete
const confirmationBox = document.getElementById("confirmation-box");
const confirmDelete = document.getElementById("confirm-delete");
const cancelDelete = document.getElementById("cancel-delete");
let bookToDeleteId = null; // Biến lưu trữ ID sách cần xóa
let bookTitle = null;
fetchBooks("http://localhost:5000/api/book/get-all");

function fetchBooks(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayBook(data);
    })
    .catch((error) => console.error("Lỗi khi tải sách: ", error));
}

function displayBook(data) {
  bookList.innerHTML = ""; // Xóa sách hiện tại trước khi hiển thị sách mới

  data.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");

    const div_row = document.createElement("div");
    div_row.setAttribute("class", "row");

    const div_column = document.createElement("div");
    div_column.setAttribute("class", "column");

    const image = document.createElement("img");
    image.setAttribute("class", "poster");
    image.src = "../images/book.png";

    const center = document.createElement("center");
    const type = document.createElement("p");
    type.innerHTML = `<strong>Tên</strong>: ${book.title}`;

    // Icon del
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Xóa';

    deleteButton.onclick = () => {
      bookToDeleteId = book.book_id; // Lưu ID sách
      bookTitle = book.title;
      confirmationBox.style.display = "flex"; // Hiển thị khung xác nhận
    };

    center.appendChild(image);
    bookDiv.appendChild(center);
    bookDiv.appendChild(type);
    bookDiv.appendChild(deleteButton); // Thêm nút xóa vào bookDiv
    div_column.appendChild(bookDiv);
    div_row.appendChild(div_column);

    bookList.appendChild(div_row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  bookList.innerHTML = "";
  const query = search.value.toLowerCase();
  if (query) {
    fetch(
      `http://localhost:5000/api/book/search?q=${encodeURIComponent(query)}`
    )
      .then((response) => response.json())
      .then((data) => displayBook(data))
      .catch((error) => console.error("Lỗi khi tìm kiếm sách: ", error));
  } else {
    fetchBooks("http://localhost:5000/api/book/get-all");
  }
  search.value = "";
});

// Add book form
function openModal() {
  document.getElementById("bookModal").style.cssText =
    "display : flex; flex-direction : column;";
}

// Hàm đóng modal
function closeModal() {
  window.location.href = "/";
}

// Handle Series
function toggleSeriesInput() {
  const bookType = document.getElementById("book-type").value;
  const seriesContainer = document.getElementById("series-container");

  if (bookType === "Tiểu thuyết" || bookType === "Sách tham khảo") {
    seriesContainer.style.display = "block";
  } else {
    seriesContainer.style.display = "none";
    document.getElementById("series").value = "";
  }
}

function deleteBook(bookId, bookTitle) {
  fetch(`http://localhost:5000/api/book/${bookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      response.json();
    })
    .then(fetchBooks("http://localhost:5000/api/book/get-all"));
  alert(`Đã xóa thành công sách: ${bookTitle}`);
}

// Confirm delete button click handler
confirmDelete.onclick = () => {
  if (bookToDeleteId) {
    // console.log(bookToDeleteId);
    deleteBook(bookToDeleteId, bookTitle); // Gọi hàm xóa sách
    bookToDeleteId = null; // Reset ID sách
    bookTitle = null;
    confirmationBox.style.display = "none"; // Ẩn khung xác nhận
  }
};
cancelDelete.onclick = () => {
  bookToDeleteId = null; // Reset ID sách
  bookTitle = null;
  confirmationBox.style.display = "none"; // Ẩn khung xác nhận
};

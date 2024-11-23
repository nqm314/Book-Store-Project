const search = document.getElementById('search-area');
const form = document.getElementById('form');
const bookList = document.getElementById('book-list');

fetchBooks('http://localhost:3000/api/book/get-all');

function fetchBooks(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayBook(data); 
        })
        .catch(error => console.error('Lỗi khi tải sách: ', error));
}

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

        const image = document.createElement('img');
        image.setAttribute('class', 'poster');
        image.src = `${book.Image}`;

        const center = document.createElement('center');
        const type = document.createElement('p');
        type.innerHTML = `<strong>Thể loại</strong>: ${book.BookType}`;

        center.appendChild(image);
        bookDiv.appendChild(center);
        bookDiv.appendChild(type);
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

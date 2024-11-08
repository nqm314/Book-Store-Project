fetch('http://localhost:3000/books')
.then(response => response.json())
.then(data => {
    const booksList = document.getElementById('book-list');
    data.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-card');

        const div_row = document.createElement('div')
        div_row.setAttribute('class', 'row')

        const div_column = document.createElement('div')
        div_row.setAttribute('class', 'column')

        const image = document.createElement('img')
        image.setAttribute('class', 'poster')

        const center = document.createElement('center')

        // const title = document.createElement('h3')

        const type = document.createElement('p')

        // title.innerHTML = `${book.Title}`
        image.src = `${book.Image}`
        type.innerHTML = `<strong>Thể loại</strong>: ${book.BookType}`

        center.appendChild(image)
        bookDiv.appendChild(center)
        // bookDiv.appendChild(title)
        bookDiv.appendChild(type)
        div_column.appendChild(bookDiv)
        div_row.appendChild(div_column)

        booksList.appendChild(div_row);
    });
})
.catch(error => console.error('Lỗi khi tải sách: ', error));
// Script for adminDashboard.html 

const numCustomer = document.getElementById('num-customer');
const numRevenue = document.getElementById('num-revenue');
const numBook = document.getElementById('num-book');

function fetchDashboardData() {
    fetch('/api/dashboard')  // Assuming the API endpoint is defined correctly
    .then(response => response.json())
    .then(data => {
        // Update the innerHTML of the elements with the fetched data
        numCustomer.innerHTML = data.numOfCustomers;
        numRevenue.innerHTML = data.numOfOrders;
        numBook.innerHTML = data.numOfBooks;    
    })
    .catch(error => console.error('Error loading dashboard data: ', error));
}

function showTopCustomers() {
    fetch('/api/dashboard-top-customers')  // Assuming the API endpoint is defined correctly
    .then(response => response.json())
    .then(data => {
        // Update the innerHTML of the elements with the fetched data
        const tableBody = document.getElementById('top-customers-table');
        console.log(data);
        data.forEach((customer, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${customer.customer_id}</td>
                <td>${customer.name}</td>
                <td>${customer.sex}</td>
                <td>${customer.level}</td>
                <td>${customer.order_sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} VND</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading dashboard data: ', error));
}


// Fetch and display the dashboard data on page load
fetchDashboardData();
showTopCustomers();
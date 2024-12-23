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

// Fetch and display the dashboard data on page load
fetchDashboardData();
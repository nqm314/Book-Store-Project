// Script for adminDashboard.html 

const numCustomer = document.getElementById('num-customer')
const numRevenue = document.getElementById('num-revenue')
const numBook = document.getElementById('num-book')

let totalCustomers = 0;
let totalRevenue = 0;
let totalBooks = 0;

function fetchDashboardData() {
    fetch('http://localhost:3000/api/dashboard')
    .then(response => response.json())
    .then(data => {
        totalCustomers = data.numOfCustomers;
        totalRevenue = data.numOfOrders;
        totalBooks = data.numOfBooks;
        showDashboardData();
    })
    .catch (error => console.error('Error loading dashboard data: ', error));
}

function showDashboardData() {
    numCustomer.innerHTML = totalCustomers;
    numRevenue.innerHTML = totalRevenue;
    numBook.innerHTML = totalBooks;    
}

fetchDashboardData(); 
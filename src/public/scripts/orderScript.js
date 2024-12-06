const ordersSection = document.getElementById("orders-section");

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString); // Parse the ISO string
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function fetchOrders() {
  fetch("http://localhost:3000/api/order/get-all-order")
    .then((response) => response.json())
    .then((data) => {
      displayOrders(data);
    })
    .catch((error) => {
      console.error("Error when loading orders: ", error);
    });
}

function displayOrders(data) {
  ordersSection.innerHTML = "";

  if (data.length === 0) {
    ordersSection.innerHTML = "<p>No order was found!.</p>";
    return;
  }

  data.forEach((order) => {
    const orderCard = document.createElement("div");
    orderCard.className = "bg-white shadow-md rounded-lg p-6";

    orderCard.innerHTML = `
      <h2 class="text-lg font-semibold text-gray-800 mb-2">Đơn hàng #${
        order.OrderID
      }</h2>
      <p class="text-sm text-gray-600"><span class="font-semibold">Thời gian:</span> ${formatDateTime(
        order.OrderDate
      )}</p>
      <p class="text-sm text-gray-600"><span class="font-semibold">Địa chỉ:</span> ${
        order.OrderAddress
      }</p>
      <p class="text-sm text-gray-600"><span class="font-semibold">Trạng thái:</span> ${
        order.OrderStatus
      }</p>
      <p class="text-sm text-gray-600"><span class="font-semibold">Phương thức thanh toán:</span> ${
        order.PaymentMethod
      }</p>
      <p class="text-sm text-gray-600"><span class="font-semibold">Thời gian thanh toán:</span> ${formatDateTime(
        order.PaymentTime
      )}</p>
      <p class="text-sm text-gray-600"><span class="font-semibold">Thời gian dự kiến hoàn thành:</span> ${formatDateTime(
        order.ExpectedComplete
      )}</p>
      <div class="flex flex-col items-center">
        <button data-order-id="${
          order.OrderID
        }" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          View Details
        </button>
      </div>
      
      `;

    ordersSection.appendChild(orderCard);
  });

  const detailButtons = ordersSection.querySelectorAll("button");
  detailButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const orderId = event.target.getAttribute("data-order-id");
      fetchOrderDetails(orderId); // Fetch and display order details
    });
  });
}
fetchOrders();

function fetchOrderDetails(orderId) {
  fetch(`http://localhost:3000/api/order/${orderId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched Order Details:", data);
      displayOrderDetails(data); // Display the fetched order details
    })
    .catch((error) => {
      console.error("Error fetching order details:", error);
    });
}

function displayOrderDetails(order) {
  const modal = document.getElementById("order-modal");
  const detailsContainer = document.getElementById("order-detail");

  detailsContainer.innerHTML = `<div class="bg-white rounded-lg shadow-md p-6 w-full max-w-lg mx-auto">
      <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">
        Order Details: #${order.OrderID}
      </h2>

      <!-- General Order Details -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
          General Details
        </h3>
        <p class="text-sm text-gray-600"><span class="font-semibold">Date:</span> ${formatDateTime(
          order.OrderDate
        )}</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Address:</span> ${
          order.OrderAddress
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Status:</span> ${
          order.OrderStatus
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Original Price:</span> ${
          order.OriginalPrice
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Payment Method:</span> ${
          order.PaymentMethod
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Payment Time:</span> ${formatDateTime(
          order.PaymentTime
        )}</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Expected Complete:</span> ${formatDateTime(
          order.ExpectedComplete
        )}</p>
      </div>

      <!-- Customer Details -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
          Customer Details
        </h3>
        <p class="text-sm text-gray-600"><span class="font-semibold">Name:</span> ${
          order.CustomerName
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Sex:</span> ${
          order.CustomerSex
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Age:</span> ${
          order.CustomerAge
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Level:</span> ${
          order.CustomerLevel
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Order Sum:</span> ${
          order.CustomerOrderSum
        }</p>
      </div>

      <!-- Staff Details -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
          Staff Details
        </h3>
        <p class="text-sm text-gray-600"><span class="font-semibold">Name:</span> ${
          order.StaffName
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Salary:</span> $${
          order.StaffSalary
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Hired Date:</span> ${formatDateTime(
          order.StaffHired
        )}</p>
      </div>

      <!-- Shipper Details -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
          Shipper Details
        </h3>
        <p class="text-sm text-gray-600"><span class="font-semibold">Name:</span> ${
          order.ShipperName
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Phone Number:</span> ${
          order.PhoneNumber
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">City:</span> ${
          order.City
        }</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Address:</span> ${
          order.Address
        }</p>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-between">
        <button id="edit-order" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Edit
        </button>
        <button id="delete-order" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete
        </button>
        <button id="close-modal" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Close
        </button>
      </div>
    </div>
      `;

  // Hiển thị modal
  modal.classList.add("show");

  // Đóng modal khi click nút "Close"
  const closeModalButton = document.getElementById("close-modal");
  closeModalButton.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}


// Hàm để gọi API và lấy đơn hàng có tổng giá trị trên ngưỡng
function fetchOrdersAboveThreshold() {
  const threshold = document.getElementById("threshold").value.trim();
  const status = document.getElementById("status").value;
  const paymentMethod = document.getElementById("payment-method").value; 

  if (!threshold || isNaN(threshold)) {
    alert("Please enter a valid numeric value for the threshold.");
    return;
  }
  // Gửi yêu cầu đến API với threshold
  fetch(`http://localhost:3000/api/filter-by-threshold?threshold=${threshold}&status=${status}&paymentMethod=${paymentMethod}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Orders data: ", data); // Ghi log dữ liệu
      displayOrders(data);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
      alert(`Error fetching orders: ${error.message}`);
    });
}

// Event listener cho nút lọc
document
  .getElementById("filter-button")
  .addEventListener("click", fetchOrdersAboveThreshold);
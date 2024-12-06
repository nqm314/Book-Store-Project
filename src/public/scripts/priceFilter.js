// Hàm để gọi API và lấy đơn hàng có tổng giá trị trên ngưỡng
function fetchOrdersAboveThreshold() {
    const threshold = document.getElementById("threshold").value.trim();
  
    if (!threshold || isNaN(threshold)) {
      alert("Please enter a valid numeric value for the threshold.");
      return;
    }
  
    // Gửi yêu cầu đến API với threshold
    fetch(
      `http://localhost:3000/api/order/filter-by-threshold?threshold=${threshold}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.orders) {
          displayOrders(data.orders);
        } else {
          alert("No orders found above the threshold.");
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        alert("Error fetching orders.");
      });
  }
  
  // Hàm hiển thị các đơn hàng
  function displayOrders(orders) {
    const orderSection = document.getElementById("order-section");
    orderSection.innerHTML = ""; // Clear previous results
  
    orders.forEach((order) => {
      const orderCard = document.createElement("div");
      orderCard.className = "bg-white shadow-md rounded-lg p-6";
  
      orderCard.innerHTML = `
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Order #${order.OrderID}</h2>
          <p class="text-sm text-gray-600"><span class="font-semibold">Total Price:</span> $${order.total_price}</p>
        `;
  
      orderSection.appendChild(orderCard);
    });
  }
  
  // Event listener cho nút lọc
  document
    .getElementById("filter-button")
    .addEventListener("click", fetchOrdersAboveThreshold);
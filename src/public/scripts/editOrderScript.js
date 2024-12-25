// Script for editBook.html
const responseModal = document.getElementById('response-modal');
const responseMessage = document.getElementById('response-message');
const okBtn = document.getElementById('ok-btn');
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("id")
console.log("editOrderScript nha ", orderId);

document.getElementById('edit-order-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedOrder = {
        order_id: document.getElementById("order-id").value,
        status: document.getElementById("order-status").value || null,
    };

    console.log(updatedOrder);

    fetch(`/api/order/update/${orderId}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(updatedOrder),
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
        console.log("Response data:", data);
        responseMessage.innerHTML = "Cập nhật đơn hàng thành công!";
        responseModal.style.display = 'block';
        
        okBtn.onclick = function() {
            window.location.href = '/manageOrders';
        };
    })
    .catch((error) => {
        console.error("Lỗi khi cập nhật don hang: ", error);
        responseMessage.innerHTML = error.message || "Có lỗi xảy ra khi cập nhật don hang";
        responseModal.style.display = 'block';
        
        okBtn.onclick = function() {
            responseModal.style.display = 'none';
        };
    });
});
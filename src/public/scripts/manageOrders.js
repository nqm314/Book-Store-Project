// const deleteButtons = document.querySelectorAll(".delete-btn");
const editButton = document.querySelectorAll(".edit-btn");
// const confirmationDeleteBox = document.getElementById("confirmation-delete-box");
const confirmationEditBox = document.getElementById("confirmation-edit-box");
// const confirmDeleteButton = document.getElementById("confirm-delete");
// const cancelDeleteButton = document.getElementById("cancel-delete");
const confirmEditButton = document.getElementById("confirm-edit");
const cancelEditButton = document.getElementById("cancel-edit");
// let orderToDeleteId = null;
let orderToEditId = null;

// deleteButtons.forEach((button) => {
//   button.addEventListener("click", function () {
//     bookToDeleteId =
//       this.parentElement.parentElement.querySelector(
//         "td:nth-child(2)"
//       ).textContent;
//     confirmationDeleteBox.style.display = "flex";
//   });
// });

function searchOrders() {
  const searchQuery = document.getElementById('search-input').value;
  const sort = document.getElementById('sort-dropdown').value;
  window.location.href = `/manageOrders/search?q=${searchQuery}&sort=${sort}&page=1`;
}

editButton.forEach((button) => {
  button.addEventListener("click", function () {
    orderToEditId =
      this.parentElement.parentElement.querySelector(
        "td:nth-child(2)"
      ).textContent;
    confirmationEditBox.style.display = "flex";
  });
});

// confirmDeleteButton.addEventListener("click", function () {
//   console.log(bookToDeleteId);
//   if (bookToDeleteId) {
//     fetch(`${baseUrl}/api/book/${bookToDeleteId}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message) {
//           alert(data.message);
//           window.location.reload(); // Reload the page after deletion
//         }
//       })
//       .catch((error) => {
//         console.error("Lỗi khi xóa sách:", error);
//       });
//     confirmationDeleteBox.style.display = "none";
//   }
// });

// cancelDeleteButton.addEventListener("click", function () {
//   bookToDeleteId = null;
//   confirmationDeleteBox.style.display = "none";
// });

confirmEditButton.addEventListener("click", function () {
  console.log(orderToEditId);
  window.location.href = `/manageOrders/edit?id=${orderToEditId}`;
});

cancelEditButton.addEventListener("click", function() {
  orderToEditId = null;
  confirmationEditBox.style.display = "none";
});

// Close confirmation box when clicking outside of it
window.addEventListener("click", function (event) {
  if ( event.target === confirmationEditBox) {
    // orderToDeleteId = null;
    orderToEditId = null;
    // confirmationDeleteBox.style.display = "none";
    confirmationEditBox.style.display = "none";
  }
});
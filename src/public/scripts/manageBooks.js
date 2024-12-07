document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const confirmationBox = document.getElementById("confirmation-box");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");
  let bookToDeleteId = null;

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      bookToDeleteId =
        this.parentElement.parentElement.querySelector(
          "td:nth-child(2)"
        ).textContent;
      confirmationBox.style.display = "flex";
    });
  });

  confirmDeleteButton.addEventListener("click", function () {
    if (bookToDeleteId) {
      fetch(`http://localhost:5000/api/book/${bookToDeleteId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
            window.location.reload(); // Reload the page after deletion
          }
        })
        .catch((error) => {
          console.error("Lỗi khi xóa sách:", error);
        });
      confirmationBox.style.display = "none";
    }
  });

  cancelDeleteButton.addEventListener("click", function () {
    bookToDeleteId = null;
    confirmationBox.style.display = "none";
  });

  // Close confirmation box when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === confirmationBox) {
      bookToDeleteId = null;
      confirmationBox.style.display = "none";
    }
  });
});

  const deleteButtons = document.querySelectorAll(".delete-btn");
  const editButton = document.querySelectorAll(".edit-btn");
  const confirmationDeleteBox = document.getElementById("confirmation-delete-box");
  const confirmationEditBox = document.getElementById("confirmation-edit-box");
  const confirmDeleteButton = document.getElementById("confirm-delete");
  const cancelDeleteButton = document.getElementById("cancel-delete");
  const confirmEditButton = document.getElementById("confirm-edit");
  const cancelEditButton = document.getElementById("cancel-edit");
  let bookToDeleteId = null;
  let bookToEditId = null;

  // const searchForm = document.getElementById("form");
  // const searchInput = document.getElementById("search-area");

  // searchForm.addEventListener("submit", function (event) {
  //   event.preventDefault();
  //   const query = searchInput.value.trim();
  //   if (query) {
  //     fetch(`${baseUrl}/api/search?q=${query}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Handle the search results here
  //         console.log(data);
  //         // You can update the DOM with the search results
  //       })
  //       .catch((error) => {
  //         console.error("Lỗi khi tìm kiếm sách:", error);
  //       });
  //   }
  // });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      bookToDeleteId =
        this.parentElement.parentElement.querySelector(
          "td:nth-child(2)"
        ).textContent;
      confirmationDeleteBox.style.display = "flex";
    });
  });

  editButton.forEach((button) => {
    button.addEventListener("click", function () {
      bookToEditId =
        this.parentElement.parentElement.querySelector(
          "td:nth-child(2)"
        ).textContent;
      confirmationEditBox.style.display = "flex";
    });
  });

  confirmDeleteButton.addEventListener("click", function () {
    console.log(bookToDeleteId);
    if (bookToDeleteId) {
      fetch(`/api/book/${bookToDeleteId}`, {
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
      confirmationDeleteBox.style.display = "none";
    }
  });

  cancelDeleteButton.addEventListener("click", function () {
    bookToDeleteId = null;
    confirmationDeleteBox.style.display = "none";
  });

  confirmEditButton.addEventListener("click", function () {
    console.log(bookToEditId);
    window.location.href = `/manageBooks/edit?id=${bookToEditId}`;
  });

  cancelEditButton.addEventListener("click", function() {
    bookToEditId = null;
    confirmationEditBox.style.display = "none";
  });

  // Close confirmation box when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === confirmationDeleteBox || event.target === confirmationEditBox) {
      bookToDeleteId = null;
      bookToEditId = null;
      confirmationDeleteBox.style.display = "none";
      confirmationEditBox.style.display = "none";
    }
  });
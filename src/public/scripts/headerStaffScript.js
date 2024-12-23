// header Dropdown
document.addEventListener("DOMContentLoaded", function () {
  const userAvatar = document.getElementById("user-avatar");
  const menuUser = document.querySelector(".menu-user");

  function toggleDropdown() {
    menuUser.classList.toggle("active");
  }

  userAvatar.addEventListener("click", toggleDropdown);

  // Đóng dropdown khi nhấn vào bất kỳ đâu ngoài dropdown
  window.addEventListener("click", function (event) {
    if (!menuUser.contains(event.target)) {
      menuUser.classList.remove("active");
    }
  });
});

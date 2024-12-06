const openDialogButton = document.getElementById('openDialog');
const confirmationDialog = document.getElementById('confirmationDialog');
const confirmButton = document.getElementById('confirmBtn');
const cancelButton = document.getElementById('cancelBtn');

// Mở bảng thông báo
openDialogButton.addEventListener('click', () => {
  confirmationDialog.style.display = 'flex';
});

// Xử lý khi nhấn nút Đồng ý
confirmButton.addEventListener('click', () => {
  alert('Bạn đã đồng ý!');
  confirmationDialog.style.display = 'none';
});

// Xử lý khi nhấn nút Hủy
cancelButton.addEventListener('click', () => {
  confirmationDialog.style.display = 'none';
});

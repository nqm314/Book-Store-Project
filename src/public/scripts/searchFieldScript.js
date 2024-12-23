document.addEventListener("DOMContentLoaded", function () {
  function setupToggle(viewMoreId, viewLessId, listId) {
    const viewMoreBtn = document.getElementById(viewMoreId);
    const viewLessBtn = document.getElementById(viewLessId);
    const list = document.getElementById(listId);

    if (viewMoreBtn && viewLessBtn && list) {
      const allItems = Array.from(list.children);

      function showAllItems() {
        allItems.forEach((item) => (item.style.display = "flex"));
        viewMoreBtn.style.display = "none";
        viewLessBtn.style.display = "inline";
      }

      function hideExtraItems() {
        allItems.slice(5).forEach((item) => (item.style.display = "none"));
        viewMoreBtn.style.display = "inline";
        viewLessBtn.style.display = "none";
      }

      viewMoreBtn.addEventListener("click", showAllItems);
      viewLessBtn.addEventListener("click", hideExtraItems);

      // Ban đầu chỉ hiển thị 5 mục đầu tiên
      hideExtraItems();
    }
  }

  setupToggle("view-more-publisher", "view-less-publisher", "publisher-list");
  setupToggle("view-more-author", "view-less-author", "author-list");
});

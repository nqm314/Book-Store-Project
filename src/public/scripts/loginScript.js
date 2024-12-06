function fetchLogin(username, password) {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        displayLogin(data.staff); // Display the logged-in user's info
      })
      .catch((error) => {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent =
          error.message || "An unexpected error occurred.";
        errorMessage.classList.remove("hidden");
        console.error("Error logging in:", error);
      });
}


  // Function to display login success
function displayLogin(staff) {
    // Here you can handle what happens after a successful login
    // alert("Login successful!");
    console.log("Staff Info:", staff);
    // Redirect to another page or show staff details on the same page
    window.location.href = "/admin/dashboard"; // Example redirect to a dashboard page
}
  
  // Event listener for the form submit
const loginForm = document.getElementById("login-form");
  
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username && password) {
      fetchLogin(username, password);
    } else {
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = "Please enter both username and password.";
      errorMessage.classList.remove("hidden");
    }
});
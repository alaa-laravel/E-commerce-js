// Authentication and Session Management

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItemCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartCountElements = document.querySelectorAll("#cart-count");
  cartCountElements.forEach((element) => {
    element.textContent = totalItemCount;
  });
}

function updateUsername() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const usernameElements = document.querySelectorAll("#username-text");
  if (currentUser) {
    usernameElements.forEach((element) => {
      element.textContent = currentUser.name;
    });
  } else {
    usernameElements.forEach((element) => {
      element.textContent = "Guest";
    });
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  updateUsername();
  updateCartCount();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (
    !currentUser &&
    !window.location.pathname.includes("login.html") &&
    !window.location.pathname.includes("register.html")
  ) {
    window.location.href = "login.html";
  }
});

// // Initialize default admin user for testing
// window.addEventListener("load", () => {
//   const users = localStorage.getItem("users");
//   if (!users) {
//     const defaultUsers = [
//       { name: "Admin User", email: "admin@test.com", password: "123456" },
//     ];
//     localStorage.setItem("users", JSON.stringify(defaultUsers));
//   }
// });

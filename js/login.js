// Login Form - Simplified

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-password");
  const emailErr = document.getElementById("login-email-error");
  const passErr = document.getElementById("login-password-error");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Clear errors on input
  emailInput.addEventListener("input", () => { emailErr.textContent = ""; });
  passInput.addEventListener("input", () => { passErr.textContent = ""; });

  // Live validation
  emailInput.addEventListener("input", () => {
    if (emailInput.value && !isValidEmail(emailInput.value)) {
      emailErr.textContent = "Invalid email";
    }
  });

  passInput.addEventListener("input", () => {
    if (passInput.value && passInput.value.length < 6) {
      passErr.textContent = "Min 6 characters";
    }
  });

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const pass = passInput.value;

    emailErr.textContent = !email ? "Email required" : !isValidEmail(email) ? "Invalid email" : "";
    passErr.textContent = !pass ? "Password required" : pass.length < 6 ? "Min 6 characters" : "";

    if (emailErr.textContent || passErr.textContent) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === pass);

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password'
      });
      return;
    }

        localStorage.setItem("currentUser", JSON.stringify({ email: user.email, name: user.name }));
        window.location.href = "index.html";
      });
    });

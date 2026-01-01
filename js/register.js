document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const nameInput = document.getElementById("register-name");
  const emailInput = document.getElementById("register-email");
  const passInput = document.getElementById("register-password");
  const confirmInput = document.getElementById("register-confirm-password");
  const nameErr = document.getElementById("register-name-error");
  const emailErr = document.getElementById("register-email-error");
  const passErr = document.getElementById("register-password-error");
  const confirmErr = document.getElementById("register-confirm-error");

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  nameInput.addEventListener("input", () => {
    nameErr.textContent =
      nameInput.value.trim().length < 3 ? "Min 3 chars" : "";
  });

  emailInput.addEventListener("input", () => {
    const val = emailInput.value.trim();
    if (!val) {
      emailErr.textContent = "";
    } else if (!validateEmail(val)) {
      emailErr.textContent = "Invalid email";
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      emailErr.textContent = users.some((u) => u.email === val)
        ? "Email exists"
        : "";
    }
  });

  passInput.addEventListener("input", () => {
    passErr.textContent = passInput.value.length < 6 ? "Min 6 chars" : "";
    if (confirmInput.value) {
      confirmErr.textContent =
        passInput.value !== confirmInput.value ? "No match" : "";
    }
  });

  confirmInput.addEventListener("input", () => {
    confirmErr.textContent =
      passInput.value !== confirmInput.value ? "No match" : "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const pass = passInput.value;
    const confirm = confirmInput.value;

    nameErr.textContent = name.length < 3 ? "Min 3 chars" : "";
    emailErr.textContent = !validateEmail(email) ? "Invalid email" : "";
    passErr.textContent = pass.length < 6 ? "Min 6 chars" : "";
    confirmErr.textContent = pass !== confirm ? "No match" : "";

    if (
      nameErr.textContent ||
      emailErr.textContent ||
      passErr.textContent ||
      confirmErr.textContent
    )
      return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      emailErr.textContent = "Email exists";
      return;
    }

    users.push({ name, email, password: pass });
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";
  });
});

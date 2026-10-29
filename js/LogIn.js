const form = document.getElementById("login-form");
const feedback = document.getElementById("login-feedback");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "Inloggen is nog niet gekoppeld aan een accountsysteem.";
});
const createGame = document.getElementById("create-game");
const register = document.getElementById("register");
const logIn = document.getElementById("log in");

createGame.addEventListener("click", () => {
    window.location.href = "DeelnameGroep.html";
});

register.addEventListener("click", () => {
    window.location.href = "Register.html";
});

logIn.addEventListener("click", () => {
    window.location.href = "LogIn.html";
});

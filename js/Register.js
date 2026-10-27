const feedback = document.getElementById("feedback").value.trim();

const naam = document.getElementById("naam").value.trim();
const email = document.getElementById("email").value.trim();
const wachtwoord = document.getElementById("wachtwoord").value.trim();
const herhalingWachtwoord = document.getElementById("herhaal wachtwoord").value.trim();

document.getElementById("naam-fout").textContent = "";
document.getElementById("email-fout").textContent = "";
document.getElementById("wachtwoord-fout").textContent = "";
document.getElementById("herhaalwachtwoord-fout").textContent = "";

let geldig = "true";

if (naam === "") {
    document.getElementById("naam-fout").textContent = "Vul uw naam in.";
    geldig = false;
}

if (email === "") {
    document.getElementById("email-fout").textContent = "Vul uw e-mailadres in.";
    geldig = false;
}

else if (!email.includes("@")) {
    document.getElementById("email-fout").textContent = "Voer een geldige e-mailadres in.";
    geldig = false;
}

if (wachtwoord === "") {
    document.getElementById("wachtwoord-fout").textContent = "Voer uw wachtwoord in.";
    geldig = false;
}

else if (wachtwoord.length < 8) {
    document.getElementById("wachtwoord-fout").textContent = "Uw wachtwoord moet minimaal 8 tekens hebben.";
    geldig = false;
}

else if (!/[A-Z]/.test(wachtwoord)) {
    document.getElementById("wachtwoord-fout").textContent = "Uw wachtwoord moet minstens een hoofdletter bevatten.";
    geldig = false;
}

else if (!/[a-z]/.test(wachtwoord)) {
    document.getElementById("wachtwoord-fout").textContent = "Uw wachtwoord moet minstens een kleine letter bevatten.";
    geldig = false;
}

else if (!/[0-9]/.test(wachtwoord)) {
    document.getElementById("wachtwoord-fout").textContent = "Uw wachtwoord moet minstens een cijfer bevatten.";
    geldig = false;
}

else if (!/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(wachtwoord)) {
    document.getElementById("wachtwoord-fout").textContent = "Uw wachtwoord moet minstens een teken bevatten.";
    geldig = false;
}

if (herhalingWachtwoord = "") {
    document.getElementById("herhaalwachtwoord-fout").textContent = "Voer uw wachtwoord opnieuw in.";
    geldig = false;
}

else if (!herhalingWachtwoord == wachtwoord) {
    document.getElementById("herhaalwachtwoord-fout").textContent = "Uw wachtwoord is niet gelijk. Typ het zo dat het gelijk is aan de eerste wachtwoord.";
    geldig = false;
}

if (!geldig) {
    return;
}

feedback.style.color = "green";
feedback.textContent = "Registratie succesvol ingevuld!"


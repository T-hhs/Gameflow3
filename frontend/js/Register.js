const form = document.getElementById("register-form");
const naam = document.getElementById("naam");
const email = document.getElementById("email");
const wachtwoord = document.getElementById("wachtwoord");
const herhaalWachtwoord = document.getElementById("herhaal-wachtwoord");
const feedback = document.getElementById("feedback");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errors = {
        naam: document.getElementById("naam-fout"),
        email: document.getElementById("email-fout"),
        wachtwoord: document.getElementById("wachtwoord-fout"),
        herhaalWachtwoord: document.getElementById("herhaalwachtwoord-fout")
    };

    Object.values(errors).forEach((error) => {
        error.textContent = "";
    });
    feedback.textContent = "";

    let geldig = true;

    if (naam.value.trim() === "") {
        errors.naam.textContent = "Vul je naam in.";
        geldig = false;
    }

    if (!email.validity.valid) {
        errors.email.textContent = "Vul een geldig e-mailadres in.";
        geldig = false;
    }

    if (wachtwoord.value.length < 8) {
        errors.wachtwoord.textContent = "Gebruik minimaal 8 tekens.";
        geldig = false;
    } else if (!/[A-Z]/.test(wachtwoord.value)) {
        errors.wachtwoord.textContent = "Gebruik minstens één hoofdletter.";
        geldig = false;
    } else if (!/[a-z]/.test(wachtwoord.value)) {
        errors.wachtwoord.textContent = "Gebruik minstens één kleine letter.";
        geldig = false;
    } else if (!/[0-9]/.test(wachtwoord.value)) {
        errors.wachtwoord.textContent = "Gebruik minstens één cijfer.";
        geldig = false;
    } else if (!/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(wachtwoord.value)) {
        errors.wachtwoord.textContent = "Gebruik minstens één speciaal teken.";
        geldig = false;
    }

    if (herhaalWachtwoord.value === "") {
        errors.herhaalWachtwoord.textContent = "Herhaal je wachtwoord.";
        geldig = false;
    } else if (herhaalWachtwoord.value !== wachtwoord.value) {
        errors.herhaalWachtwoord.textContent = "De wachtwoorden zijn niet hetzelfde.";
        geldig = false;
    }

    if (!geldig) {
        return;
    }

    feedback.textContent = "Je gegevens zijn gecontroleerd. Accountregistratie is nog niet gekoppeld aan een server.";
});

const form = document.querySelector("#groep-definitie");
const velden = [
    { id: "teamnaam", boodschap: "Vul hier de teamnaam in." },
    { id: "groepscode", boodschap: "Vul een geldige groepscode in." },
];
function valideerVeld(veld) {
    const input = document.querySelector(`#${veld.id}`);
    console.log(`#${veld.id}-error`)
    const foutmelding = document.querySelector(`#${veld.id}-error`);
    const geldig = input.checkValidity();
    input.setAttribute("aria-invalid", String(!geldig));
    console.log(foutmelding);
    foutmelding.textContent = geldig ? "" : veld.boodschap;
    return geldig;
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const alleGeldig = velden.map(valideerVeld).every(Boolean);
    if (!alleGeldig) {
        // bericht versturen naar backend
    }
});
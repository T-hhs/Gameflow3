const teamContainer = document.getElementsByClassName("teams");

const teams = [
    {
        naam: "team 1",
    },
    {
        naam: "team 2",
    },
    {
        naam: "team 3",
    },
    {
        naam: "team 4",
    },
    {
        naam: "team 5",
    },
];



const scenarios = [
    {
        naam: "arm",
    },
    {
        naam: "lokaal",
    },
    {
        naam: "veel schuld",
    },
    {
        naam: "keten",
    },
];




teams.forEach(team => {
    const art = document.createElement("article");
    art.classList.add("team");
    teamContainer[0].appendChild(art);
    

    const p = document.createElement("p");
    const b = document.createElement("b");
    b.textContent  = team.naam;
    art.appendChild(p);
    p.appendChild(b);

    const select = document.createElement("select");
    select.name = "team";
    select.id = "team";

    let i = 1;

    scenarios.forEach(opt => {
        const o = document.createElement("option")
        o.value = i;
        i++;
        o.textContent = opt.naam;

        select.appendChild(o);
    });

    art.appendChild(select);
});

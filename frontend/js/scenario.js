const teamContainer = document.getElementsByClassName("teams")[0];
const scenarioInfo = document.getElementsByClassName("info")[0];

const infoSceneName = document.getElementById("infoScenName");
const infoTeamName = document.getElementById("infoTeam");
const infoField = document.getElementById("infoField");

const teams = [
    {
        naam: "Team 1",
        code: "1",
    },
    {
        naam: "Team 2",
        code: "1",
    },
    {
        naam: "Team 3",
        code: "1",
    },
    {
        naam: "Team 4",
        code: "1",
    },
    {
        naam: "Team 5",
        code: "1",
    },
];



const scenarios = [
    {
        naam: "Lokale supermarkt",
        desc: "Een lokale supermarkt met weinig berijk en totaal geld, maar veel klanttevredenheid en hoge betrouwbaarheid.",
    },
    {
        naam: "Nationale keten",
        desc: "Een supermarktbedrijf met veel winkels over het land en dus veel klanten, maar hoge kosten.",
    },
    {
        naam: "Geldproblemen",
        desc: "Een start met een grote supermarkt, maar weinig geld en lage betrouwbaardheid.",
    },
    {
        naam: "Huismerkproducten",
        desc: "Een supermarkt met veel betrouwbaarheid en veel klanten, maar lage productprijzen en middelmatige kwaliteit.",
    },
];




teams.forEach(team => {
    const art = document.createElement("article");
    art.classList.add("team");
    teamContainer.appendChild(art);
    

    const p = document.createElement("p");
    const b = document.createElement("b");
    b.textContent  = team.naam;
    art.appendChild(p);
    p.appendChild(b);

    const select = document.createElement("select");
    select.name = "team";
    select.id = "team";

    let i = 0;

    scenarios.forEach(opt => {
        const o = document.createElement("option")
        o.value = i;
        i++;
        o.textContent = opt.naam;

        select.appendChild(o);
    });

    select.addEventListener("change", function() {
        const sc = scenarios[this.value];
        infoTeamName.textContent = team.naam;
        infoSceneName.textContent = sc.naam;
        infoField.textContent = sc.desc;

    });


    art.appendChild(select);
});

(() => {

   
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];


  

    const spelStatus = {
        ronde: 1,
        score: 100,
        team: "Team 1",
        doelen: [],
        strategie: "Gebalanceerde groei",
        actie: "Voorzichtig handelen",

        teamscores: [
            { team: "Team 1", score: 120 },
            { team: "Team 4", score: 110 },
            { team: "Team 2", score: 95 },
            { team: "Team 3", score: 85 }
        ]
    };


  
    const seizoenen = [
        "Lente",
        "Zomer",
        "Herfst",
        "Winter"
    ];


  
    const aanwijzingen = [
        "Let op de gevolgen van jullie gekozen strategie voor de doelen.",
        "Bekijk welke KPI achterblijft en bespreek waar verbetering mogelijk is.",
        "Houd het budget in de gaten wanneer jullie een nieuwe actie kiezen.",
        "Vergelijk het eindresultaat met jullie oorspronkelijke doelen."
    ];


   
    const beschrijvingen = {

        "Gebalanceerde groei":
            "Verdeel aandacht over de gekozen doelen en maak bewuste afwegingen.",

        "Kosten beheersen":
            "Let extra op uitgaven en gebruik het beschikbare budget zorgvuldig.",

        "Klant eerst":
            "Geef prioriteit aan klantbeleving en onderzoek hoe keuzes de tevredenheid beïnvloeden."

    };


   
    let meldingstimer;



    function toonMelding(bericht) {

        const melding = $("#melding");

        melding.textContent = bericht;
        melding.hidden = false;

        clearTimeout(meldingstimer);

        meldingstimer = setTimeout(() => {
            melding.hidden = true;
        }, 3500);

    }



    function toonScherm(schermNaam) {

        const doelScherm = $(`[data-scherm="${schermNaam}"]`);


        if (!doelScherm) return;


    
        $$("[data-scherm]").forEach((scherm) => {

            scherm.hidden = scherm !== doelScherm;

        });



        $$(".rondeNummer").forEach((element) => {

            element.textContent = spelStatus.ronde;

        });


 
        $$(".rondeLabel").forEach((element) => {

            element.textContent = `Ronde ${spelStatus.ronde} / 4`;

        });


        $("#rondeTitel").textContent =
            `Ronde ${spelStatus.ronde}`;


        $("#rondeOndertitel").textContent =
            `${seizoenen[spelStatus.ronde - 1]} · Bekijk de tussenstand van de teams.`;


        $("#resultaatTitel").textContent =
            `Resultaat ronde ${spelStatus.ronde}`;


        $("#resultaatMelding").textContent =
            spelStatus.ronde === 4
                ? "De laatste voorbeeldronde is afgerond. Dit is een demonstratieweergave."
                : "De voorbeeldronde is afgerond. Bespreek de keuzes voordat je verdergaat.";



        $("#volgendeRonde").textContent =
            spelStatus.ronde === 4
                ? "Bekijk eindstand"
                : "Volgende ronde →";



        if (schermNaam === "ronde") {

            toonRonde();

        }


      
        if (schermNaam === "resultaten") {

            toonResultaten();

        }



        history.replaceState(null, "", "#" + schermNaam);


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    function geselecteerdeDoelen() {

        return $$('input[type="checkbox"][value]')

            .filter((invoerveld) => invoerveld.checked)

            .map((invoerveld) => invoerveld.value);

    }



    function toonDoelen() {

        const doelen = geselecteerdeDoelen();

        $("#doelenMelding").textContent =
            `${doelen.length} / 3 doelen gekozen.`;

    }



    function toonTeamranglijst() {

        const teamLijst = $("#teamRanglijst");

        teamLijst.replaceChildren();


    
        const gesorteerdeTeams = [...spelStatus.teamscores].sort(
            (teamA, teamB) => teamB.score - teamA.score
        );


        
        gesorteerdeTeams.forEach((teamGegevens, volgnummer) => {

            const lijstOnderdeel = document.createElement("li");


            const rangnummer = document.createElement("span");

            rangnummer.className = "rangnummer";
            rangnummer.textContent = volgnummer + 1;

            const teamNaam = document.createElement("span");

            teamNaam.className = "teamnaam";
            teamNaam.textContent = teamGegevens.team;


            const teamScore = document.createElement("strong");

            teamScore.textContent = `${teamGegevens.score} ptn`;


            
            lijstOnderdeel.append(
                rangnummer,
                teamNaam,
                teamScore
            );


         
            teamLijst.append(lijstOnderdeel);

        });


        const teamPositie = gesorteerdeTeams.findIndex(
            (teamGegevens) => teamGegevens.team === spelStatus.team
        ) + 1;



        $("#teamPositie").textContent =
            `${spelStatus.team} staat op plek ${teamPositie}`;

    }



    function toonRonde() {

        toonTeamranglijst();


      
        $("#score").textContent = spelStatus.score;



        $("#scoreOnderschrift").textContent =
            `${spelStatus.team} · ${seizoenen[spelStatus.ronde - 1]} · voorbeeldscore`;


        $("#aanwijzing").textContent =
            aanwijzingen[spelStatus.ronde - 1];


    
        $("#rondeSamenvatting").textContent =

            `Doelen: ${
                spelStatus.doelen.length
                    ? spelStatus.doelen.join(", ")
                    : "nog niet gekozen"
            }. ` +

            `Strategie: ${spelStatus.strategie}. ` +

            `Actie: ${spelStatus.actie}.`;

    }


    function toonResultaten() {

    
        $("#resultaatScore").textContent =
            spelStatus.score;


    
        $("#resultaatDoelen").textContent =

            spelStatus.doelen.length
                ? spelStatus.doelen.join(", ")
                : "Nog niet gekozen";



        $("#resultaatStrategie").textContent =
            spelStatus.strategie;


      
        $("#resultaatActie").textContent =
            spelStatus.actie;

    }



    function verzamelKeuzes() {

        const doelen = geselecteerdeDoelen();


    
        if (doelen.length !== 3) {

            toonMelding(
                "Kies precies drie doelen voordat je verdergaat."
            );

            toonScherm("doelen");

            return false;

        }


        spelStatus.doelen = doelen;



        spelStatus.strategie = $("#strategie").value;



        const gekozenActie = $('input[name="gebeurtenisActie"]:checked');


      
        spelStatus.actie = gekozenActie
            ? gekozenActie.value
            : "Voorzichtig handelen";


        return true;

    }




    $$("[data-naar]").forEach((knop) => {

        knop.addEventListener("click", () => {

            toonScherm(knop.dataset.naar);

        });

    });




    $$('a[href="#scenario"]').forEach((verwijzing) => {

        verwijzing.addEventListener("click", (gebeurtenis) => {

            gebeurtenis.preventDefault();

            toonScherm("scenario");

        });

    });




    $$('input[type="checkbox"][value]').forEach((invoerveld) => {

        invoerveld.addEventListener("change", () => {



            if (geselecteerdeDoelen().length > 3) {


                invoerveld.checked = false;

                toonMelding(
                    "Je kunt maximaal drie doelen kiezen."
                );

            }


            toonDoelen();

        });

    });



    $("#strategie").addEventListener("change", (gebeurtenis) => {

        $("#strategieBeschrijving").textContent =
            beschrijvingen[gebeurtenis.target.value];

    });


    $("#naarGebeurtenis").addEventListener("click", () => {

       
        if (!verzamelKeuzes()) return;



        toonScherm("gebeurtenis");

    });




    $("#rondAfronden").addEventListener("click", () => {



        const puntenVerschil =

            spelStatus.actie === "Investeren in verbetering"
                ? 15

                : spelStatus.actie === "Teamoverleg"
                    ? 8

                    : 3;



        spelStatus.score += puntenVerschil;



        const eigenTeam = spelStatus.teamscores.find(
            (teamGegevens) => teamGegevens.team === spelStatus.team
        );



        if (eigenTeam) {

            eigenTeam.score = spelStatus.score;

        }

        toonMelding(

            `Demonstratie: ${spelStatus.team} krijgt ${puntenVerschil} punten. Dit is geen officiële scoreberekening.`

        );



        toonScherm("resultaten");

    });




    $("#volgendeRonde").addEventListener("click", () => {



        if (spelStatus.ronde >= 4) {

            toonMelding(
                "Alle vier demonstratierondes zijn bekeken."
            );

            return;

        }


        spelStatus.ronde++;



        toonScherm("doelen");


      
        toonMelding(

            `Ronde ${spelStatus.ronde}: ${seizoenen[spelStatus.ronde - 1]}.`

        );

    });




    $("#instellingenKnop").addEventListener("click", () => {

        const instellingenPaneel = $("#instellingen");



        instellingenPaneel.hidden = !instellingenPaneel.hidden;


        
        $("#instellingenKnop").setAttribute(
            "aria-expanded",
            String(!instellingenPaneel.hidden)
        );

    });


    $("#sluitInstellingen").addEventListener("click", () => {

        $("#instellingen").hidden = true;


        $("#instellingenKnop").setAttribute(
            "aria-expanded",
            "false"
        );

    });



    $("#hoogContrast").addEventListener("change", (gebeurtenis) => {

        document.body.classList.toggle(
            "hoog-contrast",
            gebeurtenis.target.checked
        );

    });


  

    $("#teamKeuze").addEventListener("change", (gebeurtenis) => {


        
        const teamKeuzelijst = gebeurtenis.target.closest(
            "select[data-teamnummer]"
        );


       
        if (!teamKeuzelijst) return;


   
        spelStatus.team =
            `Team ${teamKeuzelijst.dataset.teamnummer}`;


   
        toonMelding(
            `Voorbeeldpositie geselecteerd: ${spelStatus.team}.`
        );


    
        toonTeamranglijst();

    });




    const beginscherm = location.hash.slice(1);


 
    const toegestaneSchermen = [
        "scenario",
        "doelen",
        "gebeurtenis",
        "ronde",
        "resultaten"
    ];

    toonScherm(

        toegestaneSchermen.includes(beginscherm)
            ? beginscherm
            : "scenario"

    );


})();

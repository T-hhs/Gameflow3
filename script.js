
(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const state = {
    round: 1,
    score: 100,
    team: "Team 1",
    goals: [],
    strategy: "Gebalanceerde groei",
    action: "Voorzichtig handelen",
    scores: [
      { team: "Team 1", score: 120 },
      { team: "Team 4", score: 110 },
      { team: "Team 2", score: 95 },
      { team: "Team 3", score: 85 }
    ]
  };

  const seasons = ["Lente", "Zomer", "Herfst", "Winter"];

  const hints = [
    "Let op de gevolgen van jullie gekozen strategie voor de doelen.",
    "Bekijk welke KPI achterblijft en bespreek waar verbetering mogelijk is.",
    "Houd het budget in de gaten wanneer jullie een nieuwe actie kiezen.",
    "Vergelijk het eindresultaat met jullie oorspronkelijke doelen."
  ];

  const descriptions = {
    "Gebalanceerde groei":
      "Verdeel aandacht over de gekozen doelen en maak bewuste afwegingen.",
    "Kosten beheersen":
      "Let extra op uitgaven en gebruik het beschikbare budget zorgvuldig.",
    "Klant eerst":
      "Geef prioriteit aan klantbeleving en onderzoek hoe keuzes de tevredenheid beïnvloeden."
  };

  let toastTimer;

  function notify(message) {
    const toast = $("#toast");

    toast.textContent = message;
    toast.hidden = false;

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3500);
  }

  function show(name) {
    const target = $(`[data-screen="${name}"]`);

    if (!target) return;

    $$("[data-screen]").forEach((screen) => {
      screen.hidden = screen !== target;
    });

    $$(".roundNo").forEach((element) => {
      element.textContent = state.round;
    });

    $$(".roundPill").forEach((element) => {
      element.textContent = `Ronde ${state.round} / 4`;
    });

    $("#roundTitle").textContent = `Ronde ${state.round}`;

    $("#roundSubtitle").textContent =
      `${seasons[state.round - 1]} · Bekijk de tussenstand van de teams.`;

    $("#resultTitle").textContent =
      `Resultaat ronde ${state.round}`;

    $("#resultMessage").textContent =
      state.round === 4
        ? "De laatste voorbeeldronde is afgerond. Dit is een demonstratieweergave."
        : "De voorbeeldronde is afgerond. Bespreek de keuzes voordat je verdergaat.";

    $("#nextRound").textContent =
      state.round === 4 ? "Bekijk eindstand" : "Volgende ronde →";

    if (name === "round") {
      renderRound();
    }

    if (name === "results") {
      renderResults();
    }

    history.replaceState(null, "", "#" + name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectedGoals() {
    return $$('input[type="checkbox"][value]')
      .filter((input) => input.checked)
      .map((input) => input.value);
  }

  function renderGoals() {
    const goals = selectedGoals();

    $("#goalMessage").textContent =
      `${goals.length} / 3 doelen gekozen.`;
  }

  function renderLeaderboard() {
    const list = $("#leaderboard");

    list.replaceChildren();

    const sorted = [...state.scores].sort(
      (a, b) => b.score - a.score
    );

    sorted.forEach((item, index) => {
      const li = document.createElement("li");

      const rank = document.createElement("span");
      rank.className = "rank";
      rank.textContent = index + 1;

      const team = document.createElement("span");
      team.className = "team";
      team.textContent = item.team;

      const score = document.createElement("strong");
      score.textContent = `${item.score} ptn`;

      li.append(rank, team, score);
      list.append(li);
    });

    const place = sorted.findIndex(
      (item) => item.team === state.team
    ) + 1;

    $("#position").textContent =
      `${state.team} staat op plek ${place}`;
  }

  function renderRound() {
    renderLeaderboard();

    $("#score").textContent = state.score;

    $("#scoreCaption").textContent =
      `${state.team} · ${seasons[state.round - 1]} · demonstratiescore`;

    $("#hint").textContent = hints[state.round - 1];

    $("#roundSummary").textContent =
      `Doelen: ${state.goals.length ? state.goals.join(", ") : "nog niet gekozen"}. ` +
      `Strategie: ${state.strategy}. Actie: ${state.action}.`;
  }

  function renderResults() {
    $("#resultScore").textContent = state.score;

    $("#resultGoals").textContent =
      state.goals.length
        ? state.goals.join(", ")
        : "Nog niet gekozen";

    $("#resultStrategy").textContent = state.strategy;
    $("#resultAction").textContent = state.action;
  }

  function collectChoices() {
    const goals = selectedGoals();

    if (goals.length !== 3) {
      notify("Kies precies drie doelen voordat je verdergaat.");
      show("goals");
      return false;
    }

    state.goals = goals;
    state.strategy = $("#strategy").value;

    const action = $('input[name="eventAction"]:checked');

    state.action = action
      ? action.value
      : "Voorzichtig handelen";

    return true;
  }

  $$("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      show(button.dataset.go);
    });
  });

  $$('a[href="#scenario"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show("scenario");
    });
  });

  $$('input[type="checkbox"][value]').forEach((input) => {
    input.addEventListener("change", () => {
      if (selectedGoals().length > 3) {
        input.checked = false;
        notify("Je kunt maximaal drie doelen kiezen.");
      }

      renderGoals();
    });
  });

  $("#strategy").addEventListener("change", (event) => {
    $("#strategyDesc").textContent =
      descriptions[event.target.value];
  });

  $("#toEvent").addEventListener("click", () => {
    if (!collectChoices()) return;

    show("event");
  });

  $("#finishRound").addEventListener("click", () => {
    const delta =
      state.action === "Investeren in verbetering"
        ? 15
        : state.action === "Teamoverleg"
          ? 8
          : 3;

    state.score += delta;

    const ownTeam = state.scores.find(
      (item) => item.team === state.team
    );

    if (ownTeam) {
      ownTeam.score = state.score;
    }

    notify(
      `Demo: ${state.team} krijgt ${delta} punten. Dit is geen officiële scoreberekening.`
    );

    show("results");
  });

  $("#nextRound").addEventListener("click", () => {
    if (state.round >= 4) {
      notify("Alle vier demo-rondes zijn bekeken.");
      return;
    }

    state.round++;

    show("goals");

    notify(`Ronde ${state.round}: ${seasons[state.round - 1]}.`);
  });

  $("#settingsBtn").addEventListener("click", () => {
    const panel = $("#settings");

    panel.hidden = !panel.hidden;

    $("#settingsBtn").setAttribute(
      "aria-expanded",
      String(!panel.hidden)
    );
  });

  $("#closeSettings").addEventListener("click", () => {
    $("#settings").hidden = true;

    $("#settingsBtn").setAttribute("aria-expanded", "false");
  });

  $("#contrast").addEventListener("change", (event) => {
    document.body.classList.toggle(
      "contrast",
      event.target.checked
    );
  });

  $("#teams").addEventListener("change", (event) => {
    const select = event.target.closest("select[data-team]");

    if (!select) return;

    state.team = `Team ${select.dataset.team}`;

    notify(`Positievoorbeeld geselecteerd: ${state.team}.`);

    renderLeaderboard();
  });

  const initial = location.hash.slice(1);

  show(
    ["scenario", "goals", "event", "round", "results"].includes(initial)
      ? initial
      : "scenario"
  );
})();

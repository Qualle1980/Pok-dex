//#region Dialog Setup

/* Opens one Pokemon card in the dialog */
function openDialog(index) {
  currentDialogIndex = index;
  currentDialogTab = "main";
  renderDialog();
  document.getElementById("pokemonDialog").show();
  document.body.style.overflow = "hidden";
}

function renderDialog() {
  let pokemon = currentPokemon[currentDialogIndex];
  let type = getMainType(pokemon);
  let typeIconsHtml = getTypeIconsHtml(pokemon);
  document.getElementById("dialogContent").innerHTML = dialogTemplate(pokemon, type, typeIconsHtml);
  showDialogTab(currentDialogTab);
}

//#endregion

//#region Dialog Tabs

function showDialogTab(tab) {
  currentDialogTab = tab;
  setActiveTab(tab);
  if (tab == "main") {
    showMainTab();
  } else if (tab == "stats") {
    showStatsTab();
  } else {
    showEvolutionTab();
  }
}

function setActiveTab(tab) {
  document.getElementById("mainTab").className = "";
  document.getElementById("statsTab").className = "";
  document.getElementById("evoTab").className = "";
  if (tab == "main") {
    document.getElementById("mainTab").className = "activeTab";
  } else if (tab == "stats") {
    document.getElementById("statsTab").className = "activeTab";
  } else {
    document.getElementById("evoTab").className = "activeTab";
  }
}

function showMainTab() {
  let pokemon = currentPokemon[currentDialogIndex];
  let abilitiesText = getAbilityText(pokemon);
  document.getElementById("dialogTabContent").innerHTML = mainTabTemplate(pokemon, abilitiesText);
}

function showStatsTab() {
  let pokemon = currentPokemon[currentDialogIndex];
  let statsHtml = getStatsHtml(pokemon);
  document.getElementById("dialogTabContent").innerHTML = statsTemplate(statsHtml);
}

function getAbilityText(pokemon) {
  let abilities = "";
  for (let i = 0; i < pokemon.abilities.length; i++) {
    if (i > 0) {
      abilities += ", ";
    }
    abilities += pokemon.abilities[i].ability.name;
  }
  return abilities;
}

function getStatsHtml(pokemon) {
  let html = "";
  for (let i = 0; i < pokemon.stats.length; i++) {
    let stat = pokemon.stats[i];
    let width = stat.base_stat;
    if (width > 100) {
      width = 100;
    }
    html += statTemplate(stat.stat.name, stat.base_stat, width);
  }
  return html;
}

//#endregion

//#region Evolution Tab

/* Loads the evolution when the tab is opened */
async function showEvolutionTab() {
  let pokemon = currentPokemon[currentDialogIndex];
  showEvolutionLoading();
  try {
    let evolution = await getEvolution(pokemon);
    renderEvolution(evolution);
  } catch (error) {
    showEvolutionError();
  }
}

function showEvolutionLoading() {
  document.getElementById("dialogTabContent").innerHTML = /*html*/ `
    <p class="tabMessage">Loading evolution...</p>
  `;
}

function renderEvolution(evolution) {
  let html = "";
  for (let i = 0; i < evolution.length; i++) {
    html += evolutionTemplate(evolution[i]);
    if (i < evolution.length - 1) {
      html += /*html*/ `<span class="evolutionArrow">&raquo;</span>`;
    }
  }
  document.getElementById("dialogTabContent").innerHTML =
    /*html*/ `<div class="evolution">${html}</div>`;
}

function showEvolutionError() {
  document.getElementById("dialogTabContent").innerHTML = /*html*/ `
    <p class="tabMessage">Evolution could not be loaded.</p>
  `;
}

//#endregion

//#region Dialog Navigation

function showPreviousPokemon() {
  currentDialogIndex--;
  if (currentDialogIndex < 0) {
    currentDialogIndex = currentPokemon.length - 1;
  }
  currentDialogTab = "main";
  renderDialog();
}

function showNextPokemon() {
  currentDialogIndex++;
  if (currentDialogIndex == currentPokemon.length) {
    currentDialogIndex = 0;
  }
  currentDialogTab = "main";
  renderDialog();
}

//#endregion

//#region Dialog Closing

function closeDialog() {
  document.getElementById("pokemonDialog").close();
}

function unlockPage() {
  document.body.style.overflow = "auto";
}

function closeDialogOutside(event) {
  if (event.target.id == "pokemonDialog") {
    closeDialog();
  }
}

//#endregion

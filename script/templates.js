//#region Pokemon Card Templates

/* HTML for one Pokemon card */
function pokemonCardTemplate(pokemon, index, type, typeIconsHtml) {
  return /*html*/ `
    <button class="pokemonCard ${type}" data-id="card" onclick="openDialog(${index})">
      ${cardHeaderTemplate(pokemon)}
      <img class="pokemonImage" data-id="card-image" src="${getImage(pokemon)}" alt="${pokemon.name}">
      <div class="types">${typeIconsHtml}</div>
    </button>
  `;
}

function cardHeaderTemplate(pokemon) {
  return /*html*/ `
    <div class="cardHeader">
      <span>#${pokemon.id}</span>
      <h2>${pokemon.name}</h2>
    </div>
  `;
}

function typeTemplate(type) {
  return /*html*/ `
    <span class="typeIcon ${type}" title="${type}">
      <img src="assets/icons/types/${type}.svg" alt="${type}">
    </span>
  `;
}

//#endregion

//#region Dialog Base Templates

/* HTML for the detail  */
function dialogTemplate(pokemon, type, typeIconsHtml) {
  return /*html*/ `
    <div class="${type}" data-id="overlay-pokemon-name">
      ${dialogHeaderTemplate(pokemon)}
      ${dialogImageTemplate(pokemon, typeIconsHtml)}
      ${dialogTabsTemplate()}
      <div id="dialogTabContent"></div>
      ${dialogNavigationTemplate()}
    </div>
  `;
}

function dialogHeaderTemplate(pokemon) {
  return /*html*/ `
    <div class="dialogHeader">
      <h2>#${pokemon.id} ${pokemon.name}</h2>
      <button class="closeButton" data-id="close-dialog-button" onclick="closeDialog()">&times;</button>
    </div>
  `;
}

function dialogImageTemplate(pokemon, typeIconsHtml) {
  return /*html*/ `
    <div class="dialogImageBox">
      <img class="dialogImage" data-id="dialog-image" src="${getImage(pokemon)}" alt="${pokemon.name}">
    </div>
    <div class="types dialogTypes">${typeIconsHtml}</div>
  `;
}

function dialogTabsTemplate() {
  return /*html*/ `
    <div class="dialogTabs">
      <button id="mainTab" onclick="showDialogTab('main')">main</button>
      <button id="statsTab" onclick="showDialogTab('stats')">stats</button>
      <button id="evoTab" onclick="showDialogTab('evo')">evo chain</button>
    </div>
  `;
}

//#endregion

//#region Dialog Content Templates

function mainTabTemplate(pokemon, abilitiesText) {
  return /*html*/ `
    <div class="mainInfo">
      <p><span>Height</span><strong>${pokemon.height / 10} m</strong></p>
      <p><span>Weight</span><strong>${pokemon.weight / 10} kg</strong></p>
      <p><span>Abilities</span><strong>${abilitiesText}</strong></p>
    </div>
  `;
}

function statsTemplate(statsHtml) {
  return /*html*/ `
    <div class="stats">${statsHtml}</div>
  `;
}

function statTemplate(statName, statValue, width) {
  return /*html*/ `
    <div class="stat">
      <span>${statName}</span>
      <div class="statBar"><div style="width: ${width}%"></div></div>
      <strong>${statValue}</strong>
    </div>
  `;
}

function evolutionTemplate(pokemon) {
  return /*html*/ `
    <div class="evolutionPokemon">
      <img src="${getImage(pokemon)}" alt="${pokemon.name}">
      <span>${pokemon.name}</span>
    </div>
  `;
}

//#endregion

//#region Dialog Navigation Template

function dialogNavigationTemplate() {
  return /*html*/ `
    <div class="dialogNavigation">
      <button data-id="prev-button" onclick="showPreviousPokemon()">&larr; Previous</button>
      <button data-id="next-button" onclick="showNextPokemon()">Next &rarr;</button>
    </div>
  `;
}

//#endregion

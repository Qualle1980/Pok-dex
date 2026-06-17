//#region Pokemon Card Templates


/* HTML for one Pokemon card */
function pokemonCardTemplate(pokemon, index) {
  let type = pokemon.types[0].type.name;
  return /*html*/ `
    <button class="pokemonCard ${type}" data-id="card" onclick="openDialog(${index})">
      ${cardHeaderTemplate(pokemon)}
      <img class="pokemonImage" data-id="card-image" src="${getImage(pokemon)}" alt="${pokemon.name}">
      <div class="types">${typeTemplate(pokemon)}</div>
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


function typeTemplate(pokemon) {
  let html = "";
  for (let i = 0; i < pokemon.types.length; i++) {
    let type = pokemon.types[i].type.name;
    html += /*html*/ `<span class="typeIcon ${type}" title="${type}">
      <img src="assets/icons/types/${type}.svg" alt="${type}">
    </span>`;
  }
  return html;
}


//#endregion

//#region Dialog Base Templates

/* HTML for the detail  */
function dialogTemplate(pokemon) {
  let type = pokemon.types[0].type.name;
  return /*html*/ `
    <div class="${type}" data-id="overlay-pokemon-name">
      ${dialogHeaderTemplate(pokemon)}
      ${dialogImageTemplate(pokemon)}
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
      <button class="closeButton" data-id="close-dialog-button" onclick="closeDialog()">×</button>
    </div>
  `;
}


function dialogImageTemplate(pokemon) {
  return /*html*/ `
    <div class="dialogImageBox">
      <img class="dialogImage" data-id="dialog-image" src="${getImage(pokemon)}" alt="${pokemon.name}">
    </div>
    <div class="types dialogTypes">${typeTemplate(pokemon)}</div>
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

function mainTabTemplate(pokemon) {
  return /*html*/ `
    <div class="mainInfo">
      <p><span>Height</span><strong>${pokemon.height / 10} m</strong></p>
      <p><span>Weight</span><strong>${pokemon.weight / 10} kg</strong></p>
      <p><span>Abilities</span><strong>${abilityTemplate(pokemon)}</strong></p>
    </div>
  `;
}


function abilityTemplate(pokemon) {
  let abilities = "";
  for (let i = 0; i < pokemon.abilities.length; i++) {
    if (i > 0) {
      abilities += ", ";
    }
    abilities += pokemon.abilities[i].ability.name;
  }
  return abilities;
}


function statsTemplate(pokemon) {
  let html = "";
  for (let i = 0; i < pokemon.stats.length; i++) {
    html += statTemplate(pokemon.stats[i]);
  }
  return html;
}


function statTemplate(stat) {
  let width = stat.base_stat;
  if (width > 100) {
    width = 100;
  }
  return /*html*/ `
    <div class="stat">
      <span>${stat.stat.name}</span>
      <div class="statBar"><div style="width: ${width}%"></div></div>
      <strong>${stat.base_stat}</strong>
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
      <button data-id="prev-button" onclick="showPreviousPokemon()">← Previous</button>
      <button data-id="next-button" onclick="showNextPokemon()">Next →</button>
    </div>
  `;
}


//#endregion

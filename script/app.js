async function init() {
  await loadPokemon();
}

/* Loads and shows the Pokemon. */
async function loadPokemon() {
  showLoadingSpinner();
  disableLoadButton(true);
  try {
    await fetchPokemon();
    currentPokemon = allPokemon;
    renderPokemon();
  } catch (error) {
    showError();
  }
  hideLoadingSpinner();
  disableLoadButton(false);
}

/* Shows all loaded Pokemon cards. */
function renderPokemon() {
  let content = document.getElementById("pokemonContent");
  content.innerHTML = "";
  for (let i = 0; i < currentPokemon.length; i++) {
    content.innerHTML += pokemonCardTemplate(currentPokemon[i], i);
  }
}

function getImage(pokemon) {
  let image = pokemon.sprites.other["official-artwork"].front_default;
  if (image == null) {
    image = pokemon.sprites.front_default;
  }
  return image;
}




async function loadMorePokemon() {
  await loadPokemon();
}



function showLoadingSpinner() {
  document.getElementById("loadingScreen").style.display = "flex";
}




function hideLoadingSpinner() {
  document.getElementById("loadingScreen").style.display = "none";
}



function disableLoadButton(disabled) {
  document.getElementById("loadMoreButton").disabled = disabled;
}



function showError() {
  document.getElementById("pokemonContent").innerHTML = `
    <p class="notFound">Pokémon could not be loaded.</p>
  `;
}

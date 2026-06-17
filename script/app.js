async function init() {
  resetSearchState();
  await loadPokemon();
}

/* Loads and shows the Pokemon */
async function loadPokemon(loadMore = false) {
  showLoadingSpinner();
  disableLoadButton(true);
  try {
    let startIndex = allPokemon.length;
    await fetchPokemon();
    currentPokemon = allPokemon;
    if (loadMore) {
      renderMorePokemon(startIndex);
    } else {
      renderPokemon();
    }
  } catch (error) {
    showError();
  }
  hideLoadingSpinner();
  disableLoadButton(false);
}

/* Shows all loaded Pokemon card */
function renderPokemon() {
  let content = document.getElementById("pokemonContent");
  content.innerHTML = "";
  for (let i = 0; i < currentPokemon.length; i++) {
    content.innerHTML += pokemonCardTemplate(currentPokemon[i], i);
  }
}

/* Shows only the new loaded Pokemon cards */
function renderMorePokemon(startIndex) {
  let content = document.getElementById("pokemonContent");
  for (let i = startIndex; i < currentPokemon.length; i++) {
    content.insertAdjacentHTML("beforeend", pokemonCardTemplate(currentPokemon[i], i));
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
  await loadPokemon(true);
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
  document.getElementById("pokemonContent").innerHTML = /*html*/ `
    <p class="notFound">Pokémon could not be loaded.</p>
  `;
}

function checkSearch() {
  let searchWord = document.getElementById("searchInput").value;
  document.getElementById("searchButton").disabled = searchWord.length < 3;
  if (searchWord.length == 0) {
    currentPokemon = allPokemon;
    renderPokemon();
  }
}

function searchWithEnter(event) {
  let searchWord = document.getElementById("searchInput").value;
  if (event.key == "Enter" && searchWord.length >= 3) {
    searchPokemon();
  }
}

/* Filters Pokemon by name. */
function searchPokemon() {
  let searchWord = document.getElementById("searchInput").value.toLowerCase();
  currentPokemon = allPokemon.filter(function (pokemon) {
    return pokemon.name.includes(searchWord);
  });
  renderSearchResult();
}

function renderSearchResult() {
  if (currentPokemon.length == 0) {
    showNotFound();
  } else {
    renderPokemon();
  }
}

function showNotFound() {
  document.getElementById("pokemonContent").innerHTML = `
    <p class="notFound" data-id="not-found">No Pokémon found.</p>
  `;
}

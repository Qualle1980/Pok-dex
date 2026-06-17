function checkSearch() {
  let searchWord = document.getElementById("searchInput").value.trim();
  updateSearchUi(searchWord);
  if (searchWord.length == 0) {
    if (document.getElementById("notFoundDialog").open) {
      closeNotFoundDialog();
    }
    currentPokemon = allPokemon;
    renderPokemon();
  } else if (searchWord.length >= 3) {
    searchPokemon();
  }
}


function searchWithEnter(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    searchPokemon();
  }
}


/* Filter Pokemon by name */
function searchPokemon() {
  let searchWord = document.getElementById("searchInput").value.trim().toLowerCase();
  updateSearchUi(searchWord);
  if (document.getElementById("notFoundDialog").open) {
    closeNotFoundDialog();
  }
  if (searchWord.length < 3) {
    return;
  }
  currentPokemon = allPokemon.filter(function (pokemon) {
    return pokemon.name.includes(searchWord);
  });
  renderSearchResult();
}


function clearSearch() {
  resetSearchState();
}


function updateSearchUi(searchWord) {
  document.getElementById("searchButton").disabled = searchWord.length < 3;
  document.getElementById("clearSearchButton").hidden = searchWord.length == 0;
  document.getElementById("searchHint").hidden = searchWord.length == 0 || searchWord.length >= 3;
  setLoadMoreVisibility(searchWord.length == 0);
}


function setLoadMoreVisibility(show) {
  let button = document.getElementById("loadMoreButton");
  if (show) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}


function resetSearchState() {
  document.getElementById("searchInput").value = "";
  currentPokemon = allPokemon;
  updateSearchUi("");
  if (allPokemon.length > 0) {
    renderPokemon();
  }
  if (document.getElementById("notFoundDialog").open) {
    closeNotFoundDialog();
  }
}


function renderSearchResult() {
  if (currentPokemon.length == 0) {
    showNotFound();
  } else {
    renderPokemon();
  }
}


function showNotFound() {
  document.getElementById("pokemonContent").style.display = "none";
  document.getElementById("notFoundDialog").show();
  document.body.style.overflow = "hidden";
}


function closeNotFoundDialog() {
  document.getElementById("notFoundDialog").close();
}


function resetNotFoundDialog() {
  document.getElementById("pokemonContent").style.display = "flex";
  if (currentPokemon.length == 0) {
    currentPokemon = allPokemon;
    renderPokemon();
  }
  updateSearchUi(document.getElementById("searchInput").value.trim());
  unlockPage();
}

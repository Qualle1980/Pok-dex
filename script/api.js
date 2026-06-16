/* Load Pokemon from API */
async function fetchPokemon() {
  let lastPokemonId = nextPokemonId + pokemonAmount;
  for (let id = nextPokemonId; id < lastPokemonId; id++) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let pokemon = await response.json();
    allPokemon.push(pokemon);
  }
  nextPokemonId = lastPokemonId;
}

async function fetchJson(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}


/* Load the evolution chain and saves it */
async function getEvolution(pokemon) {
  if (evolutionCache[pokemon.name]) {
    return evolutionCache[pokemon.name];
  }
  let species = await fetchJson(pokemon.species.url);
  let evolutionData = await fetchJson(species.evolution_chain.url);
  let evolution = await buildEvolution(evolutionData.chain);
  evolutionCache[pokemon.name] = evolution;
  return evolution;
}


async function buildEvolution(chain) {
  let evolution = [];
  let currentStep = chain;
  if (currentStep) {
    evolution.push(await getEvolutionPokemon(currentStep.species.name));
    currentStep = currentStep.evolves_to[0];
  }
  if (currentStep) {
    evolution.push(await getEvolutionPokemon(currentStep.species.name));
    currentStep = currentStep.evolves_to[0];
  }
  if (currentStep) {
    evolution.push(await getEvolutionPokemon(currentStep.species.name));
    currentStep = currentStep.evolves_to[0];
  }
  return evolution;
}


async function getEvolutionPokemon(name) {
  let cachedPokemon = findLoadedPokemon(name);
  if (cachedPokemon) {
    return cachedPokemon;
  }
  return await fetchJson("https://pokeapi.co/api/v2/pokemon/" + name);
}

function findLoadedPokemon(name) {
  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i].name == name) {
      return allPokemon[i];
    }
  }
}

import { getFromLocalStorage, POKEMONS_CACHE_KEY } from '../lib';

export function toCardData(pokemon) {
  const {
    id,
    name,
    height,
    weight,
    sprites: {
      other: {
        ['official-artwork']: { front_default: oa } = {},
        home: { front_default: home } = {},
      } = {},
      front_default: fallback,
    } = {},
    types = [],
    stats = [],
  } = pokemon;

  return {
    id,
    name,
    image: oa ?? home ?? fallback ?? '',
    height,
    weight,
    types: types.map((t) => t?.type?.name).filter(Boolean),
    stats: stats.map((s) => ({ name: s?.stat?.name, value: s?.base_stat })),
  };
}

// Searchbar
// check and return Pokemon or No Result message from local storage
export function searchPokemon(searchTerm) {
  const cachedPokemonAll = getFromLocalStorage(POKEMONS_CACHE_KEY);

  for (let i = 0; i < cachedPokemonAll.length; i++) {
    if (cachedPokemonAll[i]['id'] == searchTerm) {
      return cachedPokemonAll[i];
    }
  }

  for (let i = 0; i < cachedPokemonAll.length; i++) {
    if (cachedPokemonAll[i]['name'] == searchTerm) {
      return cachedPokemonAll[i];
    }
  }

  return `No result for: ${searchTerm}`;
}

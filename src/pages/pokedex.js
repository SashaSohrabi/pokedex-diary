import { getFromLocalStorage, FAVORITES_KEY, renderUI } from '../lib';

import PokemonCard from '../components/PokemonCard.js';

const cardOptions = { catchBtn: false, favoriteBtn: false };

const favs = getFromLocalStorage(FAVORITES_KEY);

const favCards = favs.map((p) => PokemonCard(p, { ...cardOptions }));

if (favs.length) {
  renderUI('#pokedex-container', favCards, 'set');
} else {
  renderUI('#pokedex-container', '<h1> There is no favorite pokemone! </h1>', 'replace');
}

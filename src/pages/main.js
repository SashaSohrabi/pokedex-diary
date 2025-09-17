import {
  fetchPokemons,
  BASE_URL,
  toCardData,
  renderUI,
  attachRootEvents,
  saveToLocalStorage,
  POKEMONS_CACHE_KEY,
  getFromLocalStorage,
  FAVORITES_KEY,
} from '../lib';
import PokemonCard from '../components/PokemonCard.js';

const root = document.querySelector('#app-root');

// Fetch Pokémon and render cards
const pokemons = await fetchPokemons(BASE_URL, 20);

const multiple = true; // Attach multiple elements to DOM
const cardOptions = { catchBtn: true, favoriteBtn: true };

// Attach events
attachRootEvents(root);

// Save cards in local storage
const cardsData = pokemons.map(toCardData);
saveToLocalStorage(POKEMONS_CACHE_KEY, cardsData);

// Render cards into the container with favorite state
const favorites = getFromLocalStorage(FAVORITES_KEY);
const favSet = new Set(favorites.map((f) => f?.id));
const cards = cardsData.map((p) =>
  PokemonCard(p, { ...cardOptions, favorite: favSet.has(p.id) })
);
cards.forEach((card) => renderUI('#pokedex-container', card, { multiple }));

import {
  fetchPokemons,
  BASE_URL,
  toCardData,
  renderUI,
  renderPokedexWithCurrentFavorites,
  attachRootEvents,
  getFromLocalStorage,
  saveToLocalStorage,
  POKEMONS_CACHE_KEY,
  FAVORITES_KEY,
  searchPokemon,
  renderNotes,
  NOTE_KEY,
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

// Initial render
renderPokedexWithCurrentFavorites(cardOptions);

// SearchBar Actions
const searchButtonEl = document.getElementById('search-button');
const pokedexContainerEl = document.getElementById('pokedex-container');
const searchInputEl = document.getElementById('search-input');
const dialogEl = document.createElement('dialog');
dialogEl.id = 'search-dialog';
dialogEl.classList.add(
  'w-fit',
  'h-fit',
  'fixed',
  'mx-auto',
  'flex',
  'mt-[100px]',
  'bg-white',
  'rounded-xl',
  'border-black',
  'border-1'
);

// Search Button Click Event
searchButtonEl.addEventListener('click', (event) => {
  event.preventDefault();
  // console.log(event.target.closest('[data-id]'));
  let searchRes = searchPokemon(searchInputEl.value.toLowerCase());

  const latestFavorites = getFromLocalStorage(FAVORITES_KEY);
  const isFavorite = latestFavorites.some((f) => f && f.id === searchRes?.id);

  pokedexContainerEl.appendChild(dialogEl);
  if (searchInputEl.value !== '' && typeof searchRes == 'object') {
    const pokeCard = PokemonCard(searchRes, {
      ...cardOptions,
      favorite: isFavorite,
      note: renderNotes(searchRes),
    });

    const id = Number(pokeCard?.dataset?.id);
    renderUI('#search-dialog', pokeCard, 'append');
    // console.log(pokeCard);
  } else {
    const noRes = document.createElement('p');
    noRes.textContent = `No Result for: ${searchInputEl.value}`;
    noRes.classList.add('text-center', 'font-semibold', 'p-5');
    dialogEl.appendChild(noRes);
  }
  dialogEl.showModal();
});

// Close Dialog on Keypress: Enter for Input
searchInputEl.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchButtonEl.click();
  }
});

// Remove all children from Dialog and remove Dialog from pokedexContainer on closing
dialogEl.addEventListener('close', function (event) {
  dialogEl.replaceChildren();
  pokedexContainerEl.removeChild(dialogEl);
  searchInputEl.value = '';
  renderPokedexWithCurrentFavorites(cardOptions);
  searchInputEl.focus();
});

dialogEl.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.id === dialogEl.id) {
    dialogEl.close();
  } else {
    const noteArray = getFromLocalStorage(NOTE_KEY);
    const noteEl = document.getElementById('noteTextArea');
    const saveNoteButtonEl = document.getElementById('saveNoteButton');
    if (event.target === saveNoteButtonEl) {
      console.log(event.target);

      noteArray.push({ id: dialogEl.pokeCard.p.id, note: noteEl.value });
      console.log(noteArray);

      saveToLocalStorage(NOTE_KEY, noteArray);
      dialogEl.close();
    }
  }
});

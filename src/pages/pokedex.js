console.log('pokedex.js');
import { getFromLocalStorage } from '../lib/storage.js';
import { CAUGHT_KEY, FAVORITES_KEY } from '../lib/constants.js';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  loadCaughtPokemon();
  loadFavoritePokemon();

  // Listen for favorite events
  window.addEventListener('pokemonFavorited', function () {
    loadFavoritePokemon();
  });

  // Listen for storage changes
  window.addEventListener('storage', function (e) {
    if (e.key === CAUGHT_KEY) {
      loadCaughtPokemon();
    }
    if (e.key === FAVORITES_KEY) {
      loadFavoritePokemon();
    }
  });

  // Listen for custom events
  window.addEventListener('pokemonCaught', function () {
    loadCaughtPokemon();
  });
});

/**
 * Load and display caught Pokemon from localStorage
 */
function loadCaughtPokemon() {
  const caughtPokemon = getFromLocalStorage(CAUGHT_KEY);
  const displayArea = document.getElementById('pokemon-display-area');

  if (!displayArea) return;

  if (caughtPokemon.length === 0) {
    displayArea.innerHTML = `
      <div class="text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold mb-2 text-slate-600">No Pokémon Caught Yet</h3>
        <p class="text-slate-500">Start catching Pokémon to see them here!</p>
        <a href="/" class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          Go Catch Some Pokémon
        </a>
      </div>
    `;
    return;
  }

  // Create grid layout for caught Pokemon
  const pokemonGrid = caughtPokemon.map((pokemon) => createPokemonDisplayCard(pokemon)).join('');

  displayArea.innerHTML = `
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-slate-700">
        Caught Pokémon (${caughtPokemon.length})
      </h3>
      <button onclick="clearAllCaughtPokemon()" class="text-sm text-red-600 hover:text-red-700 px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50 transition-all">
        Clear All
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${pokemonGrid}
    </div>
  `;
}

/**
 * Load and display favorite Pokemon from localStorage
 */
function loadFavoritePokemon() {
  const favorites = getFromLocalStorage(FAVORITES_KEY);
  const container = document.getElementById('pokedex-container');

  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-500 py-8">No favorite Pokemon yet!</p>';
    return;
  }

  const favoriteCards = favorites.map((pokemon) => createFavoritePokemonCard(pokemon)).join('');
  container.innerHTML = favoriteCards;
}

/**
 * Create display card for caught Pokemon
 */
function createPokemonDisplayCard(pokemon) {
  const typeColors = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    normal: 'bg-gray-400',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-700',
    ghost: 'bg-indigo-700',
    steel: 'bg-gray-500',
    psychic: 'bg-pink-500',
    ice: 'bg-cyan-300',
    dragon: 'bg-indigo-800',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-300',
    fighting: 'bg-red-700',
  };

  const typeBadges = pokemon.types
    ? pokemon.types
        .map(
          (type) =>
            `<span class="px-2 py-1 rounded-full text-xs font-medium text-white ${typeColors[type] || 'bg-gray-400'}">${type}</span>`
        )
        .join(' ')
    : '';

  return `
    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 pokemon-card" data-pokemon-id="${pokemon.id}">
      <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <img 
          src="${pokemon.image}" 
          alt="${pokemon.name}" 
          class="w-full h-32 object-contain"
          loading="lazy"
        />
        <div class="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-bold text-gray-600">
          #${pokemon.id.toString().padStart(3, '0')}
        </div>
      </div>
      <div class="p-4">
        <h4 class="text-lg font-bold capitalize mb-2 text-gray-800">${pokemon.name}</h4>
        ${typeBadges ? `<div class="flex flex-wrap gap-1 mb-3">${typeBadges}</div>` : ''}
        ${
          pokemon.height && pokemon.weight
            ? `
            <div class="text-sm text-gray-600 mb-3">
              <div>Height: ${(pokemon.height / 10).toFixed(1)}m</div>
              <div>Weight: ${(pokemon.weight / 10).toFixed(1)}kg</div>
            </div>
          `
            : ''
        }
        <div class="flex gap-2">
          <button onclick="releasePokemon(${pokemon.id})" class="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-all">
            Remove
          </button>
          <button onclick="viewPokemonDetails(${pokemon.id})" class="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all">
            Details
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create display card for favorite Pokemon
 */
function createFavoritePokemonCard(pokemon) {
  const typeColors = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-400',
    normal: 'bg-gray-400',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-700',
    ghost: 'bg-indigo-700',
    steel: 'bg-gray-500',
    psychic: 'bg-pink-500',
    ice: 'bg-cyan-300',
    dragon: 'bg-indigo-800',
    dark: 'bg-gray-800',
    fairy: 'bg-pink-300',
    fighting: 'bg-red-700',
  };

  const typeBadges = pokemon.types
    ? pokemon.types
        .map(
          (type) =>
            `<span class="px-2 py-1 rounded-full text-xs font-medium text-white ${typeColors[type] || 'bg-gray-400'}">${type}</span>`
        )
        .join(' ')
    : '';

  return `
    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 pokemon-card" data-pokemon-id="${pokemon.id}">
      <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <img 
          src="${pokemon.image}" 
          alt="${pokemon.name}" 
          class="w-full h-32 object-contain"
          loading="lazy"
        />
        <div class="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-bold text-gray-600">
          #${pokemon.id.toString().padStart(3, '0')}
        </div>
      </div>
      <div class="p-4">
        <h4 class="text-lg font-bold capitalize mb-2 text-gray-800">${pokemon.name}</h4>
        ${typeBadges ? `<div class="flex flex-wrap gap-1 mb-3">${typeBadges}</div>` : ''}
        ${
          pokemon.height && pokemon.weight
            ? `
          <div class="text-sm text-gray-600 mb-3">
            <div>Height: ${(pokemon.height / 10).toFixed(1)}m</div>
            <div>Weight: ${(pokemon.weight / 10).toFixed(1)}kg</div>
          </div>
        `
            : ''
        }
        <div class="flex gap-2">
          <button onclick="removeFavorite(${pokemon.id})" class="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-all">
            Remove
          </button>
          <button onclick="viewFavoritePokemonDetails(${pokemon.id})" class="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all">
            Details
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Release a specific Pokemon from caught list
 */
window.releasePokemon = function (pokemonId) {
  const caughtPokemon = getFromLocalStorage(CAUGHT_KEY);
  const updatedPokemon = caughtPokemon.filter((p) => p.id !== pokemonId);

  localStorage.setItem(CAUGHT_KEY, JSON.stringify(updatedPokemon));
  loadCaughtPokemon();

  showMessage('Pokémon released successfully!', 'success');
};

/**
 * Remove Pokemon from favorites
 */
window.removeFavorite = function (pokemonId) {
  const favorites = getFromLocalStorage(FAVORITES_KEY);
  const updatedFavorites = favorites.filter((p) => p.id !== pokemonId);

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  loadFavoritePokemon();

  // Dispatch event to update other pages
  window.dispatchEvent(
    new CustomEvent('pokemonFavorited', {
      detail: { id: pokemonId, isFavorite: false },
    })
  );

  window.dispatchEvent(
    new StorageEvent('storage', {
      key: FAVORITES_KEY,
      newValue: JSON.stringify(updatedFavorites),
      storageArea: localStorage,
    })
  );

  showMessage('Pokémon removed from favorites!', 'info');
};

/**
 * Clear all caught Pokemon
 */
window.clearAllCaughtPokemon = function () {
  if (confirm('Are you sure you want to release all your Pokémon?')) {
    localStorage.setItem(CAUGHT_KEY, JSON.stringify([]));
    loadCaughtPokemon();
    showMessage('All Pokémon released!', 'info');
  }
};

/**
 * View caught Pokemon details
 */
window.viewPokemonDetails = function (pokemonId) {
  const caughtPokemon = getFromLocalStorage(CAUGHT_KEY);
  const pokemon = caughtPokemon.find((p) => p.id === pokemonId);

  if (pokemon) {
    alert(
      `${pokemon.name} Details:\nID: ${pokemon.id}\nTypes: ${pokemon.types ? pokemon.types.join(', ') : 'Unknown'}\nHeight: ${pokemon.height ? (pokemon.height / 10).toFixed(1) + 'm' : 'Unknown'}\nWeight: ${pokemon.weight ? (pokemon.weight / 10).toFixed(1) + 'kg' : 'Unknown'}`
    );
  }
};

/**
 * View favorite Pokemon details
 */
window.viewFavoritePokemonDetails = function (pokemonId) {
  const favorites = getFromLocalStorage(FAVORITES_KEY);
  const pokemon = favorites.find((p) => p.id === pokemonId);

  if (pokemon) {
    alert(
      `${pokemon.name} Details:\nID: ${pokemon.id}\nTypes: ${pokemon.types ? pokemon.types.join(', ') : 'Unknown'}\nHeight: ${pokemon.height ? (pokemon.height / 10).toFixed(1) + 'm' : 'Unknown'}\nWeight: ${pokemon.weight ? (pokemon.weight / 10).toFixed(1) + 'kg' : 'Unknown'}`
    );
  }
};

/**
 * Show message to user
 */
function showMessage(message, type = 'info') {
  const messageEl = document.createElement('div');
  messageEl.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform translate-x-full transition-transform duration-300 ${
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  }`;
  messageEl.textContent = message;

  document.body.appendChild(messageEl);

  setTimeout(() => {
    messageEl.style.transform = 'translateX(0)';
  }, 100);

  setTimeout(() => {
    messageEl.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(messageEl)) {
        document.body.removeChild(messageEl);
      }
    }, 300);
  }, 3000);
}

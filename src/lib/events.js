import { saveToLocalStorage, getFromLocalStorage, POKEMONS_CACHE_KEY, CAUGHT_KEY, FAVORITES_KEY } from './';
import Toastify from 'toastify-js';

// Handlers for delegated actions
const onCatch = (id, card) => {
  const cardsData = getFromLocalStorage(POKEMONS_CACHE_KEY);
  const [caughtCard] = cardsData.filter((card) => card.id === id);
  const storedCaughtCards = getFromLocalStorage(CAUGHT_KEY);
  const isAlreadyStored = storedCaughtCards.length && storedCaughtCards?.some((card) => card?.id === caughtCard.id);
  
  if (isAlreadyStored) {
    Toastify({
      text: `${caughtCard.name} is already in local storage`,
      className: 'toast-abs',
      duration: 2000,
      gravity: 'bottom',
    }).showToast();
    return;
  } else {
    saveToLocalStorage(CAUGHT_KEY, [...storedCaughtCards, caughtCard]);
    Toastify({
      text: `${caughtCard.name} has been added to local storage`,
      className: 'toast-abs',
      duration: 2000,
      gravity: 'bottom',
    }).showToast();
  }
};

const onFavorite = (id, card) => {
  const favorites = getFromLocalStorage(FAVORITES_KEY);
  const isFav = favorites.some((f) => f && f.id === id);

  const all = getFromLocalStorage(POKEMONS_CACHE_KEY);
  const item = all.find((p) => p && p.id === id);
  if (!item && !isFav) return; // nothing to add

  // Toggle favorites
  const next = isFav
    ? favorites.filter((f) => f && f.id !== id)
    : [...favorites, item].filter(Boolean);

  saveToLocalStorage(FAVORITES_KEY, next);

  // Update the heart UI
  const heart = card.querySelector('[data-action="favorite"]');
  if (heart) {
    const nowFav = !isFav;
    heart.setAttribute('aria-pressed', String(nowFav));
    heart.textContent = nowFav ? '❤️' : '🤍';
  }
};

export function attachRootEvents(root) {
  if (!root) return;

  const clickHandler = (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const card = btn.closest('[data-id]');
    const id = Number(card?.dataset?.id);
    const action = btn.dataset.action;
    if (action === 'catch') onCatch(id, card);
    else if (action === 'favorite') onFavorite(id, card);
  };

  root.addEventListener('click', clickHandler);
}

export function detachRootEvents(root) {
  root.removeEventListener('click', clickHandler);
}

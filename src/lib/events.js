// Handlers for delegated actions
const onCatch = (id, card) => {
  console.log('catch', { id, card });
};
const onRemove = (id, card) => {
  console.log('remove', { id, card });
};
const onFavorite = (id, card) => {
  console.log('favorite', { id, card });
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
    else if (action === 'remove') onRemove(id, card);
    else if (action === 'favorite') onFavorite(id, card);
  };

  root.addEventListener('click', clickHandler);
}

export function detachRootEvents(root) {
  root.removeEventListener('click', clickHandler);
}

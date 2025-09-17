const PokemonCard = (
  p,
  { catchBtn = false, favoriteBtn = false, note = null } = {}
) => `
  <div class="card border rounded-xl p-3" data-id="${p.id}">
    <img src="${p.image}" alt="${p.name}" class="w-40 h-40 object-contain mx-auto mb-2">
    <h3 class="capitalize font-semibold mb-1">${p.name}</h3>
    ${p.types?.length ? `<p class="text-sm text-gray-600 mb-2">Types: ${p.types.join(', ')}</p>` : ''}
    <div class="flex gap-2 flex-wrap">
      ${catchBtn ? `<button data-action="catch" class="px-3 py-1 rounded bg-emerald-600 text-white">Catch</button>` : ''}
      ${favoriteBtn ? `<button data-action="favorite" class="px-3 py-1 rounded border border-rose-300 text-rose-600 hover:bg-rose-50" title="Add to favorites" aria-label="Add to favorites">❤ Favorite</button>` : ''}
    </div>
    ${
      note !== null
        ? `
      <div class="mt-3">
        <label class="text-xs text-gray-600">Note</label>
        <textarea rows="2" data-note class="w-full border rounded p-2 text-sm">${note}</textarea>
      </div>`
        : ''
    }
  </div>
`;

export default PokemonCard;

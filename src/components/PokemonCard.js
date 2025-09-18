const PokemonCard = (
  p,
  { catchBtn = false, favoriteBtn = false, favorite = false, note = null } = {}
) => `
  <article class="card border rounded-xl p-3" data-id="${p.id}">
    <img src="${p.image}" alt="${p.name}" class="w-40 h-40 object-contain mx-auto mb-2">
    <h3 class="capitalize font-semibold mb-1">${p.name}</h3>
    ${p.types?.length ? `<p class="text-sm text-gray-600 mb-2">Types: ${p.types.join(', ')}</p>` : ''}
    <div class="flex gap-2 flex-wrap justify-between items-center">
      ${catchBtn ? `<button data-action="catch" type="button" class="px-3 py-1 cursor-pointer rounded bg-emerald-600 text-white">Catch’em!</button>` : ''}
      ${
        favoriteBtn
          ? `<button data-action="favorite" type="button" class="px-2 py-1 select-none cursor-pointer title="${favorite ? 'Remove from favorites' : 'Add to favorites'}" 
      aria-label="${favorite ? 'Remove from favorites' : 'Add to favorites'}" 
      aria-pressed="${favorite}">${favorite ? '❤️' : '🤍'}</button>`
          : ''
      }
    </div>
    ${
      note !== null
        ? `
      <div class="mt-3">
        <label class="text-xs text-gray-600">Note</label>
        <textarea rows="2" id="noteTextArea" data-note class="w-full border rounded p-2 text-sm">${note}</textarea>
        <button id="saveNoteButton" type="button" class="px-3 py-1 my-2 cursor-pointer rounded bg-emerald-600 text-white">Save Note</button>
      </div>`
        : ''
    }
  </article>
`;

export default PokemonCard;

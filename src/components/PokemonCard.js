const PokemonCard = (
  p,
  { catchBtn = false, favoriteBtn = false, favorite = false, note = null } = {}
) => `
  <article  class="card border rounded-xl p-3" data-id="${p.id}">
    <img src="${p.image}" alt="${p.name}" class="w-40 h-40 object-contain mx-auto mb-2">
    <h3 class="capitalize font-semibold mb-1">${p.name}</h3>
    ${p.types?.length ? `<p class="text-sm font-bold text-gray-600 mb-2">Types: ${p.types.join(', ')}</p>` : ''}
    <div class"flex flex-col flex-wrap items-center>
    <div class="mb-1 text-base font-medium text-green-700 dark:text-green-700">HP ${p.stats[0].value}</div>
  <div class="bg-green-600 h-2.5 rounded-full dark:bg-green-500" style="width: ${p.stats[0].value / 2.2}%"></div>
    <div class="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-700">Attack ${p.stats[1].value}</div>
  <div class="bg-yellow-600 h-2.5 rounded-full dark:bg-yellow-500" style="width: ${p.stats[1].value / 2.2}%"></div>
      <div class="mb-1 text-base font-medium text-orange-700 dark:text-orange-700">Defense ${p.stats[3].value}</div>
  <div class="bg-orange-600 h-2.5 rounded-full dark:bg-orange-500" style="width: ${p.stats[3].value / 2.2}%"></div>
    <div class="mb-1 text-base font-medium text-cyan-700 dark:text-cyan-700">Sp. Atk ${p.stats[4].value}</div>
  <div class="bg-cyan-600 h-2.5 rounded-full dark:bg-cyan-500" style="width: ${p.stats[4].value / 2.2}%"></div>
        <div class="mb-1 text-base font-medium text-blue-700 dark:text-blue-700">Sp. Def ${p.stats[5].value}</div>
  <div class="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style="width: ${p.stats[5].value / 2.2}%"></div>
    <div class="mb-1 text-base font-medium text-purple-700 dark:text-purple-700">Speed ${p.stats[4].value}</div>
  <div class="bg-purple-600 h-2.5 rounded-full dark:bg-purple-500" style="width: ${p.stats[4].value / 2.2}%" ></div>
  <div class="h-4"></div>

    </div>
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
        <label class="text-xs text-gray-600 font-semibold">Note</label>
        <textarea rows="2" id="noteTextArea" data-note class="w-full bg-white border rounded p-2 text-sm">${note}</textarea>
        <button id="saveNoteButton" type="button" class="px-3 py-1 my-2 cursor-pointer rounded bg-emerald-600 text-white">Save Note</button>
      </div>`
        : ''
    }
  </article>
`;

export default PokemonCard;

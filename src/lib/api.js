// Fetches all Pokemones
export async function fetchPokemons(url, limit = 20, offset = 0) {
  try {
    const res = await fetch(`${url}/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    const pokemons = await res.json();
    const urls = pokemons?.results.map((pok) => pok.url);
    const requests = urls.length ? urls.map((url) => fetch(url)) : [];

    if (requests) {
      const responses = await Promise.all(requests);
      const details = await Promise.all(
        responses.map(async (r) => {
          if (!r.ok) throw new Error(`Detail fetch failed: ${r.status} ${r.statusText}`);
          return r.json();
        })
      );
      return details;
    }
  } catch (err) {
    throw new Error('Could not fetch Pokémons!', { cause: err });
  }
}

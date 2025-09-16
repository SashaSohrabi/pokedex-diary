export function toCardData(pokemon) {
  const {
    id,
    name,
    height,
    weight,
    sprites: {
      other: {
        ['official-artwork']: { front_default: oa } = {},
        home: { front_default: home } = {},
      } = {},
      front_default: fallback,
    } = {},
    types = [],
    stats = [],
  } = pokemon;

  return {
    id,
    name,
    image: oa ?? home ?? fallback ?? '',
    height,
    weight,
    types: types.map((t) => t?.type?.name).filter(Boolean),
    stats: stats.map((s) => ({ name: s?.stat?.name, value: s?.base_stat })),
  };
}

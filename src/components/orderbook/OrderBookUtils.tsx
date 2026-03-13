
export function cumulative(levels: [number, number][]) {
  let total = 0;

  return levels.map(([price, size]) => {
    const p = Number(price);
    const s = Number(size);

    total += s;

    return {
      price: p,
      size: s,
      total,
    };
  });
}

export async function updateChannelFrequency(channel: string, min: number, max: number) {
  const res = await fetch("http://localhost:3000/intervals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      [channel]: { min, max }
    })
  });

  return res.json();
}
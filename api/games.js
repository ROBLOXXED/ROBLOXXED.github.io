// api/games.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://games.roblox.com/v1/games/list?startRows=0&maxRows=30&sortOrder=1&sortType=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) throw new Error('Roblox API error');

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
}

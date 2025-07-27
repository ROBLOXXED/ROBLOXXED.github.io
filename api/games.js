export default async function handler(req, res) {
  const sortType = req.query.sortType || '1'; // 1 = Most Engaging
  const limit = 10;

  try {
    const response = await fetch(`https://games.roblox.com/v1/games/list?startRows=0&maxRows=${limit}&sortType=${sortType}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Roblox games' });
  }
}

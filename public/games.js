async function loadGames(sortType = '1') {
  const gameList = document.getElementById('gameList');
  gameList.innerHTML = 'Loading games...';

  try {
    const res = await fetch(`/api/games?sortType=${sortType}`);
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      gameList.innerHTML = 'No games found.';
      return;
    }

    gameList.innerHTML = '';

    for (const game of data.data) {
      const gameEl = document.createElement('div');
      gameEl.className = 'game';

      const thumbnail = game.thumbnailUrl || 'https://via.placeholder.com/480x270?text=No+Image';
      const placeId = game.rootPlaceId || game.id;
      const name = game.name || 'Unknown Game';
      const creator = game.creator?.name || 'Unknown Creator';

      gameEl.innerHTML = `
        <img src="${thumbnail}" class="thumbnail">
        <h2>${name}</h2>
        <p>By ${creator}</p>
        <button onclick="location.href='roblox://placeId=${placeId}'">Play</button>
      `;

      gameList.appendChild(gameEl);
    }
  } catch (err) {
    console.error(err);
    gameList.innerHTML = 'Error loading games.';
  }
}

window.addEventListener('DOMContentLoaded', () => loadGames());

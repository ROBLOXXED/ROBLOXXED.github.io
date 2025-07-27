const gameContainer = document.getElementById('gameList');
const searchInput = document.getElementById('searchBar');

// You can change this sortType per page: 1 = popular, 2 = top played, 3 = top earning, 4 = up & coming
const SORT_TYPE = 1; // or set dynamically via query string

async function fetchGames(sortType = SORT_TYPE) {
  try {
    const response = await fetch(`https://games.roblox.com/v1/games/list?sortToken=&startRows=0&maxRows=25&sortType=${sortType}`);
    const data = await response.json();

    if (!data.games || data.games.length === 0) {
      gameContainer.innerHTML = "<p>No games found.</p>";
      return;
    }

    // Clear existing
    gameContainer.innerHTML = '';

    data.games.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.className = 'game';

      const thumbnail = game.thumbnailUrl || `https://www.roblox.com/asset-thumbnail/image?assetId=${game.placeId}&width=480&height=270&format=png`;

      gameCard.innerHTML = `
        <img src="${thumbnail}" class="thumbnail" alt="${game.name}">
        <h2>${game.name}</h2>
        <p>By ${game.creatorName || 'Unknown'}</p>
        <button onclick="location.href='roblox://placeId=${game.placeId}'">Play</button>
      `;

      gameContainer.appendChild(gameCard);
    });
  } catch (err) {
    console.error('Failed to load games:', err);
    gameContainer.innerHTML = "<p>Failed to load games. Please try again later.</p>";
  }
}

function searchGames() {
  const input = searchInput.value.toLowerCase();
  const games = document.querySelectorAll('.game');
  games.forEach(game => {
    const text = game.textContent.toLowerCase();
    game.style.display = text.includes(input) ? 'block' : 'none';
  });
}

searchInput?.addEventListener('input', searchGames);

// Run on load
fetchGames();

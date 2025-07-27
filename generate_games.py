import json
import random

base_id = 1000000000
num_games = 1000

name_keywords = [
    "Adventure", "Simulator", "Tycoon", "Escape", "Quest", "Battle", "Island",
    "City", "Tower", "Run", "Fight", "Survival", "Parkour", "Race", "Defense",
    "Story", "World", "Craft", "Hero", "Magic", "Zoo", "Build", "Maze", "Kingdom"
]

thumbnail_urls = [
    "https://tr.rbxcdn.com/1fbd9d213b40d44d79d9b27529f263b3/480/270/Image/Png",
    "https://tr.rbxcdn.com/e1557d5376477f37fb4c7a4cf6d9e4c4/480/270/Image/Png",
    "https://tr.rbxcdn.com/850f9b3b83ea7d2a6b3dc07e8cf21b59/480/270/Image/Png",
    "https://tr.rbxcdn.com/0dcf765de637ab2a71fdb38b79b8c07e/480/270/Image/Png",
    "https://tr.rbxcdn.com/8b17e02700b5565f8f15890a66fd9e26/480/270/Image/Png",
]

def random_game_name():
    parts = random.sample(name_keywords, k=random.randint(1,3))
    return " ".join(parts)

games = []

for i in range(num_games):
    game = {
        "id": base_id + i,
        "name": random_game_name(),
        "creator": f"User{random.randint(1000,9999)}",
        "thumbnail": random.choice(thumbnail_urls)
    }
    games.append(game)

with open("games.json", "w") as f:
    json.dump(games, f, indent=2)

print("Generated games.json with 1000 games.")

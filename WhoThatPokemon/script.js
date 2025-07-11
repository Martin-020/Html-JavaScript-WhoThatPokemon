const pokemonList = [
  { name: "pikachu", id: 25 },
  { name: "bulbasaur", id: 1 },
  { name: "charmander", id: 4 },
  { name: "squirtle", id: 7 },
  { name: "eevee", id: 133 },
  { name: "jigglypuff", id: 39 },
  { name: "snorlax", id: 143 },
  { name: "meowth", id: 52 },
  { name: "psyduck", id: 54 }
];

let currentPokemon = null;
let score = 0;
let lives = 3;

function getSprite(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function nextPokemon() {
  if (lives <= 0) {
    alert("Game over! Skor kamu: " + score);
    location.reload();
    return;
  }

  document.getElementById("result").innerText = "";
  document.getElementById("guess-input").value = "";

  const randomIndex = Math.floor(Math.random() * pokemonList.length);
  currentPokemon = pokemonList[randomIndex];
  const img = document.getElementById("pokemon-img");
  img.src = getSprite(currentPokemon.id);
  img.style.filter = "brightness(0) saturate(100%)";
}

function checkGuess() {
  const input = document.getElementById("guess-input").value.toLowerCase().trim();
  const result = document.getElementById("result");
  const img = document.getElementById("pokemon-img");

  if (input === currentPokemon.name) {
    score++;
    document.getElementById("score").innerText = score;
    result.innerText = "Benar! Itu " + currentPokemon.name.toUpperCase() + " 🎉";
    result.style.color = "lime";
    img.style.filter = "none";
  } else {
    lives--;
    document.getElementById("lives").innerText = lives;
    result.innerText = "Salah! Coba lagi!";
    result.style.color = "red";

    if (lives <= 0) {
      result.innerText = "Kamu kehabisan nyawa! Game over!";
      setTimeout(() => location.reload(), 2000);
    }
  }
}

nextPokemon();

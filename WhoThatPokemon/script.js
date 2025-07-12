let allPokemon = [];
let currentPokemon = null;
let currentChoices = [];
let score = 0;
let lives = 3;
let timerInterval = null;
let timer = 15;
let difficulty = 'easy';

async function fetchPokemonList() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await res.json();
  allPokemon = data.results.map((poke, index) => ({
    name: poke.name,
    id: index + 1,
    url: poke.url
  }));
}

function startGame(diff) {
  difficulty = diff;
  document.getElementById("difficulty-selection").classList.add("hidden");
  document.getElementById("game-area").classList.remove("hidden");
  score = 0;
  lives = 3;
  nextRound();
}

function nextRound() {
  document.getElementById("result").innerText = "";
  clearInterval(timerInterval);

  timer = difficulty === "easy" ? 20 : difficulty === "medium" ? 15 : 10;
  updateTimerDisplay();

  const index = Math.floor(Math.random() * allPokemon.length);
  currentPokemon = allPokemon[index];

  generateChoices(currentPokemon.name);

  const img = document.getElementById("pokemon-img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`;
  img.style.filter = "brightness(0)";

  // ✅ JANGAN LUPA INI:
  startTimer();
}

function generateChoices(correctName) {
  const choiceCount = 4;
  const choicesSet = new Set();
  choicesSet.add(correctName);

  while (choicesSet.size < choiceCount) {
    const rand = allPokemon[Math.floor(Math.random() * allPokemon.length)];
    choicesSet.add(rand.name);
  }

  currentChoices = Array.from(choicesSet).sort(() => Math.random() - 0.5);
  const container = document.getElementById("choices");
  container.innerHTML = "";
  currentChoices.forEach(name => {
    const btn = document.createElement("button");
    btn.innerText = capitalize(name);
    btn.onclick = () => checkAnswer(name);
    container.appendChild(btn);
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    updateTimerDisplay();
    if (timer <= 0) {
      clearInterval(timerInterval);
      handleWrong("Waktu habis!");
    }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById("timer").innerText = timer;
}

function checkAnswer(selectedName) {
  clearInterval(timerInterval);
  if (selectedName === currentPokemon.name) {
    score++;
    showResult(`Benar! Itu ${capitalize(currentPokemon.name)} 🎉`, "lime");
    revealImage();

    setTimeout(() => {
      nextRound();
    }, 1500);
  } else {
    handleWrong(`Salah! Itu ${capitalize(currentPokemon.name)} 😢`);
  }
}


function handleWrong(msg) {
  lives--;
  showResult(msg, "red");
  revealImage();
  if (lives <= 0) {
    setTimeout(() => {
      alert(`Game Over! Skor kamu: ${score}`);
      location.reload();
    }, 1500);
  } else {
    setTimeout(() => nextRound(), 1500);
  }
}

function revealImage() {
  document.getElementById("pokemon-img").style.filter = "none";
}

function showResult(text, color) {
  const res = document.getElementById("result");
  res.innerText = text;
  res.style.color = color;
  document.getElementById("score").innerText = score;
  document.getElementById("lives").innerText = lives;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

fetchPokemonList().then(() => {
  console.log("Pokémon list ready!");
});

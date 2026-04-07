const API_KEY = "7d595cfbcbaab2cac43d951ed2dc7752";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("movies");
const loadingText = document.getElementById("loading");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

let allMovies = [];

async function getMovies() {
  loadingText.style.display = "block";

  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();

    allMovies = data.results;
    displayMovies(allMovies);
  } catch (error) {
    console.log("Error fetching movies:", error);
  }

  loadingText.style.display = "none";
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  if (movies.length === 0) {
    moviesContainer.innerHTML = "<h2>No movies found</h2>";
    return;
  }

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
    `;

    moviesContainer.appendChild(movieDiv);
  });
}

function applyFilters() {
  let filtered = [...allMovies];

  const searchText = searchInput.value.toLowerCase();
  filtered = filtered.filter((movie) =>
    movie.title.toLowerCase().includes(searchText),
  );

  const rating = filterSelect.value;
  if (rating !== "all") {
    filtered = filtered.filter((movie) => movie.vote_average >= Number(rating));
  }

  const sortValue = sortSelect.value;
  if (sortValue === "high") {
    filtered.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortValue === "low") {
    filtered.sort((a, b) => a.vote_average - b.vote_average);
  }

  displayMovies(filtered);
}

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

getMovies();

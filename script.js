const API_KEY = "7d595cfbcbaab2cac43d951ed2dc7752";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("movies");
const loadingText = document.getElementById("loading");

async function getMovies() {
  loadingText.style.display = "block";

  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();

    displayMovies(data.results);
  } catch (error) {
    console.log(error);
  }

  loadingText.style.display = "none";
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
    `;

    moviesContainer.appendChild(movieDiv);
  });
}

getMovies();
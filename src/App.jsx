import { useState } from "react";
import MovieCard from "../Components/MovieCard/MovieCard.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";

import "./App.css";
const apiKey = import.meta.env.VITE_API_KEY;

import SearchIcon from "/eglass.svg";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("Search for movies");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`,
      );
      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const data = await response.json();
      setMovies(data.results);
      if (movies.length === 0) {
        setMessage("No movies found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMoviesByCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}`,
      );
      if (!response.ok) {
        throw new Error("Retrieving Categories failed");
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar onCategorySelect={fetchMoviesByCategory} />

      <div className="app">
        <h1>Movies</h1>

        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>{message}</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;

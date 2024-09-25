import { useState } from "react";
import MovieCard from "../Components/MovieCard/MovieCard.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";

import "./App.css";
const apiUrl = "https://www.omdbapi.com?apikey=9e6f812d";

import SearchIcon from "../public/eglass.svg";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${apiUrl}&s=${title}`);
      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const data = await response.json();
      console.log(data);
      setMovies(data.Search);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

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
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>Search more movies...</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;

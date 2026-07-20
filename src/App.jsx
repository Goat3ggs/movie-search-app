import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import { searchMovies } from "./api/movies";

const mockMovies = [
  {
    id: 1,
    title: "Cosmic Frontiers",
    year: "2026",
    type: "Sci-Fi",
    poster: "https://placehold.co/300x450/png",
  },
  {
    id: 2,
    title: "The Last Horizon",
    year: "2024",
    type: "Drama",
    poster: "https://placehold.co/300x450/png",
  },
];

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const input = inputValue.trim();

    if (!input) {
      setError("Please enter a movie title");
      return;
    } else {
      setError("");
      setSearchQuery(input);
      setHasSearched(true);
      setInputValue("");
    }
  }

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchMovies() {
      setIsLoading(true);
      setError("");
      try {
        const results = await searchMovies(searchQuery);
        setMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [searchQuery]);

  return (
    <>
      <div className="container">
        <Loading />
        <SearchBar
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <p>Movies found: {movies.length}</p>

        <ErrorMessage message={error} />
        <EmptyState />
        <MovieList movies={mockMovies} />
      </div>
    </>
  );
}

export default App;

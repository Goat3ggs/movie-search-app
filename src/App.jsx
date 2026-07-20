import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import { searchMovies, getGenres } from "./api/movies";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");

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

  useEffect(() => {
    async function fetchGenres() {
      try {
        const results = await getGenres();
        console.log(results);
        setGenres(results);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchGenres();
  }, []);

  function renderContent() {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (!hasSearched) {
      return <EmptyState message="Search for a movie." />;
    }

    if (movies.length === 0) {
      return <EmptyState message="No movies found." />;
    }

    return (
      <MovieList
        movies={movies}
        title={`Results for: ${searchQuery}`}
        genres={genres}
      />
    );
  }

  return (
    <>
      <div className="container">
        <SearchBar
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />

        {renderContent()}
      </div>
    </>
  );
}

export default App;

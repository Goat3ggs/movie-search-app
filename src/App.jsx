import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import { searchMovies, getGenres } from "./api/movies";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [requestError, setRequestError] = useState("");

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
    setValidationError("");

    if (value.trim() === "") {
      setSearchQuery("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const input = inputValue.trim();

    if (!input) {
      setValidationError("Please enter a movie title");
      return;
    }

    if (input.length < 3) {
      setValidationError("Please enter at least 3 characters.");
      return;
    }

    setValidationError("");
    setRequestError("");
    setSelectedMovie(null);
    setSearchQuery(input);
    setHasSearched(true);

    event.currentTarget.elements.movieSearch.blur();
  }

  function handleClickedMovie(movie) {
    setSelectedMovie(movie);
  }

  function handleBack() {
    setSelectedMovie(null);
  }

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchMovies() {
      setIsLoading(true);
      setRequestError("");
      try {
        const results = await searchMovies(searchQuery);
        setMovies(results);
      } catch (error) {
        setRequestError(error.message);
        setSearchQuery("");
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
        setGenres(results);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    const input = inputValue.trim();
    if (input === "") {
      return;
    }

    if (input.length < 3) {
      return;
    }

    const debounceTyping = setTimeout(() => {
      setValidationError("");
      setRequestError("");
      setSelectedMovie(null);
      setHasSearched(true);
      setSearchQuery(input);
    }, 600);

    return () => {
      clearTimeout(debounceTyping);
    };
  }, [inputValue]);

  function renderContent() {
    if (isLoading) {
      return <Loading />;
    }

    if (requestError) {
      return <ErrorMessage message={requestError} />;
    }

    if (selectedMovie) {
      return <MovieDetails movie={selectedMovie} onBack={handleBack} />;
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
        handleClickedMovie={handleClickedMovie}
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
          isLoading={isLoading}
        />

        {validationError && <ErrorMessage message={validationError} />}

        {renderContent()}
      </div>
    </>
  );
}

export default App;

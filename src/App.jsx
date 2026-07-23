import { useState, useEffect, useRef } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import { searchMovies, getGenres, discoverMovies } from "./api/movies";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("home");
  const [validationError, setValidationError] = useState("");
  const [requestError, setRequestError] = useState("");
  const loadMoreRef = useRef(null);

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
    setViewMode("search");
    setPage(1);
    setSearchQuery(input);

    event.currentTarget.elements.movieSearch.blur();
  }

  function handleClickedMovie(movie) {
    setSelectedMovie(movie);
  }

  function handleBack() {
    setSelectedMovie(null);
  }

  useEffect(() => {
    if (viewMode !== "home") return;

    async function fetchDiscoveredMovies() {
      setIsLoading(true);
      setRequestError("");

      try {
        const data = await discoverMovies(page);

        setMovies((currentMovies) => {
          if (page === 1) {
            return data.results;
          }

          return [...currentMovies, ...data.results];
        });

        setTotalPages(data.totalPages);
      } catch (error) {
        setRequestError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDiscoveredMovies();
  }, [page, viewMode]);

  useEffect(() => {
    if (!searchQuery || viewMode !== "search") return;

    async function fetchMovies() {
      setIsLoading(true);
      setRequestError("");

      try {
        const data = await searchMovies(searchQuery, page);

        setMovies((currentMovies) => {
          if (page === 1) {
            return data.results;
          }
          return [...currentMovies, ...data.results];
        });

        setTotalPages(data.totalPages);
      } catch (error) {
        setRequestError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [searchQuery, page, viewMode]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const results = await getGenres();
        setGenres(results);
      } catch (error) {
        setRequestError(error.message);
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
      setViewMode("search");
      setPage(1);
      setSearchQuery(input);
    }, 600);

    return () => {
      clearTimeout(debounceTyping);
    };
  }, [inputValue]);

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || isLoading || page >= totalPages || selectedMovie) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting) {
          observer.disconnect();

          setPage((currentPage) => {
            return currentPage + 1;
          });
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(loadMoreElement);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, page, totalPages, selectedMovie]);

  function renderContent() {
    if (isLoading && page === 1) {
      return <Loading />;
    }

    if (requestError) {
      return <ErrorMessage message={requestError} />;
    }

    if (selectedMovie) {
      return <MovieDetails movie={selectedMovie} onBack={handleBack} />;
    }

    if (movies.length === 0) {
      const message =
        viewMode === "home" ? "No movies available." : "No movies found.";
      return <EmptyState message={message} />;
    }

    const listTitle =
      viewMode === "home" ? "Popular Movies" : `Results for: ${searchQuery}`;

    return (
      <>
        <MovieList
          movies={movies}
          title={listTitle}
          genres={genres}
          handleClickedMovie={handleClickedMovie}
        />

        <div
          ref={loadMoreRef}
          className="load-more-sentinel"
          aria-hidden="true"
        />

        {isLoading && page > 1 && (
          <p className="load-more-status" role="status">
            Loading more movies...
          </p>
        )}
      </>
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

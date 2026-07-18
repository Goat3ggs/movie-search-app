import { useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";

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

  return (
    <>
      <Loading />
      <SearchBar value={inputValue} onChange={handleInputChange} />
      <ErrorMessage message="Something went wrong." />
      <EmptyState />
      <MovieList movies={mockMovies} />
    </>
  );
}

export default App;

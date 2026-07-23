export default function SearchBar({ value, onChange, onSubmit, isLoading }) {
  return (
    <header className="searchbar-container">
      <div className="navbar">
        <div className="navbar__brand">
          <div className="navbar__brand-copy">
            <span className="navbar__title">
              Movie<span>Search</span>
            </span>

            <span className="navbar__subtitle">Discover your next movie</span>
          </div>
        </div>

        <form
          className="searchbar"
          onSubmit={onSubmit}
          role="search"
          aria-busy={isLoading}
        >
          <label className="sr-only" htmlFor="movie-search">
            Search for a movie
          </label>

          <input
            id="movie-search"
            type="text"
            className="searchbar__input"
            placeholder="Type to search"
            value={value}
            onChange={onChange}
            name="movieSearch"
            autoComplete="off"
          />

          <button
            className="searchbar__sbtn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </header>
  );
}

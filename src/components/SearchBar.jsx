export default function SearchBar({ value, onChange, onSubmit, isLoading }) {
  return (
    <div className="searchbar-container">
      <form className="searchbar" onSubmit={onSubmit}>
        <input
          type="text"
          className="searchbar__input"
          placeholder="Type to search"
          value={value}
          onChange={onChange}
          name="movieSearch"
        />
        <button className="searchbar__sbtn" type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
}

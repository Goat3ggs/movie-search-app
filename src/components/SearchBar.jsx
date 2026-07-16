export default function SearchBar() {
  return (
    <div className="searchbar-container">
      <form className="searchbar">
        <input
          type="text"
          className="searchbar__input"
          placeholder="Type to search"
        />
        <button className="searchbar__sbtn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

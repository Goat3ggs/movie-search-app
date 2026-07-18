export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar-container">
      <form className="searchbar">
        <input
          type="text"
          className="searchbar__input"
          placeholder="Type to search"
          value={value}
          onChange={onChange}
        />
        <button className="searchbar__sbtn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

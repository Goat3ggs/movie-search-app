export default function MovieList({ children }) {
  return (
    <div className="movielist-container">
      <h1 className="category-title">New Releases</h1>
      <div className="movie-grid">{children}</div>
    </div>
  );
}

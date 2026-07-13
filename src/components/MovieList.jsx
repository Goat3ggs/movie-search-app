export default function MovieList({ children }) {
  return (
    <div className="movielist-container">
      <h1 className="category-title">New Releases</h1>
      <div className="container movie-grid">{children}</div>
    </div>
  );
}

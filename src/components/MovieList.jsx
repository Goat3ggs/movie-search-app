import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <div className="movielist-container">
      <h1 className="category-title">Search Results</h1>
      <div className="container movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

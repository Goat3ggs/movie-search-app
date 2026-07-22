import MovieCard from "./MovieCard";

export default function MovieList({
  movies,
  title,
  genres,
  handleClickedMovie,
}) {
  return (
    <div className="movielist-container">
      <h1 className="category-title">{title}</h1>
      <div className="container movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genres}
            handleClickedMovie={handleClickedMovie}
          />
        ))}
      </div>
    </div>
  );
}

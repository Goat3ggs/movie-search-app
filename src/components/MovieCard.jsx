export default function MovieCard({ movie }) {
  return (
    <article className="card-container">
      <div className="movie-card">
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="movie-info">
          <div className="movie-title">{movie.title}</div>
          <div className="movie-meta">
            {movie.year} • {movie.type}
          </div>
        </div>
      </div>
    </article>
  );
}

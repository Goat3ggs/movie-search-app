export default function MovieDetails({ movie, onBack }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const replaceImg = "/poster-placeholder.svg";

  return (
    <>
      <button type="button" onClick={onBack}>
        Back
      </button>
      <div className="movie-card">
        <img
          src={movie.poster_path ? baseUrl : replaceImg}
          alt={`${movie.title ? movie.title : "Untitled "} poster`}
        />
        <div className="movie-info">
          <div className="movie-title">
            {movie.title ? movie.title : "Untitled movie"}
          </div>
          <div className="movie-meta">
            {movie.release_date
              ? movie.release_date.slice(0, 4)
              : "No release date"}{" "}
          </div>
          <div className="movie-desc">
            {movie.overview ? movie.overview : "No description available."}
          </div>
        </div>
      </div>
    </>
  );
}

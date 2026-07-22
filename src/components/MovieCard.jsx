export default function MovieCard({ movie, genres, handleClickedMovie }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const replaceImg = "/poster-placeholder.svg";
  const genreNames = movie.genre_ids.map((id) => {
    const foundGenre = genres.find((genre) => {
      return genre.id === id;
    });
    return foundGenre ? foundGenre.name : "Unknown";
  });
  const genre = genreNames.slice(0, 1).join(", ");

  return (
    <article
      className="card-container"
      onClick={() => handleClickedMovie(movie)}
    >
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
            • {genre}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MovieDetails({ movie, onBack }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const replaceImg = "/poster-placeholder.svg";

  const title = movie.title ? movie.title : "Untitled movie";
  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "No release date";

  return (
    <section className="movie-details-page">
      <button className="movie-details__back" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span>
        Back to results
      </button>

      <article className="movie-details">
        <div className="movie-details__poster-wrapper">
          <img
            className="movie-details__poster"
            src={movie.poster_path ? baseUrl : replaceImg}
            alt={`${title} poster`}
          />
        </div>

        <div className="movie-details__content">
          <p className="movie-details__label">Movie details</p>

          <h1 className="movie-details__title">{title}</h1>

          <div className="movie-details__meta">
            <span>{releaseYear}</span>
          </div>

          <div className="movie-details__divider" />

          <div className="movie-details__overview">
            <h2>Overview</h2>

            <p>
              {movie.overview ? movie.overview : "No description available."}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

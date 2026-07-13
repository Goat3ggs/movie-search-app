export default function MovieCard() {
  return (
    <div className="container card-container">
      {/* movie 1 */}
      <a href="/link-catre-film" className="movie-card-link">
        <div className="movie-card">
          <img src="https://placeholder.com" alt="Movie 1 Poster" />
          <div className="movie-info">
            <div className="movie-title">Cosmic Frontiers</div>
            <div className="movie-meta">2026 • Sci-Fi</div>
          </div>
        </div>
      </a>
    </div>
  );
}

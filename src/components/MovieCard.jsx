export default function MovieCard() {
  return (
    <div className="card-container">
      {/* movie 1 */}
      <a href="/link-catre-film" className="movie-card-link">
        <div class="movie-card">
          <img src="https://placeholder.com" alt="Movie 1 Poster" />
          <div class="movie-info">
            <div class="movie-title">Cosmic Frontiers</div>
            <div class="movie-meta">2026 • Sci-Fi</div>
          </div>
        </div>
      </a>
    </div>
  );
}

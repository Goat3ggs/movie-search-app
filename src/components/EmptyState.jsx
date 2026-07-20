export default function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <h2>{message}</h2>
      <p>Enter a movie title to discover matching results.</p>
    </div>
  );
}

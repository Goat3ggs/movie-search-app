export default function Loading() {
  return (
    <div
      className="loader-overlay hidden"
      role="status"
      aria-label="Loading movies"
    >
      <div className="loader"></div>
    </div>
  );
}

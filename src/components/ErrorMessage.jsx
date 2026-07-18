export default function ErrorMessage({ message }) {
  return (
    <div className="container errors-container">
      <img src="/icon-stop.svg" alt="error icon" />
      <div className="error">
        <p className="error__title">Error</p>
        <p className="error__message">{message}</p>
      </div>
    </div>
  );
}

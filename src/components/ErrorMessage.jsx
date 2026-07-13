export default function ErrorMessage() {
  return (
    <div class="container errors-container hidden">
      <img src="./public/icon-stop.svg" alt="error icon" />
      <div class="error">
        <p class="error__title">Error</p>
        <p class="error__message"></p>
      </div>
    </div>
  );
}

import "./ErrorMessage.css";

function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't complete your request. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-message">
      <div className="error-icon">
        !
      </div>

      <div className="error-content">
        <h3>{title}</h3>
        <p>{message}</p>

        {onRetry && (
          <button
            type="button"
            className="error-retry"
            onClick={onRetry}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
import "./Button.css";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="btn-spinner"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
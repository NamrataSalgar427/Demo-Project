import "./Loader.css";

function Loader({
  size = "medium",
  text = "",
  fullScreen = false,
}) {
  return (
    <div
      className={`loader-container ${
        fullScreen ? "loader-fullscreen" : ""
      }`}
    >
      <div className={`loader loader-${size}`}></div>

      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}

export default Loader;
import "./Navbar.css";

function Navbar({
  title = "Dashboard",
  subtitle = "Welcome back, Admin",
  onMenuClick,
}) {
  return (
    <header className="admin-navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
          type="button"
          aria-label="Open menu"
        >
          ☰
        </button>

        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="notification-button"
          type="button"
          aria-label="Notifications"
        >
          ♢
          <span className="notification-dot" />
        </button>

        <div className="navbar-divider" />

        <div className="navbar-admin">
          <div className="navbar-avatar">
            A
          </div>

          <div className="navbar-admin-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
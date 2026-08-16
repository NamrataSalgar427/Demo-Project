import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const navigation = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: "▦",
    },
    {
      label: "Events",
      path: "/admin/events",
      icon: "◫",
    },
    {
      label: "Leads",
      path: "/admin/leads",
      icon: "♙",
    },
  ];

  const bottomNavigation = [
    {
      label: "Settings",
      path: "/admin/settings",
      icon: "⚙",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-mark">K</div>

          <div>
            <h2>Katalyst</h2>
            <span>Impact Platform</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="sidebar-section">
          <p className="sidebar-section-title">
            MAIN MENU
          </p>

          <nav className="sidebar-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "sidebar-link-active" : ""
                  }`
                }
              >
                <span className="sidebar-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="sidebar-bottom">
          <div className="sidebar-section">
            <p className="sidebar-section-title">
              SYSTEM
            </p>

            <nav className="sidebar-nav">
              {bottomNavigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-link ${
                      isActive ? "sidebar-link-active" : ""
                    }`
                  }
                >
                  <span className="sidebar-icon">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Admin Profile */}
          <div className="sidebar-profile">
            <div className="profile-avatar">
              A
            </div>

            <div className="profile-info">
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>

            <button
              className="profile-menu"
              type="button"
              aria-label="Profile menu"
            >
              ⋮
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
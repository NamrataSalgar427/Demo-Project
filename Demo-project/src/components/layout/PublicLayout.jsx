import { Outlet } from "react-router-dom";

import "./PublicLayout.css";

function PublicLayout() {
  return (
    <div className="public-layout">
      <header className="public-header">
        <div className="public-brand">
          <div className="public-logo">
            K
          </div>

          <div>
            <strong>Katalyst</strong>
            <span>Impact Platform</span>
          </div>
        </div>

        <div className="public-header-right">
          <span>Student Registration</span>
        </div>
      </header>

      <main className="public-main">
        <Outlet />
      </main>

      <footer className="public-footer">
        <p>
          © 2026 Katalyst. All rights reserved.
        </p>

        <p>
          Building opportunities. Creating impact.
        </p>
      </footer>
    </div>
  );
}

export default PublicLayout;
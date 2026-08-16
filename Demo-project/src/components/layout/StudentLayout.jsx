import { Outlet } from "react-router-dom";

import "./StudentLayout.css";

function StudentLayout() {
  return (
    <div className="student-layout">
      <header className="student-header">
        <div className="student-brand">
          <div className="student-brand-logo">
            K
          </div>

          <div>
            <strong>Katalyst</strong>
            <span>Impact Platform</span>
          </div>
        </div>

        <div className="student-header-badge">
          Student Portal
        </div>
      </header>

      <main className="student-main">
        <Outlet />
      </main>

      <footer className="student-footer">
        <span>
          © 2026 Katalyst
        </span>

        <span>
          Empowering students. Creating impact.
        </span>
      </footer>
    </div>
  );
}

export default StudentLayout;
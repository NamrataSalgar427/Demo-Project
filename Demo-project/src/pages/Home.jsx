import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="logo">◈</div>
        <h1>ImpactConnect</h1>
        <p className="tagline">Connect. Register. Transform.</p>
      </div>

      <div className="portals-section">
        <h2>Select Your Portal</h2>
        <p className="subtitle">Choose how you'd like to get started</p>

        <div className="portals-grid">
          {/* Admin Portal */}
          <div className="portal-card admin-card">
            <div className="card-icon">👔</div>
            <h3>Admin Portal</h3>
            <p>Manage events, track leads, and view analytics</p>
            <div className="card-actions">
              <button 
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate("/admin/signup")}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Student Portal */}
          <div className="portal-card student-card">
            <div className="card-icon">🎓</div>
            <h3>Student Portal</h3>
            <p>Register for events and track your application status</p>
            <div className="card-actions">
              <p className="info-text">
                Use your event link to register
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate("/event/community-drive-2026")}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="home-footer">
        <p>© 2026 Katalyst Impact Platform. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;

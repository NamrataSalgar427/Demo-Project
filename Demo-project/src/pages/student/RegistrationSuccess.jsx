import { useNavigate, useParams } from "react-router-dom";

import "./RegistrationSuccess.css";

function RegistrationSuccess() {
  const navigate = useNavigate();

  const { trackingId } = useParams();

  const handleContinue = () => {
    navigate(
      `/student/application/${trackingId}`
    );
  };

  const copyTrackingId = () => {
    if (trackingId) {
      navigator.clipboard.writeText(
        trackingId
      );
    }
  };

  return (
    <div className="student-page">

      <div className="student-background-shape success-shape-one" />
      <div className="student-background-shape success-shape-two" />

      <main className="success-container">

        {/* Brand */}

        <div className="student-brand">
          <div className="student-brand-icon">
            ◈
          </div>

          <span>
            ImpactConnect
          </span>
        </div>

        {/* Success card */}

        <div className="registration-success-card">

          <div className="success-check">
            ✓
          </div>

          <div className="success-badge">
            REGISTRATION COMPLETE
          </div>

          <h1>
            You're registered!
          </h1>

          <p className="success-description">
            Your registration has been successfully
            recorded. Keep your tracking ID safe
            to access your application.
          </p>

          {/* Tracking ID */}

          <div className="tracking-id-card">

            <span>
              YOUR TRACKING ID
            </span>

            <div className="tracking-id-row">

              <strong>
                {trackingId ||
                  "TRACKING-ID"}
              </strong>

              <button
                onClick={copyTrackingId}
                title="Copy tracking ID"
              >
                Copy
              </button>

            </div>

          </div>

          {/* Information */}

          <div className="success-info">

            <div className="success-info-icon">
              i
            </div>

            <p>
              You will need this tracking ID to
              check your application status or
              continue your application later.
            </p>

          </div>

          {/* Continue */}

          <button
            className="student-primary-button"
            onClick={handleContinue}
          >
            Continue to Application →
          </button>

          <button
            className="success-secondary-button"
            onClick={() =>
              navigate("/")
            }
          >
            Return to Home
          </button>

        </div>

        <p className="student-footer">
          Keep your tracking ID confidential.
        </p>

      </main>

    </div>
  );
}

export default RegistrationSuccess;
import ProgressTracker from "./ProgressTracker";
import Button from "../common/Button";
import "./ApplicationStatus.css";

function ApplicationStatus({
  application,
  onStart,
  onComplete,
  loading = false,
}) {
  const {
    trackingId = "",
    name = "Student",
    eventName = "Event",
    status = "registered",
    registeredAt = "",
  } = application || {};

  return (
    <div className="application-status">
      <div className="status-header">
        <div>
          <span className="status-label">
            APPLICATION STATUS
          </span>

          <h1>Welcome, {name}</h1>

          <p>
            Track your application progress below.
          </p>
        </div>

        <div className="status-id">
          <span>Tracking ID</span>
          <strong>{trackingId || "—"}</strong>
        </div>
      </div>

      <div className="status-event">
        <span>EVENT</span>

        <strong>{eventName}</strong>

        {registeredAt && (
          <small>
            Registered on {registeredAt}
          </small>
        )}
      </div>

      <div className="status-progress">
        <ProgressTracker status={status} />
      </div>

      <div className="status-action">
        {status === "registered" && (
          <Button
            variant="primary"
            size="large"
            loading={loading}
            onClick={onStart}
          >
            Start Application →
          </Button>
        )}

        {status === "started" && (
          <Button
            variant="primary"
            size="large"
            loading={loading}
            onClick={onComplete}
          >
            Complete Application →
          </Button>
        )}

        {status === "completed" && (
          <div className="completed-message">
            <span>✓</span>

            <div>
              <strong>Application Completed</strong>
              <p>
                Your application has been
                successfully submitted.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationStatus;
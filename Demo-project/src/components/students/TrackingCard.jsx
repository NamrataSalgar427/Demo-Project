import { useState } from "react";
import Button from "../common/Button";
import "./TrackingCard.css";

function TrackingCard({
  trackingId,
  eventName = "Event Application",
  onContinue,
}) {
  const [copied, setCopied] = useState(false);

  const copyTrackingId = async () => {
    if (!trackingId) return;

    try {
      await navigator.clipboard.writeText(trackingId);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy tracking ID", error);
    }
  };

  return (
    <div className="tracking-card">
      <div className="tracking-success-icon">
        ✓
      </div>

      <span className="tracking-label">
        REGISTRATION SUCCESSFUL
      </span>

      <h1>You're registered!</h1>

      <p className="tracking-description">
        Your registration for{" "}
        <strong>{eventName}</strong> has been
        successfully created.
      </p>

      <div className="tracking-id-box">
        <span>Your Tracking ID</span>

        <div className="tracking-id-row">
          <strong>{trackingId || "—"}</strong>

          <button
            type="button"
            onClick={copyTrackingId}
            className="tracking-copy"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="tracking-warning">
        <span>!</span>

        <p>
          Save your Tracking ID. You can use it
          to check your application status later.
        </p>
      </div>

      {onContinue && (
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={onContinue}
        >
          Continue Application →
        </Button>
      )}
    </div>
  );
}

export default TrackingCard;
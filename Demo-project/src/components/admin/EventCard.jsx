import { useState } from "react";
import Button from "../common/Button";
import "./EventCard.css";

function EventCard({
  event,
  onView,
  onCopyLink,
  onShowQR,
}) {
  const [copied, setCopied] = useState(false);

  const {
    name = "Community Outreach Event",
    organization = "Katalyst",
    date = "Aug 20, 2026",
    location = "Pune",
    status = "Active",
    registrations = 0,
    trackingSlug = "",
  } = event || {};

  const handleCopy = async () => {
    if (!trackingSlug) return;

    const link = `${window.location.origin}/register/${trackingSlug}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      if (onCopyLink) {
        onCopyLink(link);
      }

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <div className="event-card-icon">
          K
        </div>

        <span
          className={`event-status ${
            status.toLowerCase() === "active"
              ? "active"
              : "inactive"
          }`}
        >
          <span className="status-dot" />
          {status}
        </span>
      </div>

      <div className="event-card-content">
        <span className="event-organization">
          {organization}
        </span>

        <h3>{name}</h3>

        <div className="event-meta">
          <span>◷ {date}</span>
          <span>⌖ {location}</span>
        </div>
      </div>

      <div className="event-card-stats">
        <div>
          <strong>{registrations}</strong>
          <span>Registrations</span>
        </div>

        <div className="event-stat-divider" />

        <div>
          <strong>{trackingSlug ? "Live" : "—"}</strong>
          <span>Tracking</span>
        </div>
      </div>

      <div className="event-card-actions">
        <Button
          variant="primary"
          size="small"
          onClick={() => onView?.(event)}
        >
          View Event
        </Button>

        <Button
          variant="outline"
          size="small"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy Link"}
        </Button>

        <button
          type="button"
          className="event-qr-button"
          onClick={() => onShowQR?.(event)}
          aria-label="Show QR code"
        >
          QR
        </button>
      </div>
    </div>
  );
}

export default EventCard;
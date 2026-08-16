import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import FunnelChart from "../../components/admin/FunnelChart";

import "./EventDetails.css";

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  // Temporary data.
  // Later this will come from:
  // GET /api/events/:eventId
  const event = {
    id: eventId || "EVT-001",
    title: "Student Leadership Program",
    organization: "Katalyst",
    description:
      "A student-focused leadership and development program designed to identify and engage talented students.",
    date: "18 August 2026",
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    location: "VIT Pune",
    status: "Active",
    registrations: 248,
    started: 201,
    completed: 172,
    createdAt: "10 August 2026",
    trackingSlug:
      "student-leadership-program-2026",
  };

  const trackingLink = `${window.location.origin}/event/${event.trackingSlug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        trackingLink
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy link:", error);
    }
  };

  return (
    <PageContainer
      title="Event Details"
      subtitle="View and manage event information."
      actions={
        <div className="event-details-actions">
          <Button
            variant="secondary"
            onClick={() =>
              navigate("/admin/events")
            }
          >
            ← Back
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              console.log("Edit event:", event.id)
            }
          >
            Edit Event
          </Button>
        </div>
      }
    >
      {/* Event Header */}

      <section className="event-details-header">
        <div className="event-details-title-section">
          <div className="event-details-icon">
            ◈
          </div>

          <div>
            <div className="event-details-status">
              <span className="status-dot" />
              {event.status}
            </div>

            <h2>{event.title}</h2>

            <p>
              Organized by{" "}
              <strong>{event.organization}</strong>
            </p>
          </div>
        </div>

        <div className="event-details-id">
          <span>EVENT ID</span>
          <strong>{event.id}</strong>
        </div>
      </section>

      {/* Basic Information */}

      <section className="event-details-section">
        <div className="section-heading">
          <h3>Event Information</h3>
          <p>Basic information about this event.</p>
        </div>

        <div className="event-info-grid">
          <div className="event-info-item">
            <span>Date</span>
            <strong>{event.date}</strong>
          </div>

          <div className="event-info-item">
            <span>Time</span>
            <strong>
              {event.startTime} – {event.endTime}
            </strong>
          </div>

          <div className="event-info-item">
            <span>Location</span>
            <strong>{event.location}</strong>
          </div>

          <div className="event-info-item">
            <span>Created On</span>
            <strong>{event.createdAt}</strong>
          </div>
        </div>

        <div className="event-description">
          <span>Description</span>
          <p>{event.description}</p>
        </div>
      </section>

      {/* Tracking Link */}

      <section className="event-details-section tracking-section">
        <div className="section-heading">
          <h3>Student Tracking Link</h3>

          <p>
            Share this link with students to register
            for this event.
          </p>
        </div>

        <div className="tracking-link-box">
          <div className="tracking-link-icon">
            🔗
          </div>

          <div className="tracking-link-content">
            <span>Public Event URL</span>

            <p>{trackingLink}</p>
          </div>

          <Button
            variant={copied ? "secondary" : "primary"}
            onClick={handleCopyLink}
          >
            {copied ? "✓ Copied" : "Copy Link"}
          </Button>
        </div>

        <div className="tracking-note">
          <span>ⓘ</span>

          <p>
            Students can access this page without
            admin authentication.
          </p>
        </div>
      </section>

      {/* Analytics */}

      <section className="event-details-section">
        <div className="section-heading">
          <h3>Application Analytics</h3>

          <p>
            Monitor how students are progressing
            through the application.
          </p>
        </div>

        <div className="event-analytics-grid">
          <div className="mini-stat">
            <span>Registered</span>
            <strong>{event.registrations}</strong>
            <small>Students</small>
          </div>

          <div className="mini-stat">
            <span>Started</span>
            <strong>{event.started}</strong>
            <small>
              {Math.round(
                (event.started /
                  event.registrations) *
                  100
              )}
              % of registrations
            </small>
          </div>

          <div className="mini-stat">
            <span>Completed</span>
            <strong>{event.completed}</strong>
            <small>
              {Math.round(
                (event.completed /
                  event.registrations) *
                  100
              )}
              % of registrations
            </small>
          </div>

          <div className="mini-stat">
            <span>Completion Rate</span>
            <strong>
              {Math.round(
                (event.completed /
                  event.registrations) *
                  100
              )}
              %
            </strong>
            <small>Overall conversion</small>
          </div>
        </div>

        <div className="event-chart-grid">
          <AnalyticsCard
            title="Application Funnel"
            subtitle="Student application journey"
          >
            <FunnelChart
              registered={event.registrations}
              started={event.started}
              completed={event.completed}
            />
          </AnalyticsCard>

          <AnalyticsCard
            title="Quick Insights"
            subtitle="Current event performance"
          >
            <div className="event-insights">
              <div className="insight-row">
                <span>Registration → Start</span>

                <strong>
                  {Math.round(
                    (event.started /
                      event.registrations) *
                      100
                  )}
                  %
                </strong>
              </div>

              <div className="insight-row">
                <span>Start → Completion</span>

                <strong>
                  {Math.round(
                    (event.completed /
                      event.started) *
                      100
                  )}
                  %
                </strong>
              </div>

              <div className="insight-row">
                <span>Overall Completion</span>

                <strong>
                  {Math.round(
                    (event.completed /
                      event.registrations) *
                      100
                  )}
                  %
                </strong>
              </div>

              <div className="insight-message">
                <span>✦</span>

                <p>
                  This event is showing healthy
                  application activity.
                </p>
              </div>
            </div>
          </AnalyticsCard>
        </div>
      </section>

      {/* Export */}

      <section className="event-details-section export-section">
        <div>
          <h3>Export Event Data</h3>

          <p>
            Download all student application data
            associated with this event.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() =>
            console.log(
              "Export event:",
              event.id
            )
          }
        >
          ↓ Export Data
        </Button>
      </section>
    </PageContainer>
  );
}

export default EventDetails;
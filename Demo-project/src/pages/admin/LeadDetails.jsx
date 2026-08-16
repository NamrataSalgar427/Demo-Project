import { useParams, useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";
import AnalyticsCard from "../../components/admin/AnalyticsCard";

import "./LeadDetails.css";

function LeadDetails() {
  const { trackingId } = useParams();
  const navigate = useNavigate();

  // Temporary data
  // Later this will come from:
  // GET /api/leads/:trackingId

  const lead = {
    trackingId: trackingId || "TRK-2026-001248",

    name: "Aarav Sharma",

    email: "aarav.sharma@example.com",

    phone: "+91 98765 43210",

    college: "VIT Pune",

    year: "Third Year",

    branch: "Information Technology",

    event: "Student Leadership Program",

    organization: "Katalyst",

    registeredAt: "16 August 2026, 10:42 AM",

    startedAt: "16 August 2026, 10:48 AM",

    completedAt: "16 August 2026, 11:17 AM",

    status: "Completed",

    applicationProgress: 100,

    city: "Pune",

    state: "Maharashtra",
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "lead-status-completed";

      case "Started":
        return "lead-status-started";

      case "Registered":
        return "lead-status-registered";

      default:
        return "";
    }
  };

  return (
    <PageContainer
      title="Lead Details"
      subtitle="View complete student information and application activity."
      actions={
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/leads")}
        >
          ← Back to Leads
        </Button>
      }
    >
      {/* Profile Header */}

      <section className="lead-profile-header">

        <div className="lead-profile-main">

          <div className="lead-avatar">
            {lead.name.charAt(0)}
          </div>

          <div className="lead-profile-info">

            <div
              className={`lead-status ${getStatusClass(
                lead.status
              )}`}
            >
              <span className="lead-status-dot" />

              {lead.status}
            </div>

            <h2>{lead.name}</h2>

            <p>
              {lead.college} • {lead.year}
            </p>

          </div>

        </div>

        <div className="lead-tracking-id">

          <span>TRACKING ID</span>

          <strong>{lead.trackingId}</strong>

        </div>

      </section>

      {/* Student Information */}

      <section className="lead-details-section">

        <div className="lead-section-heading">

          <h3>Student Information</h3>

          <p>
            Personal and academic information provided
            by the student.
          </p>

        </div>

        <div className="lead-info-grid">

          <div className="lead-info-item">
            <span>Full Name</span>
            <strong>{lead.name}</strong>
          </div>

          <div className="lead-info-item">
            <span>Email Address</span>
            <strong>{lead.email}</strong>
          </div>

          <div className="lead-info-item">
            <span>Phone Number</span>
            <strong>{lead.phone}</strong>
          </div>

          <div className="lead-info-item">
            <span>College</span>
            <strong>{lead.college}</strong>
          </div>

          <div className="lead-info-item">
            <span>Year</span>
            <strong>{lead.year}</strong>
          </div>

          <div className="lead-info-item">
            <span>Branch</span>
            <strong>{lead.branch}</strong>
          </div>

          <div className="lead-info-item">
            <span>City</span>
            <strong>{lead.city}</strong>
          </div>

          <div className="lead-info-item">
            <span>State</span>
            <strong>{lead.state}</strong>
          </div>

        </div>

      </section>

      {/* Event Information */}

      <section className="lead-details-section">

        <div className="lead-section-heading">

          <h3>Event Information</h3>

          <p>
            Event through which this student was
            acquired.
          </p>

        </div>

        <div className="lead-event-card">

          <div className="lead-event-icon">
            ◈
          </div>

          <div className="lead-event-content">

            <span>EVENT</span>

            <h4>{lead.event}</h4>

            <p>
              Organized by {lead.organization}
            </p>

          </div>

          <Button
            variant="secondary"
            onClick={() =>
              console.log(
                "Open event details"
              )
            }
          >
            View Event
          </Button>

        </div>

      </section>

      {/* Application Progress */}

      <section className="lead-details-section">

        <div className="lead-section-heading">

          <h3>Application Progress</h3>

          <p>
            Track the student's journey from
            registration to completion.
          </p>

        </div>

        <AnalyticsCard
          title="Application Journey"
          subtitle="Current application status"
        >

          <div className="lead-progress">

            <div className="lead-progress-line">
              <div
                className="lead-progress-filled"
                style={{
                  width: `${lead.applicationProgress}%`,
                }}
              />
            </div>

            <div className="lead-progress-steps">

              <div className="progress-step completed">

                <div className="progress-step-icon">
                  ✓
                </div>

                <div>
                  <strong>Registered</strong>

                  <span>
                    {lead.registeredAt}
                  </span>
                </div>

              </div>

              <div className="progress-step completed">

                <div className="progress-step-icon">
                  ✓
                </div>

                <div>
                  <strong>Application Started</strong>

                  <span>
                    {lead.startedAt}
                  </span>
                </div>

              </div>

              <div className="progress-step completed">

                <div className="progress-step-icon">
                  ✓
                </div>

                <div>
                  <strong>Application Completed</strong>

                  <span>
                    {lead.completedAt}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </AnalyticsCard>

      </section>

      {/* Activity Timeline */}

      <section className="lead-details-section">

        <div className="lead-section-heading">

          <h3>Activity Timeline</h3>

          <p>
            Recent activity associated with this lead.
          </p>

        </div>

        <div className="lead-timeline">

          <div className="timeline-item">

            <div className="timeline-dot" />

            <div className="timeline-content">

              <strong>
                Application completed
              </strong>

              <span>
                {lead.completedAt}
              </span>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot" />

            <div className="timeline-content">

              <strong>
                Application started
              </strong>

              <span>
                {lead.startedAt}
              </span>

            </div>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot" />

            <div className="timeline-content">

              <strong>
                Student registered
              </strong>

              <span>
                {lead.registeredAt}
              </span>

            </div>

          </div>

        </div>

      </section>

    </PageContainer>
  );
}

export default LeadDetails;
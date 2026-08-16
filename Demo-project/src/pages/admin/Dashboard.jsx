import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import StatCard from "../../components/admin/StatCard";
import FunnelChart from "../../components/admin/FunnelChart";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import EventCard from "../../components/admin/EventCard";
import LeadsTable from "../../components/admin/LeadsTable";
import Button from "../../components/common/Button";

import "./Dashboard.css";

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7 Days");

  // Temporary data.
  // Later this will come from:
  // GET /api/dashboard/overview
  const stats = {
    totalEvents: 12,
    totalLeads: 1248,
    applicationsStarted: 1032,
    applicationsCompleted: 864,
  };

  const recentEvents = [
    {
      id: 1,
      title: "Student Leadership Program",
      organization: "Katalyst",
      date: "18 Aug 2026",
      registrations: 248,
      status: "Active",
    },
    {
      id: 2,
      title: "Career Development Workshop",
      organization: "Y4D",
      date: "21 Aug 2026",
      registrations: 186,
      status: "Active",
    },
    {
      id: 3,
      title: "Community Impact Drive",
      organization: "Seva Sahyog",
      date: "25 Aug 2026",
      registrations: 124,
      status: "Upcoming",
    },
  ];

  const recentLeads = [
    {
      id: 1,
      name: "Aarav Sharma",
      college: "VIT Pune",
      event: "Student Leadership Program",
      status: "Completed",
      date: "16 Aug 2026",
    },
    {
      id: 2,
      name: "Ananya Patil",
      college: "COEP",
      event: "Career Development Workshop",
      status: "Started",
      date: "16 Aug 2026",
    },
    {
      id: 3,
      name: "Rohan Mehta",
      college: "SPIT",
      event: "Student Leadership Program",
      status: "Registered",
      date: "15 Aug 2026",
    },
    {
      id: 4,
      name: "Sneha Joshi",
      college: "VIT Pune",
      event: "Community Impact Drive",
      status: "Completed",
      date: "15 Aug 2026",
    },
  ];

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Overview of your events, students and applications."
      actions={
        <Button variant="primary">
          + Create Event
        </Button>
      }
    >
      {/* Top controls */}

      <div className="dashboard-topbar">
        <div>
          <span className="dashboard-live-dot" />
          <span>System is running normally</span>
        </div>

        <div className="dashboard-period">
          {["7 Days", "30 Days", "90 Days"].map(
            (period) => (
              <button
                key={period}
                className={
                  selectedPeriod === period
                    ? "period-active"
                    : ""
                }
                onClick={() =>
                  setSelectedPeriod(period)
                }
              >
                {period}
              </button>
            )
          )}
        </div>
      </div>

      {/* Statistics */}

      <div className="dashboard-stats">
        <StatCard
          title="Total Events"
          value={stats.totalEvents}
          icon="◈"
          trend="+12%"
          trendType="positive"
        />

        <StatCard
          title="Total Leads"
          value={stats.totalLeads.toLocaleString()}
          icon="◎"
          trend="+18%"
          trendType="positive"
        />

        <StatCard
          title="Applications Started"
          value={stats.applicationsStarted.toLocaleString()}
          icon="↗"
          trend="+9%"
          trendType="positive"
        />

        <StatCard
          title="Applications Completed"
          value={stats.applicationsCompleted.toLocaleString()}
          icon="✓"
          trend="+14%"
          trendType="positive"
        />
      </div>

      {/* Main analytics section */}

      <div className="dashboard-grid">
        <AnalyticsCard
          title="Application Funnel"
          subtitle="Student journey overview"
        >
          <FunnelChart
            registered={1248}
            started={1032}
            completed={864}
          />
        </AnalyticsCard>

        <AnalyticsCard
          title="Application Performance"
          subtitle={`Performance over ${selectedPeriod.toLowerCase()}`}
        >
          <div className="performance-content">
            <div className="performance-main">
              <strong>69.2%</strong>

              <span>Completion Rate</span>
            </div>

            <div className="performance-items">
              <div>
                <span>Registered</span>
                <strong>1,248</strong>
              </div>

              <div>
                <span>Started</span>
                <strong>1,032</strong>
              </div>

              <div>
                <span>Completed</span>
                <strong>864</strong>
              </div>
            </div>
          </div>
        </AnalyticsCard>
      </div>

      {/* Recent Events */}

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Recent Events</h2>
            <p>
              Your latest events and their registration
              activity.
            </p>
          </div>

          <button
            className="view-all-button"
            onClick={() => {
              console.log("View all events");
            }}
          >
            View all →
          </button>
        </div>

        <div className="events-grid">
          {recentEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </section>

      {/* Recent Leads */}

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Recent Leads</h2>
            <p>
              Latest student registrations and
              application activity.
            </p>
          </div>

          <button
            className="view-all-button"
            onClick={() => {
              console.log("View all leads");
            }}
          >
            View all →
          </button>
        </div>

        <div className="dashboard-table-wrapper">
          <LeadsTable leads={recentLeads} />
        </div>
      </section>
    </PageContainer>
  );
}

export default Dashboard;
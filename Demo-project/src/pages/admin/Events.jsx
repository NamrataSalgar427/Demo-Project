import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import EventCard from "../../components/admin/EventCard";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

import "./Events.css";

function Events() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Temporary data.
  // Later:
  // GET /api/events
  const events = [
    {
      id: 1,
      title: "Student Leadership Program",
      organization: "Katalyst",
      date: "18 Aug 2026",
      registrations: 248,
      status: "Active",
      location: "Pune",
    },
    {
      id: 2,
      title: "Career Development Workshop",
      organization: "Y4D",
      date: "21 Aug 2026",
      registrations: 186,
      status: "Active",
      location: "Mumbai",
    },
    {
      id: 3,
      title: "Community Impact Drive",
      organization: "Seva Sahyog",
      date: "25 Aug 2026",
      registrations: 124,
      status: "Upcoming",
      location: "Pune",
    },
    {
      id: 4,
      title: "Digital Skills Bootcamp",
      organization: "Katalyst",
      date: "02 Aug 2026",
      registrations: 312,
      status: "Completed",
      location: "Nashik",
    },
    {
      id: 5,
      title: "Youth Empowerment Program",
      organization: "Y4D",
      date: "30 Jul 2026",
      registrations: 198,
      status: "Completed",
      location: "Nagpur",
    },
    {
      id: 6,
      title: "Student Opportunity Fair",
      organization: "Katalyst",
      date: "28 Aug 2026",
      registrations: 95,
      status: "Upcoming",
      location: "Pune",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      event.organization
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "all" ||
      event.status.toLowerCase() ===
        status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <PageContainer
      title="Events"
      subtitle="Create, manage and monitor your events."
      actions={
        <Button
          variant="primary"
          onClick={() =>
            console.log("Create event")
          }
        >
          + Create Event
        </Button>
      }
    >
      {/* Summary */}

      <div className="events-summary">
        <div className="events-summary-card">
          <span>Total Events</span>
          <strong>{events.length}</strong>
        </div>

        <div className="events-summary-card">
          <span>Active</span>
          <strong>
            {
              events.filter(
                (event) =>
                  event.status === "Active"
              ).length
            }
          </strong>
        </div>

        <div className="events-summary-card">
          <span>Upcoming</span>
          <strong>
            {
              events.filter(
                (event) =>
                  event.status === "Upcoming"
              ).length
            }
          </strong>
        </div>

        <div className="events-summary-card">
          <span>Completed</span>
          <strong>
            {
              events.filter(
                (event) =>
                  event.status === "Completed"
              ).length
            }
          </strong>
        </div>
      </div>

      {/* Filters */}

      <div className="events-toolbar">
        <div className="events-search">
          <Input
            placeholder="Search events or organizations..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="events-filter">
          <Select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            options={[
              {
                value: "all",
                label: "All Events",
              },
              {
                value: "active",
                label: "Active",
              },
              {
                value: "upcoming",
                label: "Upcoming",
              },
              {
                value: "completed",
                label: "Completed",
              },
            ]}
          />
        </div>
      </div>

      {/* Event count */}

      <div className="events-result-count">
        Showing{" "}
        <strong>{filteredEvents.length}</strong>{" "}
        of <strong>{events.length}</strong> events
      </div>

      {/* Events */}

      {filteredEvents.length > 0 ? (
        <div className="events-page-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() =>
                console.log(
                  "Open event:",
                  event.id
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="events-empty">
          <div className="events-empty-icon">
            ◈
          </div>

          <h3>No events found</h3>

          <p>
            Try changing your search or filter.
          </p>

          <Button
            variant="secondary"
            onClick={() => {
              setSearch("");
              setStatus("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </PageContainer>
  );
}

export default Events;
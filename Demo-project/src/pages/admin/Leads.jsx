import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

import "./Leads.css";

function Leads() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] =
    useState("all");
  const [yearFilter, setYearFilter] =
    useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");

  // Temporary mock data.
  // Later this will come from:
  //
  // GET /api/leads?event=&college=&year=&status=&search=

  const leads = [
    {
      trackingId: "TRK-2026-001248",
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      college: "VIT Pune",
      year: "Third Year",
      event: "Student Leadership Program",
      status: "Completed",
      date: "16 Aug 2026",
    },
    {
      trackingId: "TRK-2026-001247",
      name: "Ananya Patil",
      email: "ananya.patil@example.com",
      college: "COEP",
      year: "Second Year",
      event: "Career Development Workshop",
      status: "Started",
      date: "16 Aug 2026",
    },
    {
      trackingId: "TRK-2026-001246",
      name: "Rohan Mehta",
      email: "rohan.mehta@example.com",
      college: "SPIT",
      year: "Third Year",
      event: "Student Leadership Program",
      status: "Registered",
      date: "15 Aug 2026",
    },
    {
      trackingId: "TRK-2026-001245",
      name: "Sneha Joshi",
      email: "sneha.joshi@example.com",
      college: "VIT Pune",
      year: "Final Year",
      event: "Community Impact Drive",
      status: "Completed",
      date: "15 Aug 2026",
    },
    {
      trackingId: "TRK-2026-001244",
      name: "Karan Deshmukh",
      email: "karan.d@example.com",
      college: "PCCOE",
      year: "Third Year",
      event: "Career Development Workshop",
      status: "Started",
      date: "14 Aug 2026",
    },
    {
      trackingId: "TRK-2026-001243",
      name: "Priya Kulkarni",
      email: "priya.k@example.com",
      college: "VIT Pune",
      year: "Second Year",
      event: "Student Leadership Program",
      status: "Completed",
      date: "14 Aug 2026",
    },
    {
      trackingId: "TRK-2026-001242",
      name: "Aditya Shah",
      email: "aditya.shah@example.com",
      college: "COEP",
      year: "Final Year",
      event: "Community Impact Drive",
      status: "Registered",
      date: "13 Aug 2026",
    },
    {
      trackingId: "TRK-2026-001241",
      name: "Isha More",
      email: "isha.more@example.com",
      college: "SPIT",
      year: "Third Year",
      event: "Career Development Workshop",
      status: "Completed",
      date: "13 Aug 2026",
    },
  ];

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        lead.name
          .toLowerCase()
          .includes(searchValue) ||
        lead.email
          .toLowerCase()
          .includes(searchValue) ||
        lead.trackingId
          .toLowerCase()
          .includes(searchValue);

      const matchesEvent =
        eventFilter === "all" ||
        lead.event === eventFilter;

      const matchesCollege =
        collegeFilter === "all" ||
        lead.college === collegeFilter;

      const matchesYear =
        yearFilter === "all" ||
        lead.year === yearFilter;

      const matchesStatus =
        statusFilter === "all" ||
        lead.status === statusFilter;

      return (
        matchesSearch &&
        matchesEvent &&
        matchesCollege &&
        matchesYear &&
        matchesStatus
      );
    });
  }, [
    search,
    eventFilter,
    collegeFilter,
    yearFilter,
    statusFilter,
  ]);

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "lead-table-status completed";
    }

    if (status === "Started") {
      return "lead-table-status started";
    }

    return "lead-table-status registered";
  };

  const clearFilters = () => {
    setSearch("");
    setEventFilter("all");
    setCollegeFilter("all");
    setYearFilter("all");
    setStatusFilter("all");
  };

  const handleExport = () => {
    // Later:
    // GET /api/leads/export?event=...&college=...
    console.log("Export leads");
  };

  return (
    <PageContainer
      title="Leads"
      subtitle="View and manage students captured through your events."
      actions={
        <Button
          variant="secondary"
          onClick={handleExport}
        >
          ↓ Export Leads
        </Button>
      }
    >
      {/* Summary */}

      <div className="leads-summary">

        <div className="leads-summary-card">
          <span>Total Leads</span>
          <strong>{leads.length}</strong>
        </div>

        <div className="leads-summary-card">
          <span>Completed</span>
          <strong>
            {
              leads.filter(
                (lead) =>
                  lead.status === "Completed"
              ).length
            }
          </strong>
        </div>

        <div className="leads-summary-card">
          <span>In Progress</span>
          <strong>
            {
              leads.filter(
                (lead) =>
                  lead.status === "Started"
              ).length
            }
          </strong>
        </div>

        <div className="leads-summary-card">
          <span>Registered</span>
          <strong>
            {
              leads.filter(
                (lead) =>
                  lead.status === "Registered"
              ).length
            }
          </strong>
        </div>

      </div>

      {/* Filters */}

      <section className="leads-filter-panel">

        <div className="leads-filter-search">
          <label>Search</label>

          <Input
            placeholder="Search by name, email or tracking ID..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="leads-filter-item">
          <label>Event</label>

          <Select
            value={eventFilter}
            onChange={(event) =>
              setEventFilter(event.target.value)
            }
            options={[
              {
                value: "all",
                label: "All Events",
              },
              {
                value: "Student Leadership Program",
                label:
                  "Student Leadership Program",
              },
              {
                value: "Career Development Workshop",
                label:
                  "Career Development Workshop",
              },
              {
                value: "Community Impact Drive",
                label:
                  "Community Impact Drive",
              },
            ]}
          />
        </div>

        <div className="leads-filter-item">
          <label>College</label>

          <Select
            value={collegeFilter}
            onChange={(event) =>
              setCollegeFilter(event.target.value)
            }
            options={[
              {
                value: "all",
                label: "All Colleges",
              },
              {
                value: "VIT Pune",
                label: "VIT Pune",
              },
              {
                value: "COEP",
                label: "COEP",
              },
              {
                value: "SPIT",
                label: "SPIT",
              },
              {
                value: "PCCOE",
                label: "PCCOE",
              },
            ]}
          />
        </div>

        <div className="leads-filter-item">
          <label>Year</label>

          <Select
            value={yearFilter}
            onChange={(event) =>
              setYearFilter(event.target.value)
            }
            options={[
              {
                value: "all",
                label: "All Years",
              },
              {
                value: "Second Year",
                label: "Second Year",
              },
              {
                value: "Third Year",
                label: "Third Year",
              },
              {
                value: "Final Year",
                label: "Final Year",
              },
            ]}
          />
        </div>

        <div className="leads-filter-item">
          <label>Status</label>

          <Select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            options={[
              {
                value: "all",
                label: "All Status",
              },
              {
                value: "Registered",
                label: "Registered",
              },
              {
                value: "Started",
                label: "Started",
              },
              {
                value: "Completed",
                label: "Completed",
              },
            ]}
          />
        </div>

      </section>

      {/* Result information */}

      <div className="leads-result-bar">

        <div>
          Showing{" "}
          <strong>
            {filteredLeads.length}
          </strong>{" "}
          of{" "}
          <strong>{leads.length}</strong>{" "}
          leads
        </div>

        <button
          className="clear-filters-button"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

      {/* Table */}

      <section className="leads-table-card">

        <div className="leads-table-wrapper">

          <table className="leads-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>College</th>
                <th>Year</th>
                <th>Event</th>
                <th>Status</th>
                <th>Registered</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.trackingId}>

                    {/* Student */}

                    <td>
                      <div className="lead-student">

                        <div className="lead-table-avatar">
                          {lead.name.charAt(0)}
                        </div>

                        <div>
                          <strong>
                            {lead.name}
                          </strong>

                          <span>
                            {lead.email}
                          </span>

                          <small>
                            {lead.trackingId}
                          </small>
                        </div>

                      </div>
                    </td>

                    {/* College */}

                    <td>
                      <span className="lead-college">
                        {lead.college}
                      </span>
                    </td>

                    {/* Year */}

                    <td>
                      <span className="lead-year">
                        {lead.year}
                      </span>
                    </td>

                    {/* Event */}

                    <td>
                      <span className="lead-event-name">
                        {lead.event}
                      </span>
                    </td>

                    {/* Status */}

                    <td>
                      <span
                        className={getStatusClass(
                          lead.status
                        )}
                      >
                        <span className="status-small-dot" />
                        {lead.status}
                      </span>
                    </td>

                    {/* Date */}

                    <td>
                      <span className="lead-date">
                        {lead.date}
                      </span>
                    </td>

                    {/* Action */}

                    <td>
                      <button
                        className="lead-view-button"
                        onClick={() =>
                          navigate(
                            `/admin/leads/${lead.trackingId}`
                          )
                        }
                      >
                        View →
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="leads-no-results"
                  >
                    <div>
                      <span>◎</span>

                      <strong>
                        No leads found
                      </strong>

                      <p>
                        Try changing your
                        search or filters.
                      </p>

                      <button
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

    </PageContainer>
  );
}

export default Leads;
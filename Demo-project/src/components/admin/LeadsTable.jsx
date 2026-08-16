import "./LeadsTable.css";

function LeadsTable({
  leads = [],
  onViewLead,
}) {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "lead-status completed";

      case "started":
        return "lead-status started";

      case "registered":
        return "lead-status registered";

      default:
        return "lead-status";
    }
  };

  if (leads.length === 0) {
    return (
      <div className="leads-empty">
        <div className="empty-icon">♙</div>

        <h3>No leads found</h3>

        <p>
          Student registrations will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="leads-table-container">
      <div className="leads-table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>College</th>
              <th>Year</th>
              <th>Status</th>
              <th>Tracking ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead.trackingId || lead.id}>
                <td>
                  <div className="student-cell">
                    <div className="student-avatar">
                      {lead.name?.charAt(0)?.toUpperCase() || "S"}
                    </div>

                    <div>
                      <strong>
                        {lead.name || "Unknown Student"}
                      </strong>

                      <span>
                        {lead.email || "—"}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  {lead.college || "—"}
                </td>

                <td>
                  {lead.year || "—"}
                </td>

                <td>
                  <span className={getStatusClass(lead.status)}>
                    <span className="lead-status-dot" />
                    {lead.status || "Unknown"}
                  </span>
                </td>

                <td>
                  <code>
                    {lead.trackingId || "—"}
                  </code>
                </td>

                <td>
                  <button
                    type="button"
                    className="view-lead-button"
                    onClick={() => onViewLead?.(lead)}
                  >
                    View →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadsTable;
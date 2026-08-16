import "./StatCard.css";

function StatCard({
  title,
  value,
  change,
  changeType = "positive",
  icon = "•",
  description,
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          {icon}
        </div>

        {change && (
          <span className={`stat-change ${changeType}`}>
            {changeType === "positive" ? "↑" : "↓"} {change}
          </span>
        )}
      </div>

      <div className="stat-content">
        <p>{title}</p>

        <h3>{value}</h3>

        {description && (
          <span>{description}</span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
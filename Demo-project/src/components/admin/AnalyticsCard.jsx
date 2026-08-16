import "./AnalyticsCard.css";

function AnalyticsCard({
  title,
  value,
  percentage,
  description,
  icon = "↗",
}) {
  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div className="analytics-icon">
          {icon}
        </div>

        {percentage !== undefined && (
          <span className="analytics-percentage">
            {percentage >= 0 ? "↑" : "↓"}{" "}
            {Math.abs(percentage)}%
          </span>
        )}
      </div>

      <div className="analytics-content">
        <p>{title}</p>

        <h3>{value}</h3>

        {description && (
          <span>{description}</span>
        )}
      </div>
    </div>
  );
}

export default AnalyticsCard;
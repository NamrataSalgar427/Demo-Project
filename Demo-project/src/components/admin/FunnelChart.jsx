import "./FunnelChart.css";

function FunnelChart({
  registered = 0,
  started = 0,
  completed = 0,
}) {
  const stages = [
    {
      label: "Registered",
      value: registered,
      className: "registered",
    },
    {
      label: "Started",
      value: started,
      className: "started",
    },
    {
      label: "Completed",
      value: completed,
      className: "completed",
    },
  ];

  const maxValue = Math.max(registered, 1);

  return (
    <div className="funnel-card">
      <div className="funnel-header">
        <div>
          <h3>Application Funnel</h3>
          <p>Student journey overview</p>
        </div>
      </div>

      <div className="funnel-body">
        {stages.map((stage) => {
          const width =
            Math.max((stage.value / maxValue) * 100, 8);

          return (
            <div className="funnel-stage" key={stage.label}>
              <div className="funnel-stage-info">
                <span>{stage.label}</span>
                <strong>{stage.value}</strong>
              </div>

              <div className="funnel-track">
                <div
                  className={`funnel-bar ${stage.className}`}
                  style={{
                    width: `${width}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FunnelChart;
import "./ProgressTracker.css";

function ProgressTracker({
  status = "registered",
}) {
  const steps = [
    {
      key: "registered",
      label: "Registered",
      description: "Registration submitted",
    },
    {
      key: "started",
      label: "Application Started",
      description: "Application has been started",
    },
    {
      key: "completed",
      label: "Application Completed",
      description: "Application successfully completed",
    },
  ];

  const statusOrder = {
    registered: 0,
    started: 1,
    completed: 2,
  };

  const currentIndex =
    statusOrder[status] ?? 0;

  return (
    <div className="progress-tracker">
      {steps.map((step, index) => {
        const isCompleted =
          index < currentIndex;

        const isCurrent =
          index === currentIndex;

        return (
          <div
            className="progress-step-wrapper"
            key={step.key}
          >
            <div
              className={`progress-step ${
                isCompleted
                  ? "completed"
                  : ""
              } ${
                isCurrent
                  ? "current"
                  : ""
              }`}
            >
              <div className="progress-circle">
                {isCompleted
                  ? "✓"
                  : index + 1}
              </div>

              <div className="progress-content">
                <strong>
                  {step.label}
                </strong>

                <span>
                  {step.description}
                </span>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`progress-line ${
                  index < currentIndex
                    ? "progress-line-active"
                    : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressTracker;
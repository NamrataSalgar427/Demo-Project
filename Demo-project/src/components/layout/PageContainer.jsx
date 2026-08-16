import "./PageContainer.css";

function PageContainer({
  children,
  title,
  subtitle,
  actions,
  className = "",
}) {
  return (
    <div className={`page-container ${className}`}>
      {(title || subtitle || actions) && (
        <div className="page-header">
          <div>
            {title && (
              <h1>{title}</h1>
            )}

            {subtitle && (
              <p>{subtitle}</p>
            )}
          </div>

          {actions && (
            <div className="page-actions">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="page-content">
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
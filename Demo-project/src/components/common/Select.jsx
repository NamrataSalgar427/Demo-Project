import "./Select.css";

function Select({
  label,
  name,
  value = "",
  onChange,
  options = [],
  placeholder = "Select an option",
  error = "",
  required = false,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`select-group ${className}`}>
      {label && (
        <label htmlFor={name} className="select-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}

      <div className="select-wrapper">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`select-field ${error ? "select-error" : ""}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="select-error-message">{error}</p>}
    </div>
  );
}

export default Select;
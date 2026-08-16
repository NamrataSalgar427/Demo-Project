import "./Input.css";

function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  error = "",
  helperText = "",
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete,
  className = "",
}) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        className={`input-field ${error ? "input-error" : ""}`}
      />

      {error && <p className="input-error-message">{error}</p>}

      {!error && helperText && (
        <p className="input-helper">{helperText}</p>
      )}
    </div>
  );
}

export default Input;
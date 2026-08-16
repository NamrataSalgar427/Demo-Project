import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { authAPIs } from "../../services/apiClient";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const data = await authAPIs.signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        organizationName:
          formData.organizationName,
      });

      // Store token and redirect to dashboard
      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setErrors({
        submit:
          error.message ||
          "An error occurred during signup.",
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-header">
          <div className="logo-icon">K</div>
          <p className="portal-label">ADMIN PORTAL</p>
          <h1>Create Your Account</h1>
          <p className="subtitle">
            Set up your admin account to manage events and leads.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {errors.submit && (
            <div className="error-message-box">
              <span>⚠</span>
              <p>{errors.submit}</p>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <Input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="error">{errors.firstName}</p>
              )}
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <Input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="error">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <Input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Organization Name *</label>
            <Input
              type="text"
              name="organizationName"
              placeholder="Your NGO or organization name"
              value={formData.organizationName}
              onChange={handleChange}
            />
            {errors.organizationName && (
              <p className="error">{errors.organizationName}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <Input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="error">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="agreement">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <Button type="submit">Create Account →</Button>
        </form>

        <div className="signin-link">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="link-btn"
            >
              Sign In
            </button>
          </p>
        </div>

        <div className="signup-footer">
          <div className="footer-item">
            <span className="icon">🔒</span>
            <p>Secure account creation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

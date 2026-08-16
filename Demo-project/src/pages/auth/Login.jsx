import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { authAPIs } from "../../services/apiClient";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
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
      const data = await authAPIs.login(
        formData.email,
        formData.password
      );

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Navigate to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({
        submit:
          err.message ||
          "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-background-shape login-shape-one" />
      <div className="login-background-shape login-shape-two" />

      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          K
        </div>

        <div className="login-heading">
          <span>ADMIN PORTAL</span>

          <h1>Welcome back</h1>

          <p>
            Sign in to manage events, students and
            application analytics.
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() => {
                console.log(
                  "Forgot password clicked"
                );
              }}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
          >
            Sign In →
          </Button>
        </form>

        <div className="login-security">
          <span>🔒</span>
          <p>
            Secure admin access
          </p>
        </div>

        <div className="login-links">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/admin/signup")}
            >
              Create one
            </button>
          </p>
          <p>
            <button
              type="button"
              className="link-button secondary"
              onClick={() => navigate("/")}
            >
              ← Back to Portals
            </button>
          </p>
        </div>

        <div className="login-footer">
          Katalyst Impact Platform
        </div>

      </div>
    </div>
  );
}

export default Login;
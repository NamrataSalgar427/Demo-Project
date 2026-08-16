import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { studentAPIs } from "../../services/apiClient";

import "./Registration.css";

function Registration() {
  const navigate = useNavigate();
  const { trackingSlug } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    course: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.college ||
      !formData.year
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }

    try {
      setIsSubmitting(true);

      const data = await studentAPIs.register({
        trackingSlug,
        ...formData,
      });

      if (!data.trackingId) {
        throw new Error(
          "Tracking ID was not returned."
        );
      }

      navigate(
        `/student/registration-success/${data.trackingId}`
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Unable to complete registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="student-page">

      <div className="student-background-shape shape-one" />
      <div className="student-background-shape shape-two" />

      <main className="registration-container">

        {/* Logo */}

        <div className="student-brand">
          <div className="student-brand-icon">
            ◈
          </div>

          <span>
            ImpactConnect
          </span>
        </div>

        {/* Header */}

        <div className="registration-header">

          <div className="registration-badge">
            EVENT REGISTRATION
          </div>

          <h1>
            Join the Event
          </h1>

          <p>
            Enter your details below to register
            and start your application.
          </p>

        </div>

        {/* Card */}

        <form
          className="registration-card"
          onSubmit={handleSubmit}
        >

          {error && (
            <div className="student-error">
              <span>!</span>
              {error}
            </div>
          )}

          {/* Personal Information */}

          <div className="student-form-section">

            <div className="student-section-title">
              <div className="student-section-number">
                01
              </div>

              <div>
                <h2>
                  Personal Information
                </h2>

                <p>
                  Tell us a little about yourself.
                </p>
              </div>
            </div>

            <div className="student-form-grid">

              <div className="student-field full">
                <label>
                  Full Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="student-field">
                <label>
                  Email Address <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="student-field">
                <label>
                  Phone Number <span>*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

            </div>

          </div>

          {/* Education */}

          <div className="student-form-section">

            <div className="student-section-title">

              <div className="student-section-number">
                02
              </div>

              <div>
                <h2>
                  Education
                </h2>

                <p>
                  Provide your current academic details.
                </p>
              </div>

            </div>

            <div className="student-form-grid">

              <div className="student-field">

                <label>
                  College <span>*</span>
                </label>

                <select
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                >
                  <option value="">
                    Select college
                  </option>

                  <option value="VIT Pune">
                    VIT Pune
                  </option>

                  <option value="COEP">
                    COEP
                  </option>

                  <option value="SPIT">
                    SPIT
                  </option>

                  <option value="PCCOE">
                    PCCOE
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

              </div>

              <div className="student-field">

                <label>
                  Year <span>*</span>
                </label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">
                    Select year
                  </option>

                  <option value="First Year">
                    First Year
                  </option>

                  <option value="Second Year">
                    Second Year
                  </option>

                  <option value="Third Year">
                    Third Year
                  </option>

                  <option value="Final Year">
                    Final Year
                  </option>
                </select>

              </div>

              <div className="student-field full">

                <label>
                  Course
                </label>

                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. Information Technology"
                />

              </div>

            </div>

          </div>

          {/* Privacy */}

          <div className="student-privacy">

            <span>✓</span>

            <p>
              By registering, you agree that the
              information provided can be used for
              this event and application process.
            </p>

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="student-primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Registering..."
              : "Register & Continue →"}
          </button>

        </form>

        <p className="student-footer">
          Your information is securely handled
          throughout the application process.
        </p>

      </main>

    </div>
  );
}

export default Registration;
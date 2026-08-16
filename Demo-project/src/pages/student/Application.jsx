import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { studentAPIs } from "../../services/apiClient";

import "./Application.css";

function Application() {
  const navigate = useNavigate();

  const { trackingId } = useParams();

  const [application, setApplication] =
    useState(null);

  const [formData, setFormData] = useState({
    motivation: "",
    experience: "",
    skills: "",
    availability: "",
    additionalInfo: "",
  });

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [currentStep, setCurrentStep] =
    useState(1);

  /*
   * Fetch application
   */

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);

        const data =
          await studentAPIs.getApplication(
            trackingId
          );

        setApplication(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load your application."
        );
      } finally {
        setLoading(false);
      }
    };

    if (trackingId) {
      fetchApplication();
    }
  }, [trackingId]);

  /*
   * Start application
   */

  const startApplication = async () => {
    try {
      await studentAPIs.startApplication(
        trackingId
      );
    } catch (err) {
      console.error(err);
    }
  };

  /*
   * Input change
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  /*
   * Next step
   */

  const handleNext = async () => {
    if (currentStep === 1) {
      await startApplication();
    }

    setCurrentStep((previous) =>
      Math.min(previous + 1, 3)
    );
  };

  /*
   * Previous
   */

  const handlePrevious = () => {
    setCurrentStep((previous) =>
      Math.max(previous - 1, 1)
    );
  };

  /*
   * Complete application
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.motivation.trim()) {
      setError(
        "Please tell us why you are interested in this opportunity."
      );

      setCurrentStep(1);

      return;
    }

    try {
      setSubmitting(true);

      await studentAPIs.completeApplication(
        trackingId,
        formData
      );

      navigate(
        `/student/application/${trackingId}/complete`
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Unable to submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="application-loading">
        <div className="application-loader" />

        <p>
          Loading your application...
        </p>
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="application-loading">

        <div className="application-error-icon">
          !
        </div>

        <h2>
          Something went wrong
        </h2>

        <p>
          {error}
        </p>

      </div>
    );
  }

  return (
    <div className="student-page application-page">

      <header className="application-topbar">

        <div className="application-brand">

          <div className="student-brand-icon">
            ◈
          </div>

          <span>
            ImpactConnect
          </span>

        </div>

        <div className="application-tracking">
          ID:{" "}
          <strong>
            {trackingId}
          </strong>
        </div>

      </header>

      <main className="application-container">

        {/* Heading */}

        <div className="application-heading">

          <div>
            <span className="application-eyebrow">
              APPLICATION
            </span>

            <h1>
              Complete your application
            </h1>

            <p>
              Take a few minutes to tell us more
              about yourself.
            </p>
          </div>

          <div className="application-progress-text">
            Step {currentStep} of 3
          </div>

        </div>

        {/* Progress */}

        <div className="application-progress">

          <div
            className="application-progress-fill"
            style={{
              width:
                `${(currentStep / 3) * 100}%`,
            }}
          />

        </div>

        {/* Form */}

        <form
          className="application-card"
          onSubmit={handleSubmit}
        >

          {error && (
            <div className="student-error">
              <span>!</span>
              {error}
            </div>
          )}

          {/* Step 1 */}

          {currentStep === 1 && (
            <div className="application-step">

              <div className="application-step-heading">

                <div className="application-step-icon">
                  01
                </div>

                <div>
                  <h2>
                    About You
                  </h2>

                  <p>
                    Tell us about your interests
                    and motivation.
                  </p>
                </div>

              </div>

              <div className="application-field">

                <label>
                  Why are you interested in
                  this opportunity?{" "}
                  <span>*</span>
                </label>

                <textarea
                  name="motivation"
                  value={
                    formData.motivation
                  }
                  onChange={handleChange}
                  placeholder="Tell us what motivates you..."
                  rows="6"
                />

              </div>

            </div>
          )}

          {/* Step 2 */}

          {currentStep === 2 && (
            <div className="application-step">

              <div className="application-step-heading">

                <div className="application-step-icon">
                  02
                </div>

                <div>
                  <h2>
                    Experience & Skills
                  </h2>

                  <p>
                    Share your relevant experience
                    and strengths.
                  </p>
                </div>

              </div>

              <div className="application-field">

                <label>
                  Relevant Experience
                </label>

                <textarea
                  name="experience"
                  value={
                    formData.experience
                  }
                  onChange={handleChange}
                  placeholder="Describe projects, volunteering, internships or other relevant experience..."
                  rows="5"
                />

              </div>

              <div className="application-field">

                <label>
                  Skills
                </label>

                <textarea
                  name="skills"
                  value={
                    formData.skills
                  }
                  onChange={handleChange}
                  placeholder="e.g. Leadership, communication, coding, design..."
                  rows="4"
                />

              </div>

            </div>
          )}

          {/* Step 3 */}

          {currentStep === 3 && (
            <div className="application-step">

              <div className="application-step-heading">

                <div className="application-step-icon">
                  03
                </div>

                <div>
                  <h2>
                    Availability
                  </h2>

                  <p>
                    Give us some final information.
                  </p>
                </div>

              </div>

              <div className="application-field">

                <label>
                  Availability
                </label>

                <select
                  name="availability"
                  value={
                    formData.availability
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Select availability
                  </option>

                  <option value="Weekdays">
                    Weekdays
                  </option>

                  <option value="Weekends">
                    Weekends
                  </option>

                  <option value="Both">
                    Both
                  </option>
                </select>

              </div>

              <div className="application-field">

                <label>
                  Anything else you'd like us
                  to know?
                </label>

                <textarea
                  name="additionalInfo"
                  value={
                    formData.additionalInfo
                  }
                  onChange={handleChange}
                  placeholder="Optional..."
                  rows="5"
                />

              </div>

            </div>
          )}

          {/* Navigation */}

          <div className="application-actions">

            {currentStep > 1 ? (
              <button
                type="button"
                className="application-back-button"
                onClick={handlePrevious}
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                className="student-primary-button application-next-button"
                onClick={handleNext}
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                className="student-primary-button application-next-button"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Application ✓"}
              </button>
            )}

          </div>

        </form>

        <p className="student-footer">
          Tracking ID: {trackingId}
        </p>

      </main>

    </div>
  );
}

export default Application;
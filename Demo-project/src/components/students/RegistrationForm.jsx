import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import "./RegistrationForm.css";

function RegistrationForm({
  onSubmit,
  loading = false,
  error = "",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    course: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }

    if (!formData.college.trim()) {
      newErrors.college = "Please enter your college.";
    }

    if (!formData.year) {
      newErrors.year = "Please select your year.";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Please enter your course.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <div className="registration-card">
      <div className="registration-header">
        <div className="registration-logo">
          K
        </div>

        <div>
          <span className="registration-label">
            STUDENT REGISTRATION
          </span>

          <h1>Join the Event</h1>

          <p>
            Fill in your details to register and
            continue your application.
          </p>
        </div>
      </div>

      {error && (
        <div className="registration-api-error">
          {error}
        </div>
      )}

      <form
        className="registration-form"
        onSubmit={handleSubmit}
      >
        <div className="registration-grid">
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />

          <Input
            label="College / University"
            name="college"
            placeholder="Enter your college"
            value={formData.college}
            onChange={handleChange}
            error={errors.college}
            required
          />

          <Select
            label="Year of Study"
            name="year"
            value={formData.year}
            onChange={handleChange}
            error={errors.year}
            placeholder="Select your year"
            required
            options={[
              {
                value: "1",
                label: "1st Year",
              },
              {
                value: "2",
                label: "2nd Year",
              },
              {
                value: "3",
                label: "3rd Year",
              },
              {
                value: "4",
                label: "4th Year",
              },
            ]}
          />

          <Input
            label="Course / Branch"
            name="course"
            placeholder="e.g. Information Technology"
            value={formData.course}
            onChange={handleChange}
            error={errors.course}
            required
          />
        </div>

        <div className="registration-submit">
          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={loading}
            fullWidth
          >
            Register & Continue
          </Button>
        </div>

        <p className="registration-note">
          Your information will be securely used
          for this event application.
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;
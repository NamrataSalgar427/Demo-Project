-- Create a new student record
-- Avoid duplicate student rows for the same email across multiple event registrations
INSERT INTO students (name, email, phone, college, year, field_of_study, created_at)
VALUES ($1, $2, $3, $4, $5, $6, NOW())
ON CONFLICT (email) DO UPDATE
  SET name = EXCLUDED.name,
      phone = EXCLUDED.phone,
      college = EXCLUDED.college,
      year = EXCLUDED.year,
      field_of_study = EXCLUDED.field_of_study
RETURNING id, name, email, college, year, field_of_study;
-- Create the application record right after registration
-- Default status is 'registered' — this is the start of the funnel
INSERT INTO applications (registration_id, status, started_at, completed_at)
VALUES ($1, 'registered', NULL, NULL)
RETURNING id, registration_id, status;
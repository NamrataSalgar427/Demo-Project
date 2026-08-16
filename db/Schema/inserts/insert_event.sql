-- Create a new outreach event
-- event_code is generated in application/service layer (e.g. KAT-VIT-2026-01)
INSERT INTO events (event_code, name, college, location, event_date, description, created_by, created_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
RETURNING id, event_code, name, college, location, event_date, created_at;
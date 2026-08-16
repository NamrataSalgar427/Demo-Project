-- Manual insert (fallback if not using a trigger)
-- Logs every status transition for audit/analytics purposes
INSERT INTO status_history (registration_id, old_status, new_status, changed_at)
VALUES ($1, $2, $3, NOW())
RETURNING id, registration_id, old_status, new_status, changed_at;
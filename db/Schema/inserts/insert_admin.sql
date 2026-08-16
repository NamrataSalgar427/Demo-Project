-- Create a new admin account
INSERT INTO admins (name, email, password_hash, role, created_at)
VALUES ($1, $2, $3, $4, NOW())
RETURNING id, name, email, role, created_at;
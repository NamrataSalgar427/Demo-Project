const pool = require("../config/db");
const loadSQL = require("../utils/sqlLoader");

const insertRegistrationQuery =
  loadSQL("insert_registration.sql");

async function createRegistration({
  studentId,
  eventId,
  trackingId,
}) {
  const result = await pool.query(insertRegistrationQuery, [
    studentId,
    eventId,
    trackingId,
  ]);

  return result.rows[0];
}

async function getRegistrationByTrackingId(trackingId) {
  const result = await pool.query(
    `
    SELECT
      r.id,
      r.tracking_id,
      r.student_id,
      r.event_id,
      r.registered_at,
      s.name,
      s.email,
      s.college,
      s.year,
      s.field_of_study,
      e.name AS event_name
    FROM registrations r
    JOIN students s
      ON s.id = r.student_id
    JOIN events e
      ON e.id = r.event_id
    WHERE r.tracking_id = $1
    `,
    [trackingId]
  );

  return result.rows[0] || null;
}

module.exports = {
  createRegistration,
  getRegistrationByTrackingId,
};
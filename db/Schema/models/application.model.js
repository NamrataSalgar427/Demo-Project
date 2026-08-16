const pool = require("../config/db");
const loadSQL = require("../utils/sqlLoader");

const insertApplicationQuery =
  loadSQL("insert_application.sql");

async function createApplication(registrationId) {
  const result = await pool.query(
    insertApplicationQuery,
    [registrationId]
  );

  return result.rows[0];
}

async function getApplicationByRegistrationId(registrationId) {
  const result = await pool.query(
    `
    SELECT
      id,
      registration_id,
      status,
      started_at,
      completed_at
    FROM applications
    WHERE registration_id = $1
    `,
    [registrationId]
  );

  return result.rows[0] || null;
}

async function startApplication(registrationId) {
  const result = await pool.query(
    `
    UPDATE applications
    SET
      status = 'started',
      started_at = NOW()
    WHERE registration_id = $1
    RETURNING *
    `,
    [registrationId]
  );

  return result.rows[0] || null;
}

async function completeApplication(registrationId) {
  const result = await pool.query(
    `
    UPDATE applications
    SET
      status = 'completed',
      completed_at = NOW()
    WHERE registration_id = $1
    RETURNING *
    `,
    [registrationId]
  );

  return result.rows[0] || null;
}

module.exports = {
  createApplication,
  getApplicationByRegistrationId,
  startApplication,
  completeApplication,
};
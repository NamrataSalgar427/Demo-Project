const pool = require("../config/db");
const loadSQL = require("../utils/sqlLoader");

const insertStatusHistoryQuery =
  loadSQL("insert_status_history.sql");

async function createStatusHistory({
  registrationId,
  oldStatus,
  newStatus,
}) {
  const result = await pool.query(
    insertStatusHistoryQuery,
    [
      registrationId,
      oldStatus,
      newStatus,
    ]
  );

  return result.rows[0];
}

async function getStatusHistory(registrationId) {
  const result = await pool.query(
    `
    SELECT
      id,
      registration_id,
      old_status,
      new_status,
      changed_at
    FROM status_history
    WHERE registration_id = $1
    ORDER BY changed_at ASC
    `,
    [registrationId]
  );

  return result.rows;
}

module.exports = {
  createStatusHistory,
  getStatusHistory,
};
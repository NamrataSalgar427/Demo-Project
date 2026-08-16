const pool = require("../config/db");
const loadSQL = require("../utils/sqlLoader");

const insertEventQuery = loadSQL("insert_event.sql");

async function createEvent({
  eventCode,
  name,
  college,
  location,
  eventDate,
  description,
  createdBy,
}) {
  const result = await pool.query(insertEventQuery, [
    eventCode,
    name,
    college,
    location,
    eventDate,
    description,
    createdBy,
  ]);

  return result.rows[0];
}

async function getAllEvents() {
  const result = await pool.query(`
    SELECT
      id,
      event_code,
      name,
      college,
      location,
      event_date,
      description,
      created_by,
      created_at
    FROM events
    ORDER BY created_at DESC
  `);

  return result.rows;
}

async function getEventById(eventId) {
  const result = await pool.query(
    `
    SELECT
      id,
      event_code,
      name,
      college,
      location,
      event_date,
      description,
      created_by,
      created_at
    FROM events
    WHERE id = $1
    `,
    [eventId]
  );

  return result.rows[0] || null;
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
};
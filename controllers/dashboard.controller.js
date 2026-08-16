const pool = require('../config/db');

const getOverview = async (req, res, next) => {
  try {
    const totals = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM events) AS total_events,
        (SELECT COUNT(*) FROM students) AS total_registrations,
        (SELECT COUNT(*) FROM students WHERE status IN ('started','completed')) AS applications_started,
        (SELECT COUNT(*) FROM students WHERE status = 'completed') AS applications_completed
    `);

    const recent = await pool.query(`
      SELECT s.*, e.name AS event_name FROM students s
      JOIN events e ON s.event_id = e.id
      ORDER BY s.registered_at DESC LIMIT 10
    `);

    const t = totals.rows[0];
    const overallConversion = t.total_registrations > 0
      ? ((t.applications_completed / t.total_registrations) * 100).toFixed(1)
      : 0;

    res.json({
      success: true,
      data: {
        totalEvents: Number(t.total_events),
        totalRegistrations: Number(t.total_registrations),
        applicationsStarted: Number(t.applications_started),
        applicationsCompleted: Number(t.applications_completed),
        overallConversionRate: `${overallConversion}%`,
        recentRegistrations: recent.rows
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getOverview };
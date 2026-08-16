const pool = require('../config/db');

const createEvent = async (req, res, next) => {
  try {
    const { name, college, location, eventDate, trackingSlug } = req.body;
    if (!name || !trackingSlug) {
      return res.status(400).json({ success: false, message: 'name and trackingSlug are required' });
    }

    const result = await pool.query(
      `INSERT INTO events (name, college, location, event_date, tracking_slug, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [name, college, location, eventDate, trackingSlug]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const query = `
      SELECT e.*,
        COUNT(s.id) AS total_registrations,
        COUNT(s.id) FILTER (WHERE s.status IN ('started','completed')) AS started,
        COUNT(s.id) FILTER (WHERE s.status = 'completed') AS completed
      FROM events e
      LEFT JOIN students s ON s.event_id = e.id
      GROUP BY e.id
      ORDER BY e.created_at DESC
    `;
    const result = await pool.query(query);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const getEventAnalytics = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const totals = await pool.query(`
      SELECT
        COUNT(*) AS total_registrations,
        COUNT(*) FILTER (WHERE status IN ('started','completed')) AS started,
        COUNT(*) FILTER (WHERE status = 'completed') AS completed
      FROM students WHERE event_id = $1
    `, [eventId]);

    const collegeWise = await pool.query(`
      SELECT college,
        COUNT(*) AS registrations,
        COUNT(*) FILTER (WHERE status = 'completed') AS completed
      FROM students WHERE event_id = $1
      GROUP BY college
    `, [eventId]);

    const t = totals.rows[0];
    const regToStarted = t.total_registrations > 0 ? (t.started / t.total_registrations * 100).toFixed(1) : 0;
    const startedToCompleted = t.started > 0 ? (t.completed / t.started * 100).toFixed(1) : 0;
    const overall = t.total_registrations > 0 ? (t.completed / t.total_registrations * 100).toFixed(1) : 0;

    res.json({
      success: true,
      data: {
        totalRegistrations: Number(t.total_registrations),
        started: Number(t.started),
        completed: Number(t.completed),
        registeredToStartedPct: `${regToStarted}%`,
        startedToCompletedPct: `${startedToCompleted}%`,
        overallConversionPct: `${overall}%`,
        collegeWisePerformance: collegeWise.rows
      }
    });
  } catch (err) {
    next(err);
  }
};

const exportEventData = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const result = await pool.query('SELECT * FROM students WHERE event_id = $1', [eventId]);

    const rows = result.rows;
    if (rows.length === 0) return res.status(404).send('No data found');

    const headers = Object.keys(rows[0]).join(',');
    const csvRows = rows.map(r => Object.values(r).map(v => `"${v ?? ''}"`).join(','));
    const csv = [headers, ...csvRows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=event_${eventId}_export.csv`);
    res.send(csv);
  } catch (err) {
    next(err);
  }
};

module.exports = { createEvent, getEvents, getEventById, getEventAnalytics, exportEventData };
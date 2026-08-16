const pool = require('../config/db');
const generateTrackingId = require('../utils/generateTrackingId');
const { validateRegistration } = require('../utils/validators');

const getEventBySlug = async (req, res, next) => {
  try {
    const { trackingSlug } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE tracking_slug = $1', [trackingSlug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const registerStudent = async (req, res, next) => {
  try {
    const errors = validateRegistration(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }

    const { name, email, phone, college, year, field, trackingSlug } = req.body;

    const eventResult = await pool.query('SELECT id FROM events WHERE tracking_slug = $1', [trackingSlug]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    const eventId = eventResult.rows[0].id;
    const trackingId = generateTrackingId();

    const result = await pool.query(
      `INSERT INTO students (name, email, phone, college, year, field, event_id, tracking_id, status, registered_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'registered', NOW()) RETURNING *`,
      [name, email, phone, college, year, field, eventId, trackingId]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const getApplication = async (req, res, next) => {
  try {
    const { trackingId } = req.params;
    const result = await pool.query('SELECT * FROM students WHERE tracking_id = $1', [trackingId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const startApplication = async (req, res, next) => {
  try {
    const { trackingId } = req.params;
    const check = await pool.query('SELECT status FROM students WHERE tracking_id = $1', [trackingId]);
    if (check.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    if (check.rows[0].status !== 'registered') {
      return res.status(400).json({ success: false, message: 'Application already started or completed' });
    }

    const result = await pool.query(
      `UPDATE students SET status = 'started', started_at = NOW() WHERE tracking_id = $1 RETURNING *`,
      [trackingId]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const completeApplication = async (req, res, next) => {
  try {
    const { trackingId } = req.params;
    const check = await pool.query('SELECT status FROM students WHERE tracking_id = $1', [trackingId]);
    if (check.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    if (check.rows[0].status !== 'started') {
      return res.status(400).json({ success: false, message: 'Application must be started before completing' });
    }

    const result = await pool.query(
      `UPDATE students SET status = 'completed', completed_at = NOW() WHERE tracking_id = $1 RETURNING *`,
      [trackingId]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = { getEventBySlug, registerStudent, getApplication, startApplication, completeApplication };
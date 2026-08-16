const pool = require('../config/db');

const getLeads = async (req, res, next) => {
  try {
    const { event, college, year, status, search } = req.query;
    let query = `
      SELECT s.*, e.name AS event_name
      FROM students s
      JOIN events e ON s.event_id = e.id
      WHERE 1=1
    `;
    const params = [];

    if (event) {
      params.push(event);
      query += ` AND s.event_id = $${params.length}`;
    }
    if (college) {
      params.push(`%${college}%`);
      query += ` AND s.college ILIKE $${params.length}`;
    }
    if (year) {
      params.push(year);
      query += ` AND s.year = $${params.length}`;
    }
    if (status) {
      params.push(status);
      query += ` AND s.status = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (s.name ILIKE $${params.length} OR s.email ILIKE $${params.length} OR s.tracking_id ILIKE $${params.length})`;
    }

    query += ` ORDER BY s.registered_at DESC`;

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
};

const getLeadByTrackingId = async (req, res, next) => {
  try {
    const { trackingId } = req.params;
    const result = await pool.query(
      `SELECT s.*, e.name AS event_name FROM students s
       JOIN events e ON s.event_id = e.id
       WHERE s.tracking_id = $1`,
      [trackingId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const exportLeads = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT s.*, e.name AS event_name FROM students s
      JOIN events e ON s.event_id = e.id
      ORDER BY s.registered_at DESC
    `);
    const rows = result.rows;
    if (rows.length === 0) return res.status(404).send('No data found');

    const headers = Object.keys(rows[0]).join(',');
    const csvRows = rows.map(r => Object.values(r).map(v => `"${v ?? ''}"`).join(','));
    const csv = [headers, ...csvRows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads_export.csv');
    res.send(csv);
  } catch (err) {
    next(err);
  }
};

module.exports = { getLeads, getLeadByTrackingId, exportLeads };
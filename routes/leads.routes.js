const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { getLeads, getLeadByTrackingId, exportLeads } = require('../controllers/leads.controller');

router.use(authMiddleware);

router.get('/export', exportLeads); // must be BEFORE /:trackingId or it'll be treated as an id
router.get('/', getLeads);
router.get('/:trackingId', getLeadByTrackingId);

module.exports = router;
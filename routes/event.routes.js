const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
  createEvent,
  getEvents,
  getEventById,
  getEventAnalytics,
  exportEventData
} = require('../controllers/event.controller');

router.use(authMiddleware); // protects everything below

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:eventId', getEventById);
router.get('/:eventId/analytics', getEventAnalytics);
router.get('/:eventId/export', exportEventData);

module.exports = router;
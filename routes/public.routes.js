const express = require('express');
const router = express.Router();
const {
  getEventBySlug,
  registerStudent,
  getApplication,
  startApplication,
  completeApplication
} = require('../controllers/public.controller');

router.get('/events/:trackingSlug', getEventBySlug);
router.post('/register', registerStudent);
router.get('/application/:trackingId', getApplication);
router.patch('/application/:trackingId/start', startApplication);
router.patch('/application/:trackingId/complete', completeApplication);

module.exports = router;
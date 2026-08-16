const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const leadsRoutes = require('./routes/leads.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const publicRoutes = require('./routes/public.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors());               // React frontend on a different port needs this
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/public', publicRoutes);

app.use(errorMiddleware);

module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const airtimeRoutes = require('./routes/airtime');
const analyticsRoutes = require('./routes/analytics');
const { dbConnect } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database Connection
dbConnect();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/airtime', airtimeRoutes);
app.use('/api/analytics', analyticsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require('express');
const { chatbotResponse } = require('./chatbotController');
const router = express.Router();

router.post('/api/chatbot', chatbotResponse);

module.exports = router;

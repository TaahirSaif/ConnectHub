const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Get Usage Insights
router.get('/usage', authenticateUser, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    const totalSpent = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const transactionCount = transactions.length;

    res.json({ totalSpent, transactionCount, transactions });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
});

module.exports = router;

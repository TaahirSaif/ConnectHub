const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const { topUpAirtime, giftAirtime } = require('../utils/airtimeAPI');

const router = express.Router();

// Top-Up Airtime
router.post('/topup', authenticateUser, async (req, res) => {
  const { amount, phoneNumber } = req.body;
  try {
    const result = await topUpAirtime(phoneNumber, amount);
    res.json({ message: 'Airtime topped up successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Error topping up airtime' });
  }
});

// Gift Airtime
router.post('/gift', authenticateUser, async (req, res) => {
  const { recipient, amount } = req.body;
  try {
    const result = await giftAirtime(req.user.phoneNumber, recipient, amount);
    res.json({ message: 'Airtime gifted successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Error gifting airtime' });
  }
});

module.exports = router;

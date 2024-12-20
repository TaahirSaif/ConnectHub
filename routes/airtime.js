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

const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const DataBundle = require('../models/DataBundle');

const router = express.Router();

// List Data for Sale
router.post('/sell', authenticateUser, async (req, res) => {
  const { bundleSize, price } = req.body;
  try {
    const bundle = await DataBundle.create({
      seller: req.user._id,
      bundleSize,
      price,
    });
    res.status(201).json({ message: 'Data listed for sale', bundle });
  } catch (error) {
    res.status(500).json({ error: 'Error listing data for sale' });
  }
});

// Buy Data Bundle
router.post('/buy', authenticateUser, async (req, res) => {
  const { bundleId } = req.body;
  try {
    const bundle = await DataBundle.findById(bundleId);
    if (!bundle || bundle.status !== 'available') {
      return res.status(404).json({ error: 'Bundle not available' });
    }

    if (req.user.wallet < bundle.price) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }

    // Deduct from buyer, add to seller
    req.user.wallet -= bundle.price;
    const seller = await User.findById(bundle.seller);
    seller.wallet += bundle.price;

    // Update bundle status
    bundle.status = 'sold';
    bundle.buyer = req.user._id;

    await req.user.save();
    await seller.save();
    await bundle.save();

    res.json({ message: 'Bundle purchased successfully', bundle });
  } catch (error) {
    res.status(500).json({ error: 'Error purchasing bundle' });
  }
});

module.exports = router;

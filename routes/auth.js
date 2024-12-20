const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
router.post('/register', async (req, res) => {
  const { name, email, password, referralCode } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const referral = referralCode
      ? await User.findOne({ referralCode })
      : null;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      referralCode: `${name}-${Date.now()}`, // Generate unique referral code
      referredBy: referral ? referral._id : null,
    });

    // Reward referrer
    if (referral) {
      referral.wallet += 50; // Reward amount for referral
      await referral.save();
    }

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// 🔐 Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    // Check if user exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    // Validate password format
    const strongPass = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!strongPass.test(password)) return res.status(400).json({ msg: 'Weak password' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || 'user',
    });

    res.status(201).json({ msg: 'User registered', user: { id: newUser.id, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ error: 'Signup error', detail: err.message });
  }
});

// 🔐 Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:");
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("Password match?", match);

    if (!match) {
      console.log("❌ Password incorrect");
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("✅ Login successful for user:", user.email);
    res.json({ token, role: user.role, userId: user.id });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: 'Login error', detail: err.message });
  }
});

module.exports = router;

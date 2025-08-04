const express = require('express');
const router = express.Router();
const { User, Store, Rating } = require('../models');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware: Auth + Role = admin only
router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

/** 📊 GET: Admin Dashboard Stats */
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    res.status(500).json({ error: 'Dashboard error', detail: err.message });
  }
});

/** ➕ POST: Add New User (admin/user/owner) */
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ msg: 'Email already in use' });

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword, address, role });
    res.status(201).json({ msg: 'User created', user: newUser });
  } catch (err) {
    console.error('🛑 Full error:', err);
    res.status(500).json({ error: 'Create user failed', detail: err.message });
  }
});

/** 👥 GET: All Users (with filtering) */
router.get('/users', async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const where = {};
    if (name) where.name = name;
    if (email) where.email = email;
    if (address) where.address = address;
    if (role) where.role = role;

    const users = await User.findAll({
      where,
      attributes: ['id', 'name', 'email', 'address', 'role'],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get users', detail: err.message });
  }
});

/** 🏬 GET: All Stores (with filters + avg rating) */
router.get('/stores', async (req, res) => {
  try {
    const { name, email, address } = req.query;
    const where = {};
    if (name) where.name = name;
    if (email) where.email = email;
    if (address) where.address = address;

    const stores = await Store.findAll({
      where,
      attributes: ['id', 'name', 'email', 'address'],
      include: [
        {
          model: Rating,
          attributes: ['value'],
        },
      ],
    });

    const storesWithRating = stores.map((store) => {
      const ratings = store.Ratings.map((r) => r.value);
      const avgRating = ratings.length
        ? (ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(2)
        : 'No Ratings';
      return { ...store.toJSON(), avgRating };
    });

    res.json(storesWithRating);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stores', detail: err.message });
  }
});

/** 🏢 POST: Add Store */
router.post('/add-store', async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ message: 'Name, email, and address are required.' });
    }

    const newStore = await Store.create({ name, email, address });
    res.status(201).json(newStore);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add store', error: err.message });
  }
});

// ✅ MUST BE AT THE BOTTOM
module.exports = router;

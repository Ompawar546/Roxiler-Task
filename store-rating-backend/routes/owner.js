const express = require('express');
const router = express.Router();
const { Store, Rating } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['owner']));

/** 📋 GET: Owner's Stores with Ratings */
router.get('/stores', async (req, res) => {
  try {
    // For now fetch all stores (optional: filter by ownerId later)
    const stores = await Store.findAll({
      include: [{ model: Rating }]
    });

    const response = stores.map(store => {
      const ratings = store.Ratings.map(r => r.value);
      const avgRating = ratings.length
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
        : 'No Ratings';

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        avgRating
      };
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stores', detail: err.message });
  }
});

/** ➕ POST: Add a Store */
router.post('/add-store', async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const store = await Store.create({ name, email, address });
    res.status(201).json({ msg: 'Store added', store });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add store', detail: err.message });
  }
});

module.exports = router;

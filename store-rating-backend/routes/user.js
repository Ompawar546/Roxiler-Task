const express = require('express');
const router = express.Router();
const { Store, Rating } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['user']));

/** 👁️ GET: All Stores with Ratings */
router.get('/stores', async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        {
          model: Rating,
          attributes: ['userId', 'value'],
        },
      ],
    });

    const storesWithRating = stores.map((store) => {
      const ratings = store.Ratings.map((r) => r.value);
      const avgRating = ratings.length
        ? (ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(2)
        : 'No Ratings';

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        avgRating,
        userRatings: store.Ratings.map((r) => ({
          userId: r.userId,
          value: r.value,
        })),
      };
    });

    res.json(storesWithRating);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stores', detail: err.message });
  }
});

/** ⭐ POST: Submit Rating */
router.post('/rate/:storeId', async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const userId = req.user.id;
    const { value } = req.body;

    const existing = await Rating.findOne({ where: { userId, storeId } });
    if (existing) return res.status(400).json({ msg: 'You have already rated this store.' });

    const newRating = await Rating.create({ storeId, userId, value });
    res.status(201).json({ msg: 'Rating submitted', rating: newRating });
  } catch (err) {
    res.status(500).json({ error: 'Rating failed', detail: err.message });
  }
});

module.exports = router;

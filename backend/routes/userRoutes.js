// User Routes (routes/userRoutes.js)
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('favorites');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update favorites
router.post('/favorites/:jokeId', verifyToken, async (req, res) => {
    const { jokeId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        if (user.favorites.includes(jokeId)) {
            user.favorites = user.favorites.filter(id => id.toString() !== jokeId);
        } else {
            user.favorites.push(jokeId);
        }
        await user.save();
        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Joke = require('../models/Joke');
const { verifyToken } = require('../middleware/authMiddleware');

// Create a new joke
router.post('/', verifyToken, async (req, res) => {
    const { joke } = req.body;
    try {
        const newJoke = new Joke({ joke, author: req.user.id });
        await newJoke.save();
        res.status(201).json(newJoke);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all jokes
router.get('/', async (req, res) => {
    try {
        const jokes = await Joke.find().populate('author', 'username');
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a joke
router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { joke } = req.body;
    try {
        const updatedJoke = await Joke.findByIdAndUpdate(
            id,
            { joke },
            { new: true }
        );
        res.json(updatedJoke);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a joke
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await Joke.findByIdAndDelete(id);
        res.json({ msg: 'Joke deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

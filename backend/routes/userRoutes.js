const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Get user details by userId
router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

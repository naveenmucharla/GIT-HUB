const express = require('express');
const LegalAidProfile = require('../models/legal_profile'); // Assuming you have this model for 'legalprofiles'
const bcrypt = require('bcrypt'); // Using bcrypt for password hashing
const router = express.Router();

// POST route for login
router.post('/api/login-legal-aid-profile', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await LegalAidProfile.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'Username not found' });
        }

        // Compare the entered password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If login is successful, send profile data
        res.json({
            name: user.name,
            email: user.email,
            contact: user.contact,
            license: user.license,
            specialization: user.specialization
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const PrisonerProfile = require('../models/p_profile'); // Import the correct model

// Route to fetch prisoner profile by secret code (s_code)
router.get('/api/prisoner-profile/:s_code', async (req, res) => {
    const { s_code } = req.params;  // Get the secret code from the URL

    try {
        // Find the profile in the prisoner_profile collection by secret code
        const profile = await PrisonerProfile.findOne({ s_code });

        if (!profile) {
            // If no profile is found, return a 404 error
            return res.status(404).json({ message: 'Profile not found.' });
        }

        // If a profile is found, return it as JSON
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'An error occurred while fetching the profile.' });
    }
});

// Route to save prisoner profile
router.post('/api/prisoner-profile', async (req, res) => {
    const profileData = req.body;

    try {
        const existingProfile = await PrisonerProfile.findOne({ s_code: profileData.s_code });

        if (existingProfile) {
            return res.status(400).json({ message: 'Profile with this secret code already exists.' });
        }

        const newProfile = new PrisonerProfile(profileData);
        await newProfile.save();

        res.status(201).json({ message: 'Profile created successfully.', profile: newProfile });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ message: 'An error occurred while saving the profile.' });
    }
});

module.exports = router;
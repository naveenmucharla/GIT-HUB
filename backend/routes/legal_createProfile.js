const express = require('express');
const multer = require('multer');
const path = require('path');
const LegalAidProfile = require('../models/legal_createProfile');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/legal_profile'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST route to save or update a profile
router.post('/api/update-legal-aid-profile', upload.single('profile-photo'), async (req, res) => {
    const { name, email, contact, license, degree, specialization, experience, location, address } = req.body;

    try {
        // Check if the email already exists
        let existingProfile = await LegalAidProfile.findOne({ email });

        if (existingProfile) {
            return res.status(400).json({ message: 'Email is already in use. Please use a different email address.' });
        }

        // Check if the license number already exists
        let existingLicense = await LegalAidProfile.findOne({ license });

        if (existingLicense) {
            return res.status(400).json({ message: 'License number is already in use. Please use a different license number.' });
        }

        // Create a new profile since email and license are unique
        const profile = new LegalAidProfile({
            name,
            email,
            contact,
            license,
            degree,
            specialization,
            experience,
            location,
            address,
            profilePhoto: req.file ? req.file.path : undefined // Save file path
        });

        await profile.save();
        res.json({ message: 'Profile created successfully!', profile });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ message: 'Error saving profile', error });
    }
});

module.exports = router;

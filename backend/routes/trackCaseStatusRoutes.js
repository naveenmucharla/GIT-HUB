const express = require('express');
const TrackCaseStatus = require('../models/trackCaseStatus');

const router = express.Router();

// Get Bail Status by Case ID
router.get('/', async (req, res) => {
    const { case_id } = req.query;

    try {
        const caseDetails = await TrackCaseStatus.findOne({ case_id });

        if (!caseDetails) {
            return res.status(404).json({ error: 'Case ID not found' });
        }

        res.status(200).json(caseDetails);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update or Add Case Status
router.post('/', async (req, res) => {
    const { case_id, application_status, last_updated, expected_decision } = req.body;

    try {
        const updatedCase = await TrackCaseStatus.findOneAndUpdate(
            { case_id },
            { application_status, last_updated, expected_decision },
            { new: true, upsert: true } // Create a new document if none exists
        );

        res.status(200).json({ message: 'Case status updated successfully', data: updatedCase });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

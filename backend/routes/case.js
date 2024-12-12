const express = require("express");
const router = express.Router();
const CaseDetail = require("../models/casedetail"); // Correct path to the model

// Route to fetch case details by case number
router.get("/case/:caseNumber", async (req, res) => {
    try {
        const caseNumber = req.params.caseNumber;

        // Query the database to find the case
        const caseData = await CaseDetail.findOne({ caseNumber });

        if (!caseData) {
            // If no case is found
            return res.status(404).json({
                success: false,
                message: "Case not found or invalid case number.",
            });
        }

        // If case is found, return the details
        return res.status(200).json({
            success: true,
            message: "Case details retrieved successfully.",
            data: caseData,
        });
    } catch (error) {
        // Handle server errors
        console.error("Error fetching case details:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching case details.",
        });
    }
});

module.exports = router;  // Export the router to use in server.js

const express = require('express');
const router = express.Router();
const SearchPrisoner = require('../models/search_prisoner');

// Search for a prisoner based on the search criteria
// Endpoint to search prisoner by case number
router.get('/search-prisoner', async (req, res) => {
  const { query } = req.query; // case_number

  if (!query) {
    return res.status(400).json({ message: 'Case number is required' });
  }

  try {
    // Search for the prisoner by case number in the database
    const prisoner = await Prisoner.findOne({ case_number: query });

    if (!prisoner) {
      return res.status(404).json({ message: 'Prisoner not found for the given case number' });
    }

    // If found, return the prisoner details
    res.status(200).json(prisoner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching prisoner details.' });
  }
});
// Export the router to be used in other parts of the app
module.exports = router;

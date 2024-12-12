// controllers/p_userController.js
const Prisoner = require('../models/p_prisonerModel');

const getPrisonerProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const prisoner = await Prisoner.findOne({ username });

    if (!prisoner) {
      return res.status(404).json({ error: 'Prisoner not found.' });
    }

    res.status(200).json(prisoner);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching prisoner profile.' });
  }
};

module.exports = {
  getPrisonerProfile,
};

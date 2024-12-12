const mongoose = require('mongoose');

const prisonerSchema = new mongoose.Schema(
  {
    s_code: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, unique: true }, // Optional but should be unique if provided
    charges: { type: String, required: true },
    nature: { type: String, required: true },
    statutes: { type: String, required: true },
    courtCaseNumber: { type: String, unique: true, required: true },
    courtName: { type: String, required: true },
    dateArrest: { type: Date, required: true },
    timeServed: { type: Number, required: true },
  },
  { collection: 'prisoner_profile' } // Define the collection name explicitly
);

const Prisoner = mongoose.model('Prisoner', prisonerSchema);

module.exports = Prisoner;

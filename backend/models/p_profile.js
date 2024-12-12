const mongoose = require('mongoose');

// Define the schema for the prisoner_profile collection
const prisonerProfileSchema = new mongoose.Schema({
    s_code: { type: String, required: true, unique: true },  // Secret Code
    username: String,
    name: String,
    dob: Date,
    gender: String,
    address: String,
    contact: String,
    email: String,
    charges: String,
    nature: String,
    statutes: String,
    courtCaseNumber: String,
    courtName: String,
    dateArrest: Date,
    timeServed: Number
});

// Create the model for the prisoner_profile collection
const PrisonerProfile = mongoose.model('PrisonerProfile', prisonerProfileSchema, 'prisoner_profile');

module.exports = PrisonerProfile;
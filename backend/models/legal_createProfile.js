const mongoose = require('mongoose');

// Schema for legal profile
const legalAidProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    license: { type: String, required: true },
    degree: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    profilePhoto: { type: String }, // File path for the uploaded photo
}, { timestamps: true });

module.exports = mongoose.model('legal_profile', legalAidProfileSchema); // Collection name is legal_profile

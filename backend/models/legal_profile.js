const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the Legal Aid Profile
const legalAidProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure the email is unique
    },
    contact: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true,
        unique: true // Ensure the license number is unique
    },
    degree: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: false // Profile photo is optional
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensure the username is unique
    },
    password: {
        type: String,
        required: true // Password field
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Pre-save hook to hash password before storing it
legalAidProfileSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create a model for the schema, and specify the collection name 'legalprofiles'
const LegalAidProfile = mongoose.model('LegalAidProfile', legalAidProfileSchema, 'legalprofiles');

module.exports = LegalAidProfile;

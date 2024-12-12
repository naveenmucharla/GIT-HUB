const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    caseStatus: { type: String, required: true },
    nextHearing: { type: Date, required: true },
    bailEligibility: { type: String, required: true },
    legalInfo: {
        offense: { type: String, required: true },
        section: { type: String, required: true },
        eligibility: { type: String, required: true },
    },
    timeline: {
        timeServed: { type: String, required: true },
        eligibilityTimeline: { type: String, required: true },
    },
});

module.exports = mongoose.model('User', userSchema);

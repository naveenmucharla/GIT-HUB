const mongoose = require('mongoose');

const trackCaseStatusSchema = new mongoose.Schema({
    case_id: { type: String, required: true, unique: true },
    application_status: { type: String, required: true },
    last_updated: { type: Date, required: true },
    expected_decision: { type: Date, required: true },
});

module.exports = mongoose.model('TrackCaseStatus', trackCaseStatusSchema);

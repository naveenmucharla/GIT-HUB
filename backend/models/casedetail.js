const mongoose = require("mongoose");

const caseDetailsSchema = new mongoose.Schema({
    caseNumber: { type: String, required: true, unique: true },
    offenderName: { type: String, required: true },
    offense: { type: String, required: true },
    durationServed: { type: String },
    arrestDate: { type: String },
    judicialPronouncements: { type: String },
    remarks: { type: String },
});

module.exports = mongoose.model("CaseDetail", caseDetailsSchema, "case_details");

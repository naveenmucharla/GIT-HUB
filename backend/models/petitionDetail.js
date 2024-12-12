const mongoose = require('mongoose');

const petitionDetailSchema = new mongoose.Schema({
  fullName: String,
  caseNumber: String,
  courtName: String,
  contactDetails: String,
  bailReasons: String,
  bailAmount: Number,
  duration: Number,
  firCopy: String, // Store file path
  chargeSheet: String, // Store file path
  medicalRecords: String, // Store file path
  identityProof: String, // Store file path
  previousBail: String, // Store file path
  declaration: { type: Boolean, required: true } 
});

const PetitionDetail = mongoose.model('PetitionDetail', petitionDetailSchema);

module.exports = PetitionDetail;

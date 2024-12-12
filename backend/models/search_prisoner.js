const mongoose = require('mongoose');

// Define the schema for prisoner search
const searchPrisonerSchema = new mongoose.Schema({
  case_number: { type: String, required: true, unique: true },
  personalDetails: {
    fullName: String,
    age: Number,
    gender: String,
    identificationNumber: String,
  },
  contactInformation: {
    phone: String,
    email: String,
  },
  permanentAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  caseInformation: {
    chargesFramed: [String],
    dateOfArrest: Date,
    dateOfCourtAppearance: Date,
    durationOfImprisonmentServed: Number,
    case_number: String,
  },
  bailStatus: {
    bailGranted: Boolean,
    bailDenialReason: String,
    bailAmount: Number,
    bailConditions: String,
  },
  offenseDetails: [{
    offenseCategory: String,
    offenseDescription: String,
    penalProvisions: String,
    offenseDate: Date,
    investigationStatus: String,
    convictionStatus: String,
  }],
  judicialPronouncements: {
    rulingSummary: String,
  },
  precedents: [String],
  proceduralRequirements: {
    suretyBonds: String,
    fines: Number,
  },
  riskAssessment: {
    escapeRisk: String,
    influenceOnEvidence: String,
  },
  bailEligibility: {
    eligibilityStatus: String,
    criteriaMet: [String],
    criteriaUnmet: [String],
  },
  familyDetails: {
    familyContact: String,
    familyAddress: String,
    nextOfKin: String,
    relationship: String,
  },
  healthDetails: {
    medicalConditions: [String],
    medications: [String],
    doctorDetails: {
      doctorName: String,
      doctorContact: String,
    },
  },
  workDetails: {
    occupationBeforeImprisonment: String,
    skills: [String],
  },
  releaseDetails: {
    expectedReleaseDate: Date,
  }
}, {
  collection: 'Prison_database',  // Specify the collection name here
});

// Create a model using the schema
const SearchPrisoner = mongoose.model('SearchPrisoner', searchPrisonerSchema);

module.exports = SearchPrisoner;

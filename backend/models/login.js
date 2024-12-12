const mongoose = require('mongoose');


// Schema for Login (General Schema for all roles)
const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String // Role will be 'prisoner', 'legal', or 'judge'
});

// Schema for Prisoner Account (Account details for Prisoners)
const prisonerAccountSchema = new mongoose.Schema({
    name: String,
    case_number: String,
    username: String,
    password: String,
    email: String,
    phone_number: String,
    aadhar_number: String,
    address: String,
    
});

// Schema for Legal Aid Provider Account (Account details for Legal Aid Providers)
const legalAccountSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    legalId: String,
    contact: String,
    aadhar: String,
    barCouncil: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    documents: String // File name or URL for the documents
});

// Schema for Judge Account (Account details for Judges)
const judgeAccountSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    aadhar: String,
    judicial_id: String,
    contact: String,
    address: String,
    city: String,
    state: String,
    zipcode: String
});

// Models for different roles
const PrisonerLogin = mongoose.model('PrisonerLogin', loginSchema, 'prisoner_login');
const LegalLogin = mongoose.model('LegalLogin', loginSchema, 'legal_login');
const JudgeLogin = mongoose.model('JudgeLogin', loginSchema, 'judge_login');
const PrisonerAccount = mongoose.model('PrisonerAccount', prisonerAccountSchema, 'prisoner_account');
const LegalAccount = mongoose.model('LegalAccount', legalAccountSchema, 'legal_account');
const JudgeAccount = mongoose.model('JudgeAccount', judgeAccountSchema, 'judge_account');

// Export the models
module.exports = {
    PrisonerLogin,
    LegalLogin,
    JudgeLogin,
    PrisonerAccount,
    LegalAccount,
    JudgeAccount
};
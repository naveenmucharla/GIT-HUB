// Login Route (Handles login for all roles)
const express = require("express");
const path = require('path');
const { PrisonerLogin, LegalLogin, JudgeLogin, PrisonerAccount, LegalAccount, JudgeAccount } = require("./models/login");
const router = express.Router();
// Initialize Express app
const app = express();

router.post('/login/:role', async (req, res) => {
    const { username, password } = req.body;
    const role = req.params.role.toLowerCase();

    try {
        let user;
        if (role === 'prisoner') {
            user = await PrisonerLogin.findOne({ username, password, role: 'prisoner' });
        } else if (role === 'legal') {
            user = await LegalLogin.findOne({ username, password, role: 'legal' });
        } else if (role === 'judge') {
            user = await JudgeLogin.findOne({ username, password, role: 'judge' });
        }

        if (user) {
            res.redirect(`/${role}_dashboard.html`);
        } else {
            res.send(`<h2>Invalid username or password for ${role}. Please try again.</h2>`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('An error occurred during login.');
    }
});

// Route for Prisoner Account Creation
router.post('/submit_prisoner_account', async (req, res) => {
    const { name, case_number, username, password, email, phone_number, aadhar_number, address, crime_details , case_status } = req.body;

    try {
        // Create a new prisoner account
        const newPrisoner = new PrisonerAccount({
            name,
            case_number,
            username,
            password,
            email,
            phone_number,
            aadhar_number,
            address
            
            });

        // Save prisoner account to the database
        await newPrisoner.save();

        // Also add login credentials to prisoner_login collection
        const newPrisonerLogin = new PrisonerLogin({
            username,
            password,
            role: 'prisoner'
        });

        await newPrisonerLogin.save();

        res.send('<h2>Prisoner account created successfully!</h2>');
    } catch (error) {
        console.error('Error creating prisoner account:', error);
        res.status(500).send('Error creating prisoner account.');
    }
});

// Route for Legal Aid Provider Account Creation
router.post('/submit_legal_aid_account', async (req, res) => {
    const { name, username, password, email, legalId, contact, aadhar, barCouncil, address, temporary_address, city, state, zipcode, documents } = req.body;

    try {
        // Create a new Legal Aid Provider account
        const newLegalAidAccount = new LegalAccount({
            username,
            password,
            name,
            email,
            legalId,
            contact,
            aadhar,
            barCouncil,
            address,
            city,
            state,
            zipcode,
            documents // Ensure this is passed correctly
        });

        // Save Legal Aid Provider account to the database
        await newLegalAidAccount.save();

        // Also add login credentials to legal_login collection
        const newLegalLogin = new LegalLogin({
            username,
            password,
            role: 'legal'
        });

        await newLegalLogin.save();

        res.send('<h2>Legal Aid Provider account created successfully!</h2>');
    } catch (error) {
        console.error('Error creating Legal Aid Provider account:', error);
        res.status(500).send('Error creating Legal Aid Provider account.');
    }
});

// Route for Judge Account Creation
router.post('/submit_judicial_account', async (req, res) => {
    const { name, username, password, email, aadhar, judicial_id, contact, address, city, state, zipcode } = req.body;

    try {
        // Create a new Judge account
        const newJudgeAccount = new JudgeAccount({
            name,
            username,
            password,
            email,
            aadhar,
            judicial_id,
            contact,
            address,
            city,
            state,
            zipcode
        });

        // Save Judge account to the database
        await newJudgeAccount.save();

        // Also add login credentials to judge_login collection
        const newJudgeLogin = new JudgeLogin({
            username,
            password,
            role: 'judge'
        });

        await newJudgeLogin.save();

        res.send('<h2>Judge account created successfully!</h2>');
    } catch (error) {
        console.error('Error creating Judge account:', error);
        res.status(500).send('Error creating Judge account.');
    }
});

// Serve the login page
router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'frontend', 'index.html');
    res.sendFile(indexPath);
});

// Serve dashboard pages
app.get('/prisoner_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, '..', 'frontend', 'prisoner_dashboard.html');
    res.sendFile(dashboardPath);
});

app.get('/legal_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, '..', 'frontend', 'legal_dashboard.html');
    res.sendFile(dashboardPath);
});

app.get('/judge_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, '..', 'frontend', 'judge_dashboard.html');
    res.sendFile(dashboardPath);
});

module.exports = router;
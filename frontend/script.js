const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, JS) from the 'frontend' directory
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Serve everything from 'frontend' folder

// Dummy user data for login verification (replace with a database in production)
const users = {
    prisoner: { username: 'prisoner1', password: 'password123' },
    police: { username: 'police1', password: 'password123' },
    legal: { username: 'legal1', password: 'password123' },
    judge: { username: 'judge1', password: 'password123' }
};

// Route for handling login POST requests for each role
app.post('/login/:role', (req, res) => {
    const { username, password } = req.body;
    const role = req.params.role.toLowerCase(); // Ensure the role is case-insensitive

    // Check if role exists in the users object
    if (users[role] && users[role].username === username && users[role].password === password) {
        res.redirect(`/${role}_dashboard.html`); // Redirect to the corresponding dashboard
    } else {
        res.send(`<h2>Invalid username or password for ${role.charAt(0).toUpperCase() + role.slice(1)}. Please try again.</h2>`);
    }
});

// Serve the login page (index.html)
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'frontend', 'index.html');
    res.sendFile(indexPath); // Ensure correct path to index.html
});

// Serve dashboard pages based on role
app.get('/prisoner_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, '..', 'frontend', 'prisoner_dashboard.html');
    res.sendFile(dashboardPath);
});

app.get('/police_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, '..', 'frontend', 'police_dashboard.html');
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

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
// JavaScript for switching between login forms
function showForm(role) {
    // Hide all forms
    const forms = document.querySelectorAll('.login-form');
    forms.forEach(form => {
        form.classList.remove('active');
    });

    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Add 'active' class to the clicked tab and show the corresponding form
    document.getElementById(`${role}-tab`).classList.add('active');
    document.getElementById(`${role}-form`).classList.add('active');
}

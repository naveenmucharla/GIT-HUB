const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
const CaseDetails = require('./casedetails');
const caseRouter = require("./routes/case"); // Adjust the path if needed
const PetitionDetail = require('./models/petitionDetail'); 
const trackCaseStatusRoutes = require('./routes/trackCaseStatusRoutes');
const userRoutes = require('./routes/userRoutes');
const prisonerRoutes = require('./routes/prisonerRoutes');
const PrisonerRoutes = require('./routes/p_prisonerRoutes'); 
const searchPrisonerRoutes = require('./routes/search_prisoner');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection URI
const mongoURI = 'mongodb+srv://bailreckoner07:bailreckoner@cluster1.lg93d.mongodb.net/project1';

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//LOGIN??
// Use routes defined in the routes file
app.use(routes);

// Serve the login page
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'frontend', 'index.html');
    res.sendFile(indexPath);
});

// Serve dashboard pages
app.get('/prisoner_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, 'frontend', 'prisoner_dashboard.html');
    res.sendFile(dashboardPath);
});

app.get('/legal_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, 'frontend', 'legal_dashboard.html');
    res.sendFile(dashboardPath);
});

app.get('/judge_dashboard.html', (req, res) => {
    const dashboardPath = path.join(__dirname, 'frontend', 'judge_dashboard.html');
    res.sendFile(dashboardPath);
});




// Use the case details router
app.use("/api", caseRouter);


// S

// Define the storage configuration for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Folder to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Unique file name with timestamp
  }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// Route to handle petition form submission (with file uploads)
app.post('/submit-petition', upload.fields([
    { name: 'firCopy' },
    { name: 'chargeSheet' },
    { name: 'medicalRecords' },
    { name: 'identityProof' },
    { name: 'previousBail' }
  ]), async (req, res) => {
    try {
      // Log the received files and fields for debugging
      console.log("Received files:", req.files);
      console.log("Received form data:", req.body);
  
      // Convert the checkbox value to Boolean
      const declarationValue = req.body.declaration === 'on' ? true : false;
  
      // Handle files, ensuring the paths are correctly assigned
      const petitionDetail = new PetitionDetail({
        fullName: req.body.fullName,
        caseNumber: req.body.caseNumber,
        courtName: req.body.courtName,
        contactDetails: req.body.contactDetails,
        bailReasons: req.body.bailReasons,
        bailAmount: req.body.bailAmount,
        duration: req.body.duration,
        firCopy: req.files['firCopy'] ? req.files['firCopy'][0].path : '', // Handle missing file
        chargeSheet: req.files['chargeSheet'] ? req.files['chargeSheet'][0].path : '',
        medicalRecords: req.files['medicalRecords'] ? req.files['medicalRecords'][0].path : '',
        identityProof: req.files['identityProof'] ? req.files['identityProof'][0].path : '',
        previousBail: req.files['previousBail'] ? req.files['previousBail'][0].path : '',
        declaration: declarationValue // Use the converted Boolean value
      });
  
      // Log the petitionDetail to ensure all data is correct
      console.log("Petition detail to save:", petitionDetail);
  
      // Save the petition detail to the database
      await petitionDetail.save();
  
      // Send success response
      res.json({
        success: true,
        redirectUrl: '/case_details.html',
    });
    } catch (error) {
      // Log the error for debugging
      console.error('Error submitting petition:', error);
      res.status(500).send('Error submitting petition.');
    }
  });
  
//TRACKCASESTATUS

// Routes
app.use('/track_bail_status', trackCaseStatusRoutes);

//PRISONERDASHBOARD
// Routes
app.use('/api', userRoutes);

// Routes_prisoner_details(p_profile)
app.use('/api/prisoners', prisonerRoutes);

// Serve Uploaded Files
app.use('/uploads', express.static('uploads'));

// Use the routes
app.use(PrisonerRoutes);

//legal create profile start
app.use('/uploads/legal_profile', express.static(path.join(__dirname, 'uploads/legal_profile')));
// Routes
const legalCreateProfileRoutes = require('./routes/legal_createProfile');
app.use(legalCreateProfileRoutes); // Legal aid provider profile route

// Default route
app.get('/', (req, res) => {
    res.send('Server is running. Go to /api endpoints to interact.');
});
//legal create profile end

//legal fetch profile
const legalProfileRoutes = require('./routes/legal_profile');
app.use(legalProfileRoutes);
//end

app.use('/api', searchPrisonerRoutes); // Use the route for prisoner search



// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

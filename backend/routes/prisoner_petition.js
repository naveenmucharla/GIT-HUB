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
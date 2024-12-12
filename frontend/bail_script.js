// Add event listener for Bail Eligibility form submission
document.getElementById("bail-eligibility-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    const offense = document.getElementById("offense").value;
    const timeServed = parseInt(document.getElementById("time-served").value);
    const sentenceLength = parseInt(document.getElementById("sentence-length").value);
    const charges = document.getElementById("charges").value.split(',').map(charge => charge.trim());
    const escapeRisk = document.getElementById("escape-risk").checked;
    const witnessTampering = document.getElementById("witness-risk").checked;

    // Validate inputs
    if (isNaN(timeServed) || isNaN(sentenceLength)) {
        alert("Please enter valid numbers for time served and sentence length.");
        return;
    }

    // Calculate bail eligibility
    const eligibilityMessage = checkEligibility(offense, timeServed, sentenceLength, charges, escapeRisk, witnessTampering);

    // Display the eligibility result
    document.getElementById("eligibility-result").innerHTML = `<p>${eligibilityMessage}</p>`;
});

// Bail eligibility logic
function checkEligibility(offense, timeServed, sentenceLength, charges, escapeRisk, witnessTampering) {
    let eligibilityMessage = "";

    // Check for complex charges
    if (charges.includes("cyber-crime") || charges.includes("economic-offense")) {
        eligibilityMessage += "Charges involve complex legal provisions. Further review is required. ";
    }

    // Bail eligibility based on offense type and time served
    if (offense === "violent" && timeServed < 6) {
        eligibilityMessage += "You are not eligible for bail due to the violent nature of the offense and insufficient time served. ";
    } else if (timeServed >= sentenceLength) {
        eligibilityMessage += "You are eligible for bail as you have served the full sentence. ";
    } else if (timeServed >= sentenceLength / 2) {
        eligibilityMessage += "You may be eligible for bail, but further review is required. ";
    } else {
        eligibilityMessage += "You are not yet eligible for bail based on the time served. ";
    }

    // Consider judge's discretion based on risk factors
    if (escapeRisk) {
        eligibilityMessage += "There is a risk of escape, which may influence bail eligibility. ";
    }
    if (witnessTampering) {
        eligibilityMessage += "There is a risk of witness tampering, which may influence bail eligibility. ";
    }

    // Judicial Pronouncement on bail eligibility
    if (timeServed >= sentenceLength / 2) {
        eligibilityMessage += "According to judicial pronouncements, you may be eligible for bail after serving half of the prescribed sentence.";
    }

    return eligibilityMessage;
}

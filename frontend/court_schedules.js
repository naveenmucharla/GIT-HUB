// Open the modal to update the schedule
function updateSchedule(caseNumber) {
    // Open the modal
    const modal = document.getElementById("update-modal");
    modal.style.display = "block";

    // Fill the modal with the case details (You can get the actual data here from the backend or predefined values)
    document.getElementById("case-number").value = caseNumber;
}

// Close the modal
function closeModal() {
    const modal = document.getElementById("update-modal");
    modal.style.display = "none";
}

// Save the updated schedule (Here you can make an API call or update the table manually)
function saveSchedule(event) {
    event.preventDefault(); // Prevent form submission

    const caseNumber = document.getElementById("case-number").value;
    const hearingDate = document.getElementById("hearing-date").value;
    const hearingStatus = document.getElementById("hearing-status").value;

    // Here you would typically send the updated schedule data to your backend (e.g., using an API)
    // For now, let's log the updated data
    console.log(`Updated Schedule:
    Case Number: ${caseNumber}
    Hearing Date: ${hearingDate}
    Hearing Status: ${hearingStatus}`);

    // After saving the schedule, you can update the table
    const scheduleList = document.getElementById("schedule-list");
    const rows = scheduleList.getElementsByTagName("tr");

    // Find the row corresponding to the case number and update the status and date
    for (let row of rows) {
        const caseCell = row.cells[0];
        if (caseCell.textContent == caseNumber) {
            row.cells[2].textContent = hearingDate;
            row.cells[3].textContent = hearingStatus;
            break;
        }
    }

    // Close the modal after saving
    closeModal();
}

// Function to filter schedules based on the search or filter options
function filterSchedules() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filterOption = document.getElementById("filter").value;
    const scheduleList = document.getElementById("schedule-list");
    const rows = scheduleList.getElementsByTagName("tr");

    for (let row of rows) {
        const caseNumber = row.cells[0].textContent.toLowerCase();
        const prisonerName = row.cells[1].textContent.toLowerCase();
        const hearingDate = row.cells[2].textContent.toLowerCase();
        const hearingStatus = row.cells[3].textContent.toLowerCase();

        // Apply the filter based on search query and selected filter option
        const matchesSearch = caseNumber.includes(searchQuery) || prisonerName.includes(searchQuery);
        const matchesFilter = filterOption === "all" || hearingStatus === filterOption;

        if (matchesSearch && matchesFilter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

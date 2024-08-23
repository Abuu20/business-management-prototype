// Get references to form elements
const attendanceForm = document.getElementById('attendanceForm');
const recordContainer = document.getElementById('recordContainer');
const reportContainer = document.getElementById('reportContainer');
const loadingIndicator = document.getElementById('loadingIndicator');
const successMessage = document.getElementById('successMessage');

// Utility function to show and hide loading indicator
function toggleLoading(show) {
    loadingIndicator.style.display = show ? 'block' : 'none';
}

// Utility function to show success message
function showSuccessMessage() {
    successMessage.style.display = 'block';
    setTimeout(() => successMessage.style.display = 'none', 3000);
}

// Load existing attendance records from localStorage
let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];

// Save attendance records to localStorage
function saveRecords() {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
}

// Render attendance records in the container
function renderRecords() {
    recordContainer.innerHTML = '';
    attendanceRecords.forEach((record, index) => {
        recordContainer.innerHTML += `
            <div class="record">
                <strong>${record.name}</strong> - ${record.date} - ${record.status}
                <button onclick="editRecord(${index})">Edit</button>
                <button onclick="deleteRecord(${index})">Delete</button>
            </div>
        `;
    });
}

// Add new attendance record
attendanceForm.addEventListener('submit', function(e) {
    e.preventDefault();
    toggleLoading(true);
    
    const newRecord = {
        name: document.getElementById('studentName').value,
        date: document.getElementById('attendanceDate').value,
        status: document.getElementById('status').value
    };
    
    attendanceRecords.push(newRecord);
    saveRecords();
    renderRecords();
    
    attendanceForm.reset();
    toggleLoading(false);
    showSuccessMessage();
});

// Edit existing attendance record
function editRecord(index) {
    const record = attendanceRecords[index];
    document.getElementById('studentName').value = record.name;
    document.getElementById('attendanceDate').value = record.date;
    document.getElementById('status').value = record.status;
    
    attendanceRecords.splice(index, 1);
    saveRecords();
    renderRecords();
}

// Delete attendance record
function deleteRecord(index) {
    attendanceRecords.splice(index, 1);
    saveRecords();
    renderRecords();
    showSuccessMessage();
}

// Generate attendance report
document.getElementById('generateReport').addEventListener('click', function() {
    reportContainer.innerHTML = '';
    const reportData = {};
    
    attendanceRecords.forEach(record => {
        if (!reportData[record.name]) {
            reportData[record.name] = { Present: 0, Absent: 0 };
        }
        reportData[record.name][record.status]++;
    });
    
    for (const student in reportData) {
        const presentDays = reportData[student].Present;
        const totalDays = presentDays + reportData[student].Absent;
        const attendancePercentage = (presentDays / totalDays) * 100;
        
        reportContainer.innerHTML += `
            <div class="report">
                <strong>${student}</strong> - Present: ${presentDays}, Absent: ${totalDays - presentDays}, Attendance: ${attendancePercentage.toFixed(2)}%
            </div>
        `;
    }
});

// Export attendance data to CSV
document.getElementById('exportCSV').addEventListener('click', function() {
    let csvContent = "data:text/csv;charset=utf-8,Name,Date,Status\n";
    attendanceRecords.forEach(record => {
        csvContent += `${record.name},${record.date},${record.status}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_records.csv");
    document.body.appendChild(link);
    link.click();
});

// Initial render
renderRecords();

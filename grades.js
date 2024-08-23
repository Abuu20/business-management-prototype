// Get references to form elements
const gradeForm = document.getElementById('gradeForm');
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

// Load existing grade records from localStorage
let gradeRecords = JSON.parse(localStorage.getItem('gradeRecords')) || [];

// Save grade records to localStorage
function saveRecords() {
    localStorage.setItem('gradeRecords', JSON.stringify(gradeRecords));
}

// Render grade records in the container
function renderRecords() {
    recordContainer.innerHTML = '';
    gradeRecords.forEach((record, index) => {
        recordContainer.innerHTML += `
            <div class="record">
                <strong>${record.name}</strong> - ${record.subject} - ${record.assessment}: ${record.grade}
                <button onclick="editRecord(${index})">Edit</button>
                <button onclick="deleteRecord(${index})">Delete</button>
            </div>
        `;
    });
}

// Add new grade record
gradeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    toggleLoading(true);
    
    const newRecord = {
        name: document.getElementById('studentName').value,
        subject: document.getElementById('subject').value,
        assessment: document.getElementById('assessment').value,
        grade: document.getElementById('grade').value
    };
    
    gradeRecords.push(newRecord);
    saveRecords();
    renderRecords();
    
    gradeForm.reset();
    toggleLoading(false);
    showSuccessMessage();
});

// Edit existing grade record
function editRecord(index) {
    const record = gradeRecords[index];
    document.getElementById('studentName').value = record.name;
    document.getElementById('subject').value = record.subject;
    document.getElementById('assessment').value = record.assessment;
    document.getElementById('grade').value = record.grade;
    
    gradeRecords.splice(index, 1);
    saveRecords();
    renderRecords();
}

// Delete grade record
function deleteRecord(index) {
    gradeRecords.splice(index, 1);
    saveRecords();
    renderRecords();
    showSuccessMessage();
}

// Generate grade report
document.getElementById('generateReport').addEventListener('click', function() {
    reportContainer.innerHTML = '';
    const reportData = {};
    
    gradeRecords.forEach(record => {
        if (!reportData[record.name]) {
            reportData[record.name] = [];
        }
        reportData[record.name].push({ subject: record.subject, assessment: record.assessment, grade: record.grade });
    });
    
    for (const student in reportData) {
        let studentReport = `<strong>${student}</strong>:<ul>`;
        let totalGrades = 0;
        let totalCount = 0;
        
        reportData[student].forEach(entry => {
            studentReport += `<li>${entry.subject} - ${entry.assessment}: ${entry.grade}</li>`;
            totalGrades += parseFloat(entry.grade);
            totalCount++;
        });
        
        const averageGrade = (totalGrades / totalCount).toFixed(2);
        studentReport += `</ul><strong>Average Grade:</strong> ${averageGrade}<hr>`;
        reportContainer.innerHTML += studentReport;
    }
});

// Initial render
renderRecords();

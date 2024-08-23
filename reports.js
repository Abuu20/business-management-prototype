document.addEventListener('DOMContentLoaded', () => {
    // Initial setup if needed
});

function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'block' : 'none';
}

function generateReport(type) {
    showLoading(true);

    setTimeout(() => {
        const reportContent = document.getElementById('reportContent');
        const data = getData(type);

        let content = '';
        switch (type) {
            case 'performance':
                content = generatePerformanceReport(data);
                break;
            case 'attendance':
                content = generateAttendanceReport(data);
                break;
            case 'financial':
                content = generateFinancialReport(data);
                break;
            default:
                content = '<p>Invalid report type.</p>';
                break;
        }

        reportContent.innerHTML = content;
        showLoading(false);
    }, 1000); // Simulate a delay for generating reports
}

function getData(type) {
    return JSON.parse(localStorage.getItem(type) || '[]');
}

function generatePerformanceReport(data) {
    return `
        <h3>Student Performance Report</h3>
        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Subject</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(record => `
                    <tr>
                        <td>${record.studentName}</td>
                        <td>${record.subject}</td>
                        <td>${record.grade}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <button onclick="exportToExcel('performance')">Export to Excel</button>
        <button onclick="exportToPDF('performance')">Export to PDF</button>
    `;
}

function generateAttendanceReport(data) {
    return `
        <h3>Attendance Report</h3>
        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(record => `
                    <tr>
                        <td>${record.studentName}</td>
                        <td>${record.date}</td>
                        <td>${record.status}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <button onclick="exportToExcel('attendance')">Export to Excel</button>
        <button onclick="exportToPDF('attendance')">Export to PDF</button>
    `;
}

function generateFinancialReport(data) {
    return `
        <h3>Financial Summary</h3>
        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Fee Type</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(record => `
                    <tr>
                        <td>${record.studentName}</td>
                        <td>${record.feeType}</td>
                        <td>${record.amount}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <button onclick="exportToExcel('financial')">Export to Excel</button>
        <button onclick="exportToPDF('financial')">Export to PDF</button>
    `;
}

function exportToExcel(reportType) {
    const data = getData(reportType);
    let csvContent = "data:text/csv;charset=utf-8,";

    switch (reportType) {
        case 'performance':
            csvContent += "Student Name,Subject,Grade\n";
            data.forEach(record => {
                csvContent += `${record.studentName},${record.subject},${record.grade}\n`;
            });
            break;
        case 'attendance':
            csvContent += "Student Name,Date,Status\n";
            data.forEach(record => {
                csvContent += `${record.studentName},${record.date},${record.status}\n`;
            });
            break;
        case 'financial':
            csvContent += "Student Name,Fee Type,Amount\n";
            data.forEach(record => {
                csvContent += `${record.studentName},${record.feeType},${record.amount}\n`;
            });
            break;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
}

function exportToPDF(reportType) {
    const reportContent = document.getElementById('reportContent').innerHTML;
    const doc = new jsPDF();
    doc.fromHTML(reportContent, 10, 10);
    doc.save(`${reportType}_report.pdf`);
}

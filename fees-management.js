document.addEventListener('DOMContentLoaded', () => {
    loadFees();
});

function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'block' : 'none';
}

function saveFee() {
    showLoading(true);

    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const feeAmount = document.getElementById('feeAmount').value;
    const paymentDate = document.getElementById('paymentDate').value;
    const status = document.getElementById('status').value;

    if (!studentId || !studentName || !feeAmount || !paymentDate) {
        showLoading(false);
        showNotification('error', 'Please fill out all fields.');
        return;
    }

    const fee = { id: studentId, studentName, feeAmount, paymentDate, status };

    const fees = getData('fees');
    const existingIndex = fees.findIndex(f => f.id === studentId);

    if (existingIndex >= 0) {
        fees[existingIndex] = fee;
        showNotification('success', 'Fee updated successfully.');
    } else {
        fees.push(fee);
        showNotification('success', 'Fee added successfully.');
    }

    saveData('fees', fees);
    loadFees();
    showLoading(false);
}

function deleteFee(id) {
    showLoading(true);

    let fees = getData('fees');
    fees = fees.filter(fee => fee.id !== id);
    saveData('fees', fees);
    loadFees();
    showLoading(false);
    showNotification('success', 'Fee deleted successfully.');
}

function loadFees() {
    const fees = getData('fees');
    updateFeeList(fees);
}

function updateFeeList(fees) {
    const feeList = document.querySelector('#feeList ul');
    feeList.innerHTML = '';
    fees.forEach(fee => {
        const li = document.createElement('li');
        li.innerHTML = `
            Student: ${fee.studentName} <br>
            Amount: $${fee.feeAmount} <br>
            Date: ${fee.paymentDate} <br>
            Status: ${fee.status}
            <button class="edit" onclick="editFee('${fee.id}')">Edit</button>
            <button class="delete" onclick="deleteFee('${fee.id}')">Delete</button>
        `;
        feeList.appendChild(li);
    });
}

function editFee(id) {
    const fees = getData('fees');
    const fee = fees.find(fee => fee.id === id);
    document.getElementById('studentId').value = fee.id;
    document.getElementById('studentName').value = fee.studentName;
    document.getElementById('feeAmount').value = fee.feeAmount;
    document.getElementById('paymentDate').value = fee.paymentDate;
    document.getElementById('status').value = fee.status;
}

function filterFees() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const fees = getData('fees');
    const filteredFees = fees.filter(fee => 
        fee.studentName.toLowerCase().includes(query) || 
        fee.id.toLowerCase().includes(query)
    );
    updateFeeList(filteredFees);
}

function generateInvoice() {
    const fees = getData('fees');
    const studentId = document.getElementById('studentId').value;
    const fee = fees.find(fee => fee.id === studentId);

    if (!fee) {
        showNotification('error', 'No fee record found for this student.');
        return;
    }

    const invoiceContent = `
        <div class="invoice">
            <h2>Invoice</h2>
            <p><strong>Student Name:</strong> ${fee.studentName}</p>
            <p><strong>Amount:</strong> $${fee.feeAmount}</p>
            <p><strong>Date:</strong> ${fee.paymentDate}</p>
            <p><strong>Status:</strong> ${fee.status}</p>
        </div>
    `;

    const invoiceArea = document.getElementById('invoiceArea');
    invoiceArea.innerHTML = invoiceContent;
    document.getElementById('invoiceDownloadButton').style.display = 'block';
}

function downloadInvoice() {
    const invoiceArea = document.getElementById('invoiceArea').innerHTML;
    const blob = new Blob([invoiceArea], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice.pdf';
    link.click();
    URL.revokeObjectURL(url);
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

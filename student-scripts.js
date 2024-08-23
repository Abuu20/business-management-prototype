document.addEventListener('DOMContentLoaded', () => {
    // Initialization code
});

function backupData() {
    showSpinner(true);
    // Simulate backup process
    setTimeout(() => {
        showSpinner(false);
        showNotification('Data backup completed successfully.', 'success');
    }, 2000);
}

function restoreData() {
    showSpinner(true);
    // Simulate restore process
    setTimeout(() => {
        showSpinner(false);
        showNotification('Data restore completed successfully.', 'success');
    }, 2000);
}

function showSpinner(show) {
    const spinner = document.getElementById('spinner');
    spinner.style.display = show ? 'block' : 'none';
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

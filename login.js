function login() {
    // Show the loading indicator
    document.getElementById('loadingIndicator').style.display = 'block';

    // Simulate a network request (e.g., login authentication)
    setTimeout(() => {
        // Hide the loading indicator after 2 seconds
        document.getElementById('loadingIndicator').style.display = 'none';
        
        // Redirect to the dashboard page (replace 'dashboard.html' with the actual file path)
        window.location.href = 'dashboard.html';
    }, 2000);
}

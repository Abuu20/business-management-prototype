document.addEventListener('DOMContentLoaded', function() {
    const dashboardContent = document.getElementById('dashboardContent');
    const notificationsBtn = document.getElementById('notificationsBtn');
    const notificationCount = document.getElementById('notificationCount');

    function showLoading() {
        dashboardContent.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    }

    function updateContent(htmlContent) {
        dashboardContent.innerHTML = htmlContent;
    }

    function loadDashboardOverview() {
        showLoading();
        setTimeout(() => {
            let content = `
                <h2>Dashboard Overview</h2>
                <div class="row">
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card p-3 bg-light">
                            <h4>Sales Statistics</h4>
                            <div class="chart-container">
                                <canvas id="salesChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card p-3 bg-light">
                            <h4>Inventory Overview</h4>
                            <div class="chart-container">
                                <canvas id="inventoryChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 mb-4">
                        <div class="card p-3 bg-light notification-area">
                            <h4>Notifications</h4>
                            <ul id="notificationList" class="list-group">
                                <!-- Notifications will be loaded here -->
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            updateContent(content);

            // Initialize charts
            const salesCtx = document.getElementById('salesChart').getContext('2d');
            const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');

            new Chart(salesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Sold', 'Unsold'],
                    datasets: [{
                        data: [70, 30], // Example data
                        backgroundColor: ['#28a745', '#dc3545']
                    }]
                }
            });

            new Chart(inventoryCtx, {
                type: 'bar',
                data: {
                    labels: ['Product A', 'Product B', 'Product C'], // Example data
                    datasets: [{
                        label: 'Stock',
                        data: [50, 30, 20],
                        backgroundColor: '#007bff'
                    }]
                }
            });
        }, 500);
    }

    function loadManageSales() {
        showLoading();
        setTimeout(() => {
            let content = `
                <h2>Manage Sales</h2>
                <button onclick="addSale()">Add Sale</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="salesTable">
                        <!-- Sales data will be loaded here -->
                    </tbody>
                </table>
            `;
            updateContent(content);
            loadSalesData();
        }, 500);
    }

    function loadManageInventory() {
        showLoading();
        setTimeout(() => {
            let content = `
                <h2>Manage Inventory</h2>
                <button onclick="addItem()">Add Item</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Stock</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="inventoryTable">
                        <!-- Inventory data will be loaded here -->
                    </tbody>
                </table>
            `;
            updateContent(content);
            loadInventoryData();
        }, 500);
    }

    function loadManageEmployees() {
        showLoading();
        setTimeout(() => {
            let content = `
                <h2>Manage Employees</h2>
                <button onclick="addEmployee()">Add Employee</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Date Hired</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="employeesTable">
                        <!-- Employee data will be loaded here -->
                    </tbody>
                </table>
            `;
            updateContent(content);
            loadEmployeesData();
        }, 500);
    }

    function loadReporting() {
        showLoading();
        setTimeout(() => {
            let content = `
                <h2>Reports</h2>
                <!-- Report content will be loaded here -->
            `;
            updateContent(content);
        }, 500);
    }

    function loadMessages() {
        showLoading();
        setTimeout(() => {
            let content = `
                <h2>Send Message</h2>
                <form id="messageForm">
                    <div class="mb-3">
                        <label for="messageRecipient" class="form-label">Recipient</label>
                        <input type="text" class="form-control" id="messageRecipient" required>
                    </div>
                    <div class="mb-3">
                        <label for="messageContent" class="form-label">Message</label>
                        <textarea class="form-control" id="messageContent" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button>
                </form>
                <div class="message-area mt-4">
                    <h4>Sent Messages</h4>
                    <ul id="sentMessages" class="list-group">
                        <!-- Sent messages will be loaded here -->
                    </ul>
                </div>
            `;
            updateContent(content);
            document.getElementById('messageForm').addEventListener('submit', sendMessage);
            loadSentMessages();
        }, 500);
    }

    function loadDashboardOverview() {
        showLoading();
        setTimeout(() => {
            let content = `
                <h2>Dashboard Overview</h2>
                <div class="row">
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card p-3 bg-light">
                            <h4>Sales Statistics</h4>
                            <div class="chart-container">
                                <canvas id="salesChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-4">
                        <div class="card p-3 bg-light">
                            <h4>Inventory Overview</h4>
                            <div class="chart-container">
                                <canvas id="inventoryChart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 mb-4">
                        <div class="card p-3 bg-light notification-area">
                            <h4>Notifications</h4>
                            <ul id="notificationList" class="list-group">
                                <!-- Notifications will be loaded here -->
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            updateContent(content);

            // Initialize charts
            const salesCtx = document.getElementById('salesChart').getContext('2d');
            const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');

            new Chart(salesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Sold', 'Unsold'],
                    datasets: [{
                        data: [70, 30], // Example data
                        backgroundColor: ['#28a745', '#dc3545']
                    }]
                }
            });

            new Chart(inventoryCtx, {
                type: 'bar',
                data: {
                    labels: ['Product A', 'Product B', 'Product C'], // Example data
                    datasets: [{
                        label: 'Stock',
                        data: [50, 30, 20],
                        backgroundColor: '#007bff'
                    }]
                }
            });
        }, 500);
    }

    function loadSalesData() {
        let sales = JSON.parse(localStorage.getItem('sales')) || [];
        let tableBody = document.getElementById('salesTable');
        tableBody.innerHTML = sales.map(sale => `
            <tr>
                <td>${sale.id}</td>
                <td>${sale.product}</td>
                <td>${sale.amount}</td>
                <td>${sale.date}</td>
                <td><button onclick="editSale(${sale.id})">Edit</button> <button onclick="deleteSale(${sale.id})">Delete</button></td>
            </tr>
        `).join('');
    }

    function loadInventoryData() {
        let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        let tableBody = document.getElementById('inventoryTable');
        tableBody.innerHTML = inventory.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.product}</td>
                <td>${item.stock}</td>
                <td>${item.dateAdded}</td>
                <td><button onclick="editItem(${item.id})">Edit</button> <button onclick="deleteItem(${item.id})">Delete</button></td>
            </tr>
        `).join('');
    }

    function loadEmployeesData() {
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        let tableBody = document.getElementById('employeesTable');
        tableBody.innerHTML = employees.map(employee => `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>${employee.dateHired}</td>
                <td><button onclick="editEmployee(${employee.id})">Edit</button> <button onclick="deleteEmployee(${employee.id})">Delete</button></td>
            </tr>
        `).join('');
    }

    function loadSentMessages() {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        let messageList = document.getElementById('sentMessages');
        messageList.innerHTML = messages.map(msg => `
            <li class="list-group-item">
                <strong>To:</strong> ${msg.recipient} <br>
                <strong>Message:</strong> ${msg.content}
            </li>
        `).join('');
    }

    function addSale() {
        // Function to add a sale
    }

    function addItem() {
        // Function to add an inventory item
    }

    function addEmployee() {
        // Function to add an employee
    }

    function sendMessage(event) {
        event.preventDefault();
        let recipient = document.getElementById('messageRecipient').value;
        let content = document.getElementById('messageContent').value;
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        let newMessage = { recipient, content };
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
        loadSentMessages();
    }

    function editSale(id) {
        // Function to edit a sale
    }

    function deleteSale(id) {
        // Function to delete a sale
    }

    function editItem(id) {
        // Function to edit an inventory item
    }

    function deleteItem(id) {
        // Function to delete an inventory item
    }

    function editEmployee(id) {
        // Function to edit an employee
    }

    function deleteEmployee(id) {
        // Function to delete an employee
    }

    function loadNotifications() {
        showLoading();
        setTimeout(() => {
            let content = `
                <h2>Notifications</h2>
                <ul class="list-group">
                    <!-- Notifications will be loaded here -->
                </ul>
            `;
            updateContent(content);
        }, 500);
    }

    document.getElementById('dashboardOverview').addEventListener('click', loadDashboardOverview);
    document.getElementById('manageSales').addEventListener('click', loadManageSales);
    document.getElementById('manageInventory').addEventListener('click', loadManageInventory);
    document.getElementById('manageEmployees').addEventListener('click', loadManageEmployees);
    document.getElementById('reports').addEventListener('click', loadReporting);
    document.getElementById('messages').addEventListener('click', loadMessages);
    document.getElementById('notificationsBtn').addEventListener('click', loadNotifications);
    document.getElementById('logoutBtn').addEventListener('click', function() {
        // Handle logout
        alert('Logging out...');
    });

    // Load the default view
    loadDashboardOverview();
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to show profit management section
    function showProfitManagement() {
        const profitManagementSection = document.getElementById('profitManagement');
        profitManagementSection.style.display = 'block';
        updateProfitResults();
    }

    // Function to register new stock
    function registerStock() {
        const itemName = document.getElementById('itemName').value;
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);

        if (itemName && !isNaN(itemPrice)) {
            const items = JSON.parse(localStorage.getItem('items')) || [];
            items.push({ name: itemName, price: itemPrice });
            localStorage.setItem('items', JSON.stringify(items));
            alert('Stock registered successfully!');
            updateProfitResults();
        } else {
            alert('Please enter valid item name and price.');
        }
    }

    // Function to update profit results
    function updateProfitResults() {
        const sales = JSON.parse(localStorage.getItem('sales')) || [];
        const items = JSON.parse(localStorage.getItem('items')) || [];

        let totalRevenue = 0;
        let totalCost = 0;
        let profit = 0;

        sales.forEach(sale => {
            const item = items.find(i => i.name === sale.product);
            if (item) {
                totalRevenue += sale.totalPrice;
                totalCost += item.price * sale.unitsSold;
            }
        });

        profit = totalRevenue - totalCost;

        const profitResultsHTML = `
            <p>Total Revenue: $${totalRevenue.toFixed(2)}</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
            <p>Expected Profit: $${profit.toFixed(2)}</p>
        `;

        document.getElementById('profitResults').innerHTML = profitResultsHTML;
    }

    // Attach functions to global scope
    window.showProfitManagement = showProfitManagement;
    window.registerStock = registerStock;
});

//for profit           
// Function to show the Profit Management section and hide the Dashboard
function showProfitManagement() {
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('profitManagement').style.display = 'block';
}

// Function to go back to the main dashboard
function backToDashboard() {
    document.getElementById('profitManagement').style.display = 'none';
    document.getElementById('dashboardContent').style.display = 'block';
}

// Function to register new stock
function registerStock() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (!itemName || isNaN(itemPrice) || itemPrice <= 0) {
        displayMessage("Please enter valid item details.", "danger");
        return;
    }

    // Add the new stock item to the stockItems array
    stockItems.push({ name: itemName, price: itemPrice });

    // Clear the input fields
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';

    // Update the profit results
    updateProfitResults();

    // Show a success message
    displayMessage("Stock registered successfully!", "success");
}

// Function to display a well-designed success or error message
function displayMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const saleForm = document.getElementById('sale-form');
    const salesTableBody = document.getElementById('sales-table-body');
    const totalSalesEl = document.getElementById('total-sales');
    const revenueEl = document.getElementById('revenue');
    const topProductsEl = document.getElementById('top-products');
    const loadingOverlay = document.querySelector('.loading-overlay');

    let salesData = JSON.parse(localStorage.getItem('salesData')) || [];

    function showLoading() {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
    }

    function hideLoading() {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }

    function updateDashboard() {
        const totalSales = salesData.length;
        const revenue = salesData.reduce((acc, sale) => acc + sale.total, 0);
        const productCounts = {};

        salesData.forEach(sale => {
            if (!productCounts[sale.product]) {
                productCounts[sale.product] = 0;
            }
            productCounts[sale.product] += sale.quantity;
        });

        const topProduct = Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b, 'N/A');

        totalSalesEl.textContent = totalSales;
        revenueEl.textContent = revenue.toFixed(2);
        topProductsEl.textContent = topProduct;
    }

    function renderSales() {
        salesTableBody.innerHTML = '';
        salesData.forEach((sale, index) => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${sale.product}</td>
                <td>${sale.quantity}</td>
                <td>${sale.total.toFixed(2)}</td>
                <td>${new Date(sale.date).toLocaleDateString()}</td>
                <td class="actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;

            salesTableBody.appendChild(tr);
        });

        updateDashboard();
    }

    saleForm.addEventListener('input', () => {
        const quantity = parseFloat(document.getElementById('quantity').value) || 0;
        const price = parseFloat(document.getElementById('price').value) || 0;
        document.getElementById('total').value = (quantity * price).toFixed(2);
    });

    saleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showLoading();

        const product = document.getElementById('product-name').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const total = parseFloat(document.getElementById('total').value);
        const date = new Date();

        salesData.push({ product, quantity, total, date });
        localStorage.setItem('salesData', JSON.stringify(salesData));

        setTimeout(() => {
            renderSales();
            saleForm.reset();
            document.getElementById('total').value = '';
            hideLoading();
        }, 500); // Simulating a delay for the loading indicator
    });

    salesTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            salesData.splice(index, 1);
            localStorage.setItem('salesData', JSON.stringify(salesData));
            renderSales();
        }

        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const sale = salesData[index];
            document.getElementById('product-name').value = sale.product;
            document.getElementById('quantity').value = sale.quantity;
            document.getElementById('price').value = sale.total / sale.quantity;
            document.getElementById('total').value = sale.total.toFixed(2);
            salesData.splice(index, 1);
            localStorage.setItem('salesData', JSON.stringify(salesData));
            renderSales();
        }
    });

    window.printSales = function () {
        const printContent = document.querySelector('.sales-list').innerHTML;
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `<h1>Sales Report</h1>${printContent}`;
        window.print();
        document.body.innerHTML = originalContent;
    };

    renderSales();
});

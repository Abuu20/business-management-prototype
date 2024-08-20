const colors = [
    { primary: "#3498db", secondary: "#2ecc71", background: "#f5f5f5", text: "#333" },
    { primary: "#e74c3c", secondary: "#f1c40f", background: "#f0f0f0", text: "#444" },
    { primary: "#9b59b6", secondary: "#1abc9c", background: "#e0e0e0", text: "#555" },
];

let currentColorIndex = 0;

function changeColors() {
    const color = colors[currentColorIndex];
    document.documentElement.style.setProperty('--primary-color', color.primary);
    document.documentElement.style.setProperty('--secondary-color', color.secondary);
    document.documentElement.style.setProperty('--background-color', color.background);
    document.documentElement.style.setProperty('--text-color', color.text);

    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

setInterval(changeColors, 5000); // Change colors every 5 seconds

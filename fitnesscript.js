function createDayTrackers() {
    const trackersContainer = document.getElementById('trackers');
    const template = document.getElementById('day-template');

    // Array to hold day names
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Loop to create day trackers for each day of the week
    days.forEach(day => {
        // Clone the template content
        const clone = template.content.cloneNode(true);
        
        // Update placeholder with actual day name
        clone.querySelector('label[for="steps"]').textContent = `Enter Steps (${day}):`;
        clone.querySelector('label[for="calories"]').textContent = `Enter Calories Burned (${day}):`;

        // Append the clone to the container
        trackersContainer.appendChild(clone);
    });
}
function calculateSummary() {
    const trackers = document.querySelectorAll('.day-tracker');
    let totalCalories = 0;
    // Iterate over each day tracker
    trackers.forEach((tracker, index) => {
        const stepsInput = tracker.querySelector('input[type="number"]');
        const caloriesInput = stepsInput.nextElementSibling; // Assuming steps and calories inputs are always siblings

        const steps = parseInt(stepsInput.value) || 0;
        const calories = parseInt(caloriesInput.value) || 0;

        // Calculate total calories burned based on steps
        const caloriesBurned = steps * 0.05 + calories;

        // Add calories burned to total
        totalCalories += caloriesBurned;
    });

    // Display summary
    const summaryElement = document.getElementById('summary');
    summaryElement.textContent = `Total calories burned this week: ${totalCalories.toFixed(2)}`;

    // Change button text
    const calculateButton = document.getElementById('calculate-btn');
    calculateButton.textContent = 'Recalculate Summary';
    drawGraph();
}

// Event listener for the "Calculate Summary" button click
document.getElementById('calculate-btn').addEventListener('click', calculateSummary);

// Event listener for pressing the "Enter" key in input fields
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateSummary();
    }
});

// Call the function to create day trackers when the page loads
window.onload = createDayTrackers;
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const calories = [200, 300, 250, 400, 350, 500, 450];

// Get canvas element and context
const canvas = document.getElementById('calories-chart');
const ctx = canvas.getContext('2d');

// Set chart properties
const chartHeight = canvas.height - 50;
const chartWidth = canvas.width - 50;
const barWidth = 30;
const barSpacing = 20;
const startX = 50;
const startY = canvas.height - 20;

// Function to draw the graph
function drawGraph() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw x and y axes
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, 20);
    ctx.lineTo(chartWidth, 20);
    ctx.stroke();

    // Draw bars for each day
    for (let i = 0; i < days.length; i++) {
        const x = startX + (i * (barWidth + barSpacing));
        const y = startY - (calories[i] * chartHeight / 600); // Scale calories to fit chart
        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, barWidth, chartHeight - y); // Draw bar
        ctx.fillStyle = 'black';
        ctx.fillText(days[i], x + barWidth / 2 - 15, startY + 15); // Draw day label
        ctx.fillText(calories[i].toString(), x + barWidth / 2 - 10, y - 5); // Draw calorie label
    }
}
function createDayTrackers() {
    const trackersContainer = document.getElementById('trackers');
    const template = document.getElementById('day-template');

    // Array to hold day names
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // used for each to iterate through each day of the week
    days.forEach(day => {
        // Clone the template content
        const clone = template.content.cloneNode(true);
        
        // Updated 'day-template' with actual day name
        clone.querySelector('label[for="steps"]').textContent = `Enter Steps (${day}):`;
        clone.querySelector('label[for="calories"]').textContent = `Enter Calories Burned (${day}):`;

        // Append the clone to the trackers container get  weeks data
        trackersContainer.appendChild(clone);
    });
}

// created a function to caluculate summary of weeks workout
function calculateSummary() {
//     let h= document.getElementById('height');
//     let w= document.getElementById('weight');
//     if (h.value == ""){
//    alert(" please enter height")
//     }if(w.value ==""){
//         alert("please enter weight")
//     }
    
    const trackers = document.querySelectorAll('.day-tracker');

    let totalCalories = 0;
    let calArray =[];
    
    // Iterate over each day tracker using for each
    trackers.forEach((tracker, index) => {
        const stepsInput = tracker.querySelector('input[type="number"]');
        const caloriesInput = stepsInput.nextElementSibling; 
// since output is always string used parseint
        const steps = parseInt(stepsInput.value) || 0;
        //crated variable to store calories 
        const calories = parseInt(caloriesInput.value) || 0;

        // Calculated total calories burned based on steps (0.05 is a general approximate value used to caluculate calories)
        const caloriesBurned = steps * 0.05 + calories;

        // Added calories burned to total
        totalCalories += caloriesBurned;
        calArray.push(caloriesBurned);
    });

    // To Display Sumamry of total calories
    const summaryElement = document.getElementById('summary');
    summaryElement.textContent = `Total calories burned this week: ${totalCalories.toFixed(2)}`;

    // Changed button text
    const calculateButton = document.getElementById('calculate-btn');
    calculateButton.textContent = 'Recalculate Summary';
    drawGraph(calArray);
}

// Event listener for the "Calculate Summary" button click
document.getElementById('calculate-btn').addEventListener('click', calculateSummary);



// Event listener for pressing the "Enter" key in input fields
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateSummary();
    }
});

// Called  the function to create day trackers when the page loads uaing window.onload event
window.onload = createDayTrackers;
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const calories = [200, 300, 250, 400, 350, 500, 450];

//used canvas element in Html to create graph and getting canvas element  
const canvas = document.getElementById('calories-chart');
// using getcontext() method to draw graph on canvas element 
const ctx = canvas.getContext('2d');

//cashing chart properties for graph
const chartHeight = canvas.height - 50;
const chartWidth = canvas.width - 50;
const barWidth = 30;
const barSpacing = 20;
const startX = 50;
const startY = canvas.height - 20;

// Function to draw the graph
function drawGraph(calArray) {
    //  to Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // methods to draw  x and y axes for graph
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, 20);
    ctx.lineTo(chartWidth, 20);
    ctx.stroke();

    // loop to get bars for each day for graphical representation 
    for (let i = 0; i < days.length; i++) {
        const x = startX + (i * (barWidth + barSpacing));
        const y = startY - (calArray[i] * chartHeight / 600); 
        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, barWidth, chartHeight - y); 
        ctx.fillStyle = 'black';
        // drawing bars based on each day
        ctx.fillText(days[i], x + barWidth / 2 - 15, startY + 15); 
        ctx.fillText(calArray[i].toString(), x + barWidth / 2 - 10, y - 5); 
    }
}
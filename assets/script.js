// script.js
document.addEventListener('DOMContentLoaded', function() {
  const chartTypeSelect = document.getElementById('chart-type');
  const numMonthsInput = document.getElementById('num-months');
  const startMonthSelect = document.getElementById('start-month');
  const monthsContainer = document.getElementById('months-container');
  const generateGraphButton = document.getElementById('generate-graph');
  let budgetChart; // Variable to store the chart instance

  function addMonthInputs(numMonths, startMonth) {
    monthsContainer.innerHTML = ''; // Clear previous inputs
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < numMonths; i++) {
      const monthIndex = (startMonth + i) % 12;
      const monthInput = document.createElement('div');
      monthInput.classList.add('mb-3'); // Bootstrap margin bottom class
      monthInput.innerHTML = `
        <label class="form-label">${months[monthIndex]}:</label>
        <div class="input-group">
          <span class="input-group-text">$</span>
          <input type="number" class="form-control budget-input" placeholder="Budget Amount" data-month="${months[monthIndex]}">
          <span class="input-group-text">$</span>
          <input type="number" class="form-control actual-input" placeholder="Actual Spent" data-month="${months[monthIndex]}">
        </div>
      `;
      monthsContainer.appendChild(monthInput);
    }
    // Initially disable the generate graph button
    generateGraphButton.disabled = true;
    // Add event listener to input fields for changes
    document.querySelectorAll('.budget-input, .actual-input').forEach(input => {
      input.addEventListener('input', checkInputs);
    });
  }

  document.getElementById('add-months').addEventListener('click', function() {
    const numMonths = parseInt(numMonthsInput.value) || 0;
    const startMonth = parseInt(startMonthSelect.value);
    addMonthInputs(numMonths, startMonth);
  });

  function checkInputs() {
    let allFilled = true;
    document.querySelectorAll('.budget-input, .actual-input').forEach(input => {
      if (input.value === '') {
        allFilled = false;
      }
    });
    generateGraphButton.disabled = !allFilled;
  }

  function generateGraph() {
    const chartType = chartTypeSelect.value;
    const budgetInputs = document.querySelectorAll('.budget-input');
    const actualInputs = document.querySelectorAll('.actual-input');
    const labels = [];
    const budgetData = [];
    const actualData = [];
    let maxBudget = 0;
  
    budgetInputs.forEach((input, index) => {
      const month = input.dataset.month;
      const budget = parseFloat(input.value);
      const actual = parseFloat(actualInputs[index].value);
  
      labels.push(month);
      budgetData.push(budget);
      actualData.push(actual);
  
      // Update maxBudget based on the highest input value
      maxBudget = Math.max(maxBudget, budget, actual);
    });
  
    const ctx = document.getElementById('budgetChart').getContext('2d');
  
    // If a chart instance already exists, destroy it before creating a new one
    if (budgetChart) {
      budgetChart.destroy();
    }
  
    // Create the Chart with the selected chart type and customized animations
    budgetChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Budget Plan Amount',
          data: budgetData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }, {
          label: 'Actual Charges',
          data: actualData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: maxBudget // Dynamically set the maximum value for the Y-axis
          }
        },
        animation: {
          duration: 1500, // Duration in milliseconds
          easing: 'delay' // An easing function
        }
      }
    });
  
    // Scroll to the graph container after the graph is generated
    document.getElementById('graph-container').scrollIntoView({
      behavior: 'smooth' // Smooth scrolling
    });
  }
  

  generateGraphButton.addEventListener('click', generateGraph);
});
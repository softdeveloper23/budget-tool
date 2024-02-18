// script.js
document.addEventListener('DOMContentLoaded', function() {
  const numMonthsInput = document.getElementById('num-months');
  const startMonthSelect = document.getElementById('start-month');
  const monthsContainer = document.getElementById('months-container');
  const generateGraphButton = document.getElementById('generate-graph');
  
  function addMonthInputs(numMonths, startMonth) {
    monthsContainer.innerHTML = ''; // Clear previous inputs
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (let i = 0; i < numMonths; i++) {
      const monthIndex = (startMonth + i) % 12;
      const monthInput = document.createElement('div');
      monthInput.innerHTML = `
        <label>${months[monthIndex]}: </label>
        <input type="number" placeholder="Budget" class="budget-input" data-month="${months[monthIndex]}">
        <input type="number" placeholder="Actual" class="actual-input" data-month="${months[monthIndex]}">
      `;
      monthsContainer.appendChild(monthInput);
    }
  }
  
  document.getElementById('add-months').addEventListener('click', function() {
    const numMonths = parseInt(numMonthsInput.value) || 0;
    const startMonth = parseInt(startMonthSelect.value);
    addMonthInputs(numMonths, startMonth);
  });
  
  function generateGraph() {
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
    const budgetChart = new Chart(ctx, {
      type: 'bar',
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
        }
      }
    });
  }
  
  generateGraphButton.addEventListener('click', generateGraph);
});
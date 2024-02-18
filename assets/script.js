// script.js
document.addEventListener('DOMContentLoaded', function() {
  const maxBudgetInput = document.getElementById('max-budget');
  const numMonthsInput = document.getElementById('num-months');
  const startMonthSelect = document.getElementById('start-month');
  const monthsContainer = document.getElementById('months-container');
  const addMonthsButton = document.getElementById('add-months');
  const generateGraphButton = document.getElementById('generate-graph');
  
  // Function to add month inputs based on the number of months and start month
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
  
  // Event listener for the add months button
  addMonthsButton.addEventListener('click', function() {
    const numMonths = parseInt(numMonthsInput.value) || 0;
    const startMonth = parseInt(startMonthSelect.value);
    addMonthInputs(numMonths, startMonth);
  });
  
  // Function to generate the graph
  function generateGraph() {
    const maxBudget = parseFloat(maxBudgetInput.value);
    const budgetInputs = document.querySelectorAll('.budget-input');
    const actualInputs = document.querySelectorAll('.actual-input');
    const labels = [];
    const budgetData = [];
    const actualData = [];
    
    // Validation flag
    let isValid = true;
    
    budgetInputs.forEach((input, index) => {
      const month = input.dataset.month;
      const budget = parseFloat(input.value);
      const actual = parseFloat(actualInputs[index].value);
      
      // Check if budget or actual exceeds maxBudget
      if (budget > maxBudget || actual > maxBudget) {
        alert(`Budget or actual charges for ${month} exceed the maximum budget of ${maxBudget}. Please correct the values.`);
        isValid = false;
        return; // Exit the forEach loop
      }
      
      labels.push(month);
      budgetData.push(budget);
      actualData.push(actual);
    });
    
    // Proceed to generate the graph only if the input is valid
    if (isValid) {
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
          // Existing options configuration
        }
      });
    }
  }
  
  // Event listener for the generate graph button
  generateGraphButton.addEventListener('click', generateGraph);
});
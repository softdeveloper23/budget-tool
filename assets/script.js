// script.js
document.addEventListener('DOMContentLoaded', function() {
    const maxBudgetInput = document.getElementById('max-budget');
    const monthsContainer = document.getElementById('months-container');
    const generateGraphButton = document.getElementById('generate-graph');
    
    // Function to add month inputs
    function addMonthInputs() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      months.forEach(month => {
        const monthInput = document.createElement('div');
        monthInput.innerHTML = `
          <label>${month}: </label>
          <input type="number" placeholder="Budget" class="budget-input" data-month="${month}">
          <input type="number" placeholder="Actual" class="actual-input" data-month="${month}">
        `;
        monthsContainer.appendChild(monthInput);
      });
    }
    
    // Function to generate the graph
    function generateGraph() {
      const maxBudget = maxBudgetInput.value;
      const budgetInputs = document.querySelectorAll('.budget-input');
      const actualInputs = document.querySelectorAll('.actual-input');
      const labels = [];
      const budgetData = [];
      const actualData = [];
      
      budgetInputs.forEach((input, index) => {
        const month = input.dataset.month;
        const budget = parseFloat(input.value);
        const actual = parseFloat(actualInputs[index].value);
        
        labels.push(month);
        budgetData.push(budget);
        actualData.push(actual);
      });
      
      // Get the context of the canvas element we added
      const ctx = document.getElementById('budgetChart').getContext('2d');
      
      // Create the Chart
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
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                const budget = data.datasets[0].data[tooltipItem.index];
                const actual = data.datasets[1].data[tooltipItem.index];
                const difference = budget - actual;
                return `Difference: ${difference}`;
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: maxBudget // Set the maximum value for the y-axis
            }
          }
        }
      });
    }
    
    // Event listener for the generate graph button
    generateGraphButton.addEventListener('click', generateGraph);
    
    // Initialize the month inputs
    addMonthInputs();
  });
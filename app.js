document.addEventListener('DOMContentLoaded', function () {
  const balanceElement = document.getElementById('balance');
  const expenseListElement = document.getElementById('expenseList');
  const expenseForm = document.getElementById('expenseForm');
  const expenseText = document.getElementById('expenseText');
  const expenseAmount = document.getElementById('expenseAmount');

  let balance = 0;
  let expenses = [];

  updateBalance();

  expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const text = expenseText.value.trim();
    const amount = parseFloat(expenseAmount.value);

    if (text && !isNaN(amount) && amount > 0) {
      const expense = {
        id: new Date().getTime(),
        text: text,
        amount: amount
      };

      expenses.push(expense);

      updateBalance();
      updateExpenseList();

      expenseText.value = '';
      expenseAmount.value = '';
    }
  });

  function updateBalance() {
    balance = expenses.reduce((total, expense) => total - expense.amount, 0);
    balanceElement.textContent = `$${balance.toFixed(2)}`;
  }

  function updateExpenseList() {
    expenseListElement.innerHTML = '';
    expenses.forEach(expense => {
      const listItem = document.createElement('li');
      listItem.className = 'expense-item';
      listItem.innerHTML = `
        <span>${expense.text}</span>
        <span>$${expense.amount.toFixed(2)}</span>
        <button onclick="removeExpense(${expense.id})">Remove</button>
      `;
      expenseListElement.appendChild(listItem);
    });
  }

  window.removeExpense = function (id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateBalance();
    updateExpenseList();
  };
});

var t_amount = document.getElementById('total-amount');
var bal_amount = document.getElementById('bal_t_amount');

function get_t_amount() {
    bal_amount.value = t_amount.value;
}

var exp_amount = document.getElementById('expense-amount');
var bal_expense = document.getElementById('bal_expense');

function get_exp_amount() {
    bal_expense.value = exp_amount.value;
}

function balance() {
    var budget = document.getElementById('bal_t_amount').value;
    var expense = document.getElementById('expense-amount').value;
    var balance_amount = document.getElementById('current');
    balance_amount.value = budget - expense;

}
window.onload = function () {
    localStorage.setItem('budget', budget)
    budget = localStorage.getItem('budget');

    if (budget !== null) {
        document.getElementById('bal_t_amount').value = budget;
    }

}

var expInput = document.getElementById('expense-amount');
var expList = document.getElementById('expense');

function list() {
    expList.value = expInput.value;
}

var productInput = document.getElementById('productTitle');
var productList = document.getElementById('product');

function item() {
    productList.value = productInput.value;
}

function del() {
    // this.closest('expense-lists').remove();
    // console.log(this);

}


document.querySelectorAll('.delete').forEach(i=> {
  i.addEventListener('click', function () {
    this.closest('.expense-lists').remove();
  });
});
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


function show() {
    var head = document.getElementsByTagName('h1');
    head[0].style.display = "block";

    var div = document.getElementById('expense-container');
    div.style.display = "flex";
}


let currentBalance = 0;

/* ---------------- BUDGET SET ---------------- */
function get_t_amount() {
    currentBalance = Number(document.getElementById('total-amount').value);

    document.getElementById('bal_t_amount').value = currentBalance;
    document.getElementById('current').value = currentBalance;
}

/* ---------------- EXPENSE ADD ---------------- */
function addDiv() {

    let product = document.getElementById('productTitle').value;
    let amount = Number(document.getElementById('expense-amount').value);

    // balance minus
    currentBalance -= amount;
    document.getElementById('current').value = currentBalance;

    let div = document.createElement('div');
    div.className = 'expense-lists';
     div.dataset.amount = amount;
    div.innerHTML = `
        <div class="product">
            <input type="text" value="${product}" disabled>
        </div>

        <div class="rupees">
            <input class="expense-value" type="text" value="${amount}" disabled>
        </div>

        <div class="side-bar">
            <div class="edit">
                <i class="bi bi-pencil-square"></i>
            </div>

            <div class="delete">
                <i class="bi bi-trash3-fill"></i>
            </div>
        </div>
    `;

    document.getElementById('expense-container').appendChild(div);

    // clear inputs
    document.getElementById('productTitle').value = "";
    document.getElementById('expense-amount').value = "";
}

/* ---------------- DELETE EXPENSE ---------------- */
document.addEventListener('click', function (e) {

    if (e.target.closest('.delete')) {

        let card = e.target.closest('.expense-lists');

        let amount = Number(
            card.querySelector('.expense-value').value
        );

        // balance restore
        currentBalance += amount;
        document.getElementById('current').value = currentBalance;

        card.remove();
    }
});

document.addEventListener('click', function (e) {

    if (e.target.closest('.edit')) {

        let card = e.target.closest('.expense-lists');

        let productInput = card.querySelector('.product input');
        let expenseInput = card.querySelector('.rupees input');

        let oldAmount = Number(card.dataset.amount || expenseInput.value);

        if (productInput.disabled) {

            // unlock
            productInput.disabled = false;
            expenseInput.disabled = false;
            productInput.focus();

        } else {

            // lock again
            productInput.disabled = true;
            expenseInput.disabled = true;

            let newAmount = Number(expenseInput.value);

            // balance adjust
            currentBalance += oldAmount;
            currentBalance -= newAmount;

            document.getElementById('current').value = currentBalance;

            // update stored value
            card.dataset.amount = newAmount;
        }
    }
});
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dataTransaction = [
    {id:1, text: "Candy", amount: -1},
    {id:2, text: "Home Rental", amount: -200},
    {id:3, text: "Salary", amount: +10000},
    {id:4, text: "Foodie", amount: -20},
    {id:5, text: "Lotto", amount: +12000}
]

let transactions = dataTransaction;

function init(){
    list.innerHTML = '';
    transactions.forEach(addDataToList);
    calculateMoney();
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function autoID(){
    return Math.floor(Math.random()*1000000)
}

function addDataToList(transactions){
    const symbol = transactions.amount < 0 ?'-':'+';
    const status = transactions.amount < 0 ?'minus':'plus';
    const item = document.createElement('li');
    result = formatNumber(Math.abs(transactions.amount));
    item.classList.add(status);
    item.innerHTML = `${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
    list.appendChild(item);
}

function calculateMoney(){
    const amounts = transactions.map(transactions => transactions.amount);
    //remaining
    const total = amounts.reduce((result,item) => (result+=item), 0).toFixed(2);
    //income
    const income = amounts.filter(item=>item > 0).reduce((result,item) => (result+=item), 0).toFixed(2);
    //expense
    const expense = (amounts.filter(item=>item < 0).reduce((result,item) => (result+=item), 0)*-1).toFixed(2);

    //UI
    balance.innerText = `$` +formatNumber(total);
    money_plus.innerText = `$` +formatNumber(income);
    money_minus.innerText = `$` +formatNumber(expense);
}
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("Please Filled Data");
    }else{
        const data={
            id:autoID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(data);
        addDataToList(data);
        calculateMoney();
        text.value = '';
        amount.value = '';
    }
}

function removeData(id){
     transactions = transactions.filter(transactions=>transactions.id !==id);
    init();
}

form.addEventListener('submit', addTransaction);
init();
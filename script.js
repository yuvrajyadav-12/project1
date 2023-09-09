//1
const balance = document.getElementById(
  "balance"
);
const money_plus = document.getElementById(
  "money-surplus"
);
const money_minus = document.getElementById(
  "money-less"
);
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");


// let transactions = dummyTransactions;

//last 
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//5

//write a function to get date,mont,year
function getdate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  today = dd+'/'+mm+'/'+yyyy;
  return today;
}










function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('please add text and amount')
  }else{
    const transaction = {
      id:generateID(),
      text:text.value,
      dae:getdate(),
      amount:+amount.value,
     
    }


    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
  }
}


//5.5
//Generate Random ID
function generateID(){
  return Math.floor(Math.random()*1000000000);
}

//2

//Add Trasactions to DOM list
function addTransactionDOM(transaction) {
  //GET sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Add Class Based on Value
  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
  );

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount)} 
  </span>
    <span>${transaction.dae}</span>
   
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
  list.appendChild(item);
}

//4

//Update the balance income and expence
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText=`Rs ${total}`;
    money_plus.innerText = `Rs ${income}`;
    money_minus.innerText = `Rs ${expense}`;
}


//6 

//Remove Transaction by ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}
//last
//update Local Storage Transaction
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

//3

//Init App
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

form.addEventListener('submit',addTransaction);
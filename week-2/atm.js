let balance = 1000;
let pin = 1234;
let loggedIn = false;
let showBalance = false;

function login() {
    let enteredPin = Number(prompt("Enter your PIN:"));
    let message = document.getElementById("login");

    loggedIn = enteredPin === pin;
    message.textContent = loggedIn ? "Login Successful" : "Login Failed";
    message.style.color = loggedIn ? "green" : "red";
}

function checkBalance() {
    let balanceEl = document.getElementById("balance");

    if (!loggedIn) {
        balanceEl.textContent = "Please login first";
        return;
    }

    showBalance = !showBalance;
    balanceEl.textContent = showBalance ? "Your balance is: " + balance : "Balance = ******";
}

function getAmount() {
    let amount = Number(prompt("Enter amount (multiple of 100):"));
    return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function verifyPin() {
    let enteredPin = Number(prompt("Enter your PIN to confirm:"));
    return enteredPin === pin;
}

function withdraw() {
    let message = document.getElementById("withdrawMessage");

    if (!loggedIn) {
        message.textContent = "Please login first";
        return;
    }

    let amount = getAmount();
    if (amount === null) {
        message.textContent = "Enter a valid positive amount";
        return;
    }

    if (amount % 100 !== 0) {
        message.textContent = "Amount must be a multiple of 100";
        return;
    }

    if (amount > balance) {
        message.textContent = "Insufficient balance";
        return;
    }

    if (!verifyPin()) {
        message.textContent = "Wrong PIN";
        return;
    }

    balance -= amount;
    message.textContent = "Withdrawal successful. New balance is: " + balance;
}

function deposit() {
    let message = document.getElementById("depositMessage");

    if (!loggedIn) {
        message.textContent = "Please login first";
        return;
    }

    let amount = getAmount();
    if (amount === null) {
        message.textContent = "Enter a valid positive amount";
        return;
    }

    if (amount % 100 !== 0) {
        message.textContent = "Amount must be a multiple of 100";
        return;
    }

    if (!verifyPin()) {
        message.textContent = "Wrong PIN";
        return;
    }

    balance += amount;
    message.textContent = "Deposit successful. New balance is: " + balance;
}
let balance = 1000;
let pin = 1234;
let loggedIn = false;
let showBalance = false;

function login() {
    const enteredPin = Number(prompt("Enter your PIN:"));
    const message = document.getElementById("login");

    loggedIn = enteredPin === pin;
    message.textContent = loggedIn ? "Login Successful" : "Login Failed";
    message.style.color = loggedIn ? "green" : "red";
}

function checkBalance() {
    const balanceEl = document.getElementById("balance");

    if (!loggedIn) {
        balanceEl.textContent = "Please login first";
        return;
    }

    showBalance = !showBalance;
    balanceEl.textContent = showBalance ? "Your balance is: " + balance : "Balance = ******";
}

function getAmount() {
    const amount = Number(prompt("Enter amount (multiple of 100):"));
    return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function verifyPin() {
    const enteredPin = Number(prompt("Enter your PIN to confirm:"));
    return enteredPin === pin;
}

function withdraw() {
    const message = document.getElementById("withdrawMessage");

    if (!loggedIn) {
        message.textContent = "Please login first";
        return;
    }

    const amount = getAmount();
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
    const message = document.getElementById("depositMessage");

    if (!loggedIn) {
        message.textContent = "Please login first";
        return;
    }

    const amount = getAmount();
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
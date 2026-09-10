function calculate(a, b, operation) {
    switch (operation) {
        case 'add':
            document.getElementById('calc').innerHTML = "Addition is " + (parseFloat(a.value) + parseFloat(b.value));
            break;
        case 'subtract':
            document.getElementById('calc').innerHTML = "Subtraction is " + (parseFloat(a.value) - parseFloat(b.value));
            break;  
        case 'multiply':
            document.getElementById('calc').innerHTML = "Multiplication is " + (parseFloat(a.value) * parseFloat(b.value));
            break;
        case 'divide':
            if (parseFloat(b.value) === 0) {
                document.getElementById('calc').innerHTML = "Cannot divide by zero";
            } else {
                document.getElementById('calc').innerHTML = "Division is " + (parseFloat(a.value) / parseFloat(b.value));
            }
            break;
        default:
            document.getElementById('calc').innerHTML = "Invalid operation";

    }
}

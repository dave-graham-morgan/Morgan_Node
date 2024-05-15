function createAccount(pin, amount=0) {
    let currentPin = pin;
    let balance = amount;

    return {
        checkBalance(pin){
            if(pin !== currentPin) return "Invalid PIN.";
            return `$${balance}`;
        },
        deposit(pin, amt){
            if(pin !== currentPin) return "Invalid PIN.";
            balance = balance + amt;
            return `Successfully deposited $${amt}. Current balance: $${balance}.`;
        },
        withdraw(pin, amt){
            if(pin !== currentPin) return "Invalid PIN.";
            if(amt > balance) return "Withdrawal amount exceeds account balance. Transaction cancelled.";
            balance = balance - amt;
            return `Successfully withdrew $${amt}. Current balance: $${balance}.`
        },
        changePin(oldPin, newPin){
            if(oldPin !== currentPin) return "Invalid PIN.";
            currentPin = newPin;
            return "PIN successfully changed!";
        }
    }
}

module.exports = { createAccount };

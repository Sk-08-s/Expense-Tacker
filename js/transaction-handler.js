const TransactionHandler = {
    saveTransaction: function(transaction) {
        // Get existing transactions
        let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        
        // Add new transaction with timestamp
        const newTransaction = {
            ...transaction,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        
        // Save transaction without encryption for now
        transactions.push(newTransaction);
        
        // Save updated transactions
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        // Only update dashboard if we're on the dashboard page
        if (window.location.pathname.includes('dashboard.html')) {
            this.updateDashboard();
        }
        return newTransaction;
    },

    getTransactions: function() {
        return JSON.parse(localStorage.getItem('transactions') || '[]');
    },

    updateDashboard: function() {
        const transactions = this.getTransactions();
        
        // Calculate totals
        const totals = transactions.reduce((acc, transaction) => {
            if (transaction.type === 'income') {
                acc.income += parseFloat(transaction.amount);
            } else {
                acc.expenses += parseFloat(transaction.amount);
            }
            return acc;
        }, { income: 0, expenses: 0 });
        
        // Update UI elements with the calculated totals
        document.getElementById('total-income').textContent = `₹${totals.income.toFixed(2)}`;
        document.getElementById('total-expenses').textContent = `₹${totals.expenses.toFixed(2)}`;
        document.getElementById('remaining-balance').textContent = 
            `₹${(totals.income - totals.expenses).toFixed(2)}`;
    }
};
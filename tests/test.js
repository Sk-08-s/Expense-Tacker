// Test Suite for Expense Tracker
const TestSuite = {
    // Data Validation Tests
    testDataValidation: async function() {
        const testCases = [
            { input: { amount: -100, category: 'Food', date: '2024-01-01' }, expected: false },
            { input: { amount: '', category: 'Food', date: '2024-01-01' }, expected: false },
            { input: { amount: 100, category: '', date: '2024-01-01' }, expected: false },
            { input: { amount: 100, category: 'Food', date: '' }, expected: false },
            { input: { amount: 100, category: 'Food', date: '2024-01-01' }, expected: true }
        ];

        testCases.forEach(test => {
            const result = validateTransactionData(test.input);
            console.assert(result === test.expected, 
                `Data validation test failed for input: ${JSON.stringify(test.input)}`
            );
        });
    },

    // Authentication Tests
    testAuthentication: async function() {
        const authTests = [
            { email: 'test@example.com', password: 'Test123!', expected: true },
            { email: 'invalid@example.com', password: 'wrong', expected: false },
            { email: '', password: 'Test123!', expected: false },
            { email: 'test@example.com', password: '', expected: false }
        ];

        for (const test of authTests) {
            const result = await authenticateUser(test.email, test.password);
            console.assert(result === test.expected,
                `Authentication test failed for ${test.email}`
            );
        }
    },

    // Local Storage Tests
    testLocalStorage: function() {
        const testData = {
            transactions: [
                { id: 1, amount: 100, category: 'Food', date: '2024-01-01' },
                { id: 2, amount: 200, category: 'Transport', date: '2024-01-02' }
            ]
        };

        // Test Save
        saveToLocalStorage('test_transactions', testData.transactions);
        const savedData = getFromLocalStorage('test_transactions');
        console.assert(JSON.stringify(savedData) === JSON.stringify(testData.transactions),
            'Local storage save/retrieve test failed'
        );

        // Test Update
        const updatedData = [...testData.transactions, { id: 3, amount: 300, category: 'Shopping', date: '2024-01-03' }];
        updateLocalStorage('test_transactions', updatedData);
        const retrievedData = getFromLocalStorage('test_transactions');
        console.assert(JSON.stringify(retrievedData) === JSON.stringify(updatedData),
            'Local storage update test failed'
        );
    },

    // Chart Rendering Tests
    testChartRendering: function() {
        const testData = {
            labels: ['Food', 'Transport', 'Shopping'],
            values: [100, 200, 300]
        };

        const chart = renderExpenseChart('test-chart', testData);
        console.assert(chart !== null, 'Chart rendering failed');
        console.assert(chart.data.labels.length === testData.labels.length,
            'Chart labels mismatch'
        );
    },

    // Run All Tests
    runAllTests: async function() {
        try {
            await this.testDataValidation();
            await this.testAuthentication();
            this.testLocalStorage();
            this.testChartRendering();
            console.log('All tests completed successfully!');
        } catch (error) {
            console.error('Test suite failed:', error);
        }
    }
};

// Export for CI/CD
if (typeof module !== 'undefined') {
    module.exports = TestSuite;
}
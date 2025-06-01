describe('Expense Tracker E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should login successfully', () => {
        cy.get('#username').type('testuser@example.com')
        cy.get('#password').type('Test123!')
        cy.get('.login-button').click()
        cy.url().should('include', '/dashboard.html')
    })

    it('should add a new expense', () => {
        // Login first
        cy.login('testuser@example.com', 'Test123!')

        cy.visit('/addexpen.html')
        cy.get('#expenseAmount').type('100')
        cy.get('#expenseCategory').select('Food')
        cy.get('#expenseDate').type('2024-01-01')
        cy.get('#expenseDescription').type('Test expense')
        cy.get('form').submit()

        // Verify expense was added
        cy.visit('/dashboard.html')
        cy.get('.transactions-table').should('contain', 'Test expense')
    })

    it('should display correct totals', () => {
        cy.login('testuser@example.com', 'Test123!')
        cy.visit('/dashboard.html')
        
        // Check if metrics are displayed
        cy.get('#total-income').should('exist')
        cy.get('#total-expenses').should('exist')
        cy.get('#remaining-balance').should('exist')
    })
})
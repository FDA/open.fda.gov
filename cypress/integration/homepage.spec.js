/// <reference types="cypress" />


context('Homepage', () => {
    beforeEach(() => {
        cy.visit('/', {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear()
            }
        });
    })

    it('Page title should be openFDA', () => {
        cy.title().should('eq', 'openFDA')
    })

    it('Disclaimer should automatically show up', () => {
        cy.get('.modal-container')
            .should('be.visible').within(() => {
            cy.get('.modal-header').should('be.visible').should('have.text', 'Disclaimer')
            cy.get('.modal-body').should('be.visible')
            cy.get('button.bg-primary').should('be.visible').should('have.text', 'ACCEPT')
        }).find('button.bg-primary').click();

        cy.get('.modal-container').should('not.exist');
    })

})

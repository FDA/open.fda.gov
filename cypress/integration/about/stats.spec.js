/// <reference types="cypress" />

const PREFIX = ['2/api.fda.gov/drug/', '2/api.fda.gov/device/', '2/api.fda.gov/food/', '2/api.fda.gov/other/', '2/api.fda.gov/animalandveterinary/']

context('API Usage Stats', () => {
    beforeEach(() => {
        cy.visit('/about/statistics/', {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear()
            }
        });
        cy.get('.modal-container').find('button.bg-primary').click();
    })

    it('Graph should display', () => {
        cy.get('div>svg rect')
            .should('be.visible');
    })

    it('Endpoint drill-down works', () => {
        for (let i = 0; i < PREFIX.length; i++) {
            cy.get(`a[data-prefix="${PREFIX[i]}"]`).should('be.visible').click();
            cy.get(`a[data-prefix="1/api.fda.gov/"]`).click({force: true});
        }
    })


})

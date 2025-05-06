// / <reference types="cypress" />
import {loadAndAcceptDisclaimer} from "../../support/index"
const PREFIX = ['2/api.fda.gov/drug/', '2/api.fda.gov/device/', '2/api.fda.gov/food/', '2/api.fda.gov/other/', '2/api.fda.gov/animalandveterinary/']

context('API Usage Stats', () => {
  beforeEach(() => {
    loadAndAcceptDisclaimer('/about/statistics/')
  })

  it('Graph should display', () => {
    cy.get('div>svg rect')
      .should('be.visible')
  })

  it('Endpoint drill-down works', () => {
    for (let i = 0; i < PREFIX.length; i++) {
      cy.get(`a[data-prefix="${PREFIX[i]}"]`).should('be.visible').click({force: true})
      cy.get(`a[data-prefix="1/api.fda.gov/"]`).click({force: true})
    }
  })


})

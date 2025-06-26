// / <reference types="cypress" />
import {loadAndAcceptDisclaimer} from "../../support/e2e"

context('Try the API', () => {
  beforeEach(() => {
    loadAndAcceptDisclaimer('/apis/try-the-api/')
  })

  it('Example query should execute and return results', () => {
    // Check the initial state
    cy.get('textarea#query-data').should('be.visible').should('have.text', 'https://api.fda.gov/drug/event.json?limit=1')
    cy.get('button#close-query-data').should('not.exist')
    cy.get('div#query-result-data').should('not.exist')
    // Now click Run Query
    cy.get('button#run-query-data').should('be.visible').click()
    cy.get('button#close-query-data').should('be.visible')
    cy.get('div#query-result-data').should('be.visible')
    // Now check we got back JSON
    cy.get('div#query-result-data').should(($div) => {
      const text = $div.text()
      const json = JSON.parse(text)
      expect(json.meta.results.skip).to.equal(0)
      expect(json.meta.results.limit).to.equal(1)
      expect(json.meta.results.total).to.be.greaterThan(10000000)
      expect(json.results).to.have.length(1)

    })
    // Now close the query explorer.
    cy.get('button#close-query-data').click()
    // Now verify we are back to the initial state
    cy.get('button#close-query-data').should('not.exist')
    cy.get('div#query-result-data').should('not.exist')

  })

})


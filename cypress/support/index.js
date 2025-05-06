// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './endpoint_test_helper'

// Alternatively you can use CommonJS syntax:
// require('./commands')

const loadAndAcceptDisclaimer = function (url) {
  cy.visit(url, {
    onBeforeLoad: (win) => {
      win.sessionStorage.clear()
    }
  })
  cy.get('.modal-container').find('button.bg-primary').click()

  cy.get('div.body-container').then($doc => {
    if ($doc.find('div#infographic-border').length) {
      cy.get('div#infographic-border').within(($div) => {
        cy.get('div.piechart-container > svg', {timeout: 10000}).scrollIntoView()
      })
    }
  })


}

export {loadAndAcceptDisclaimer}

/// <reference types="cypress" />
import {loadAndAcceptDisclaimer} from "../../support/index"

const ENDPOINTS = ['Animal & Veterinary › Adverse Events', 'Devices › Classification',
    'Devices › 510k', 'Devices › Enforcement Reports', 'Devices › Adverse Events', 'Devices › PMA', 'Devices › Recalls', 'Devices › Registration',
    'Devices › UDI', 'Devices › COVID-19 Serological Testing Evaluations', 'Drugs › Enforcement Reports',
    'Drugs › Drugs@FDA', 'Drugs › Adverse Events', 'Drugs › Labeling', 'Drugs › NDC Directory', 'Foods › Enforcement Reports',
    'Foods › Adverse Events', 'Tobacco › Problem Reports', 'Other › NSDE', 'Other › Substance']

context('API Status', () => {
    beforeEach(() => {
        loadAndAcceptDisclaimer('/about/status/')
    })

    it('Status boxes should appear and show OK', () => {
        for (let i = 0; i < ENDPOINTS.length; i++) {
            cy.get('section.container>ul').find(`li.col:nth-of-type(${i + 1})`).should('be.visible').within(() => {
                cy.get('p.clr-green').should('be.visible').should('have.text', `${ENDPOINTS[i]}`)
                cy.get('p.txt-c').should('be.visible').should('have.text', `OK`)
            })
        }
    })

})

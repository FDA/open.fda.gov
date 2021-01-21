/// <reference types="cypress" />
import {loadAndAcceptDisclaimer} from "../support/index"

context('Top menu bar', () => {
    beforeEach(() => {
        loadAndAcceptDisclaimer('/')
    })

    it('Menu bar should be present and visible', () => {
        cy.get('div.menu-container')
            .should('be.visible')
    })

    it('Menu bar items should drop down', () => {
        // About
        cy.get('div.menu-container').find('div.dropdown:nth-of-type(2)')
            .should('be.visible').trigger('mouseover').within(() => {
            cy.get('a[href="/about/"]').should('be.visible').should('have.text', 'What is openFDA?')
            cy.get('a[href="/about/updates/"]').should('be.visible').should('have.text', 'Updates')
            cy.get('a[href="/about/status/"]').should('be.visible').should('have.text', 'API status')
            cy.get('a[href="/about/statistics/"]').should('be.visible').should('have.text', 'API usage statistics')
        }).trigger('mouseout')

        // APIs
        cy.get('div.menu-container').find('div.dropdown:nth-of-type(3)')
            .should('be.visible').trigger('mouseover').within(() => {
            cy.get('a[href="/apis/"]').should('be.visible').should('have.text', 'API basics')
            cy.get('a[href="/apis/animalandveterinary/"]').should('be.visible').should('have.text', 'Animal and Veterinary Endpoints')
            cy.get('a[href="/apis/drug/"]').should('be.visible').should('have.text', 'Drug Endpoints')
            cy.get('a[href="/apis/device/"]').should('be.visible').should('have.text', 'Device Endpoints')
            cy.get('a[href="/apis/food/"]').should('be.visible').should('have.text', 'Food Endpoints')
            cy.get('a[href="/apis/other/"]').should('be.visible').should('have.text', 'Other Endpoints')
            cy.get('a[href="/apis/tobacco/"]').should('be.visible').should('have.text', 'Tobacco Endpoints')
        }).trigger('mouseout')


        // Data
        cy.get('div.menu-container').find('div.dropdown:nth-of-type(4)')
            .should('be.visible').trigger('mouseover').within(() => {
            cy.get('a[href="/data/datadictionary"]').should('be.visible').should('have.text', 'Data Dictionary')
            cy.get('a[href="/data/downloads/"]').should('be.visible').should('have.text', 'Downloads')
        }).trigger('mouseout')

        // Community
        cy.get('div.menu-container').find('div.dropdown:nth-of-type(5)')
            .should('be.visible').trigger('mouseover').within(() => {
            cy.get('a[href="https://github.com/FDA"]').should('be.visible').should('have.text', 'Source code (GitHub)')
            cy.get('a[href="https://opendata.stackexchange.com/questions/tagged/openfda"]').should('be.visible').should('have.text', 'Q&A (StackExchange)')
            cy.get('a[href="https://twitter.com/openFDA"]').should('be.visible').should('have.text', '@openFDA (Twitter)')
            cy.get('a[href="/community/"]').should('be.visible').should('have.text', 'openFDA Apps')
        }).trigger('mouseout')

        // Disclaimer
        cy.get('div.menu-container').find('div.dropdown:nth-of-type(6)')
            .should('be.visible').click();
        cy.get('.modal-container')
            .should('be.visible').find('button.bg-primary').click();
    })

})

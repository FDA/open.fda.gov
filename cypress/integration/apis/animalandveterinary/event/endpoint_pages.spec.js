/// <reference types="cypress" />
import EndpointPagesTestHelper from "../../../../support/endpoint_test_helper";

const URL = '/apis/animalandveterinary/event/';

context('ADAE dataset pages', () => {
    const helper = new EndpointPagesTestHelper(URL);

    beforeEach(() => {
        cy.visit(URL, {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear()
            }
        });
        cy.get('.modal-container').find('button.bg-primary').click();
    })

    it('Overview page should display a dataset description and key facts', () => {
        helper.overview();
    })

    it('How to use the API page should provide guidance on API use', () => {
        helper.howToUse();
    })


})


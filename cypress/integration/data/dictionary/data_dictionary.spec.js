/// <reference types="cypress" />
import {loadAndAcceptDisclaimer} from "../../../support/index";

const URL = '/data/datadictionary/';

context('Data Dictionary', () => {

    beforeEach(() => {
        loadAndAcceptDisclaimer(URL);
    })

    it('Page header should read Data Dictionary', () => {
        cy.get('section div.data-dictionary-header h2').should('be.visible').should('have.text', 'Data Dictionary');
    })

    function verifyUsageSummary(category, topFieldPrefix) {
        cy.get('section#data-dictionary h3.usage-header').should('be.visible').should('have.text', 'Usage Summary');
        cy.get('section#data-dictionary div.graphics').within(() => {
            // Total calls
            cy.get('div.left>div:nth-of-type(1)>h4').should('have.text', `Total ${category} API Calls`)
            // Ensure there is a number above zero in there
            cy.get('div.left>div:nth-of-type(1)>h5').should(($h5) => {
                const text = $h5.text();
                const numOfCalls = Number.parseInt(text.replaceAll(',', ''));
                expect(numOfCalls).to.be.greaterThan(0)
            });
            cy.get('div.left>div:nth-of-type(1)>span').should('have.text', `past 30 days`)

            // Selected endpoint calls
            cy.get('div.left>div:nth-of-type(2)>h4').should('have.text', `Selected Endpoints API Calls`)
            // Ensure there is a number above zero in there
            cy.get('div.left>div:nth-of-type(2)>h5').should(($h5) => {
                const text = $h5.text();
                const numOfCalls = Number.parseInt(text.replaceAll(',', ''));
                expect(numOfCalls).to.be.greaterThan(0)
            });
            cy.get('div.left>div:nth-of-type(2)>span').should('have.text', `past 30 days`)

            // Donut chart
            cy.get('div.right svg').should('be.visible');
            cy.get('div.right>div:nth-of-type(2)>h4').should('have.text', `Top 5 Common Fields in ${category}`);
            cy.get('div.right>div:nth-of-type(2)>ul').should('be.visible').within(() => {
                // Check the Top 5 bullets.
                for (let i = 1; i <= 5; i++) {
                    cy.get(`li:nth-of-type(${i})`).should('be.visible').should('contain.text', `${topFieldPrefix}.`);
                }
            });

        });
    }

    function verifyDataTableNavigation(minTotalFields) {
        cy.get('div.table-databar>span').should(($el) => {
            const text = $el.text();
            const totalRows = Number.parseInt(text.replaceAll(' Fields', ''));
            expect(totalRows).to.be.gte(minTotalFields);
        });
        const pages = Math.ceil(minTotalFields / 25);
        // should be at Page 1 initially
        cy.get('div.ReactTable input[aria-label="jump to page"]').should('contain.value', 1);
        cy.get('div.ReactTable span.-totalPages').should('have.text', `${pages}`);
        // click Next until on the last page
        for (let page = 2; page <= pages; page++) {
            cy.get('div.pagination-bottom div.-next>button').click();
            cy.get('div.ReactTable input[aria-label="jump to page"]').should('contain.value', page);
        }
        // now select 1000 rows per page and see number of pages drop to 1.
        cy.get('div.ReactTable select[aria-label="rows per page"]').select('1000 rows');
        cy.get('div.ReactTable input[aria-label="jump to page"]').should('contain.value', 1);
        cy.get('div.ReactTable span.-totalPages').should('have.text', `1`);

    }

    it('Main controls should be in place', () => {
        cy.get('div.dataset-select div.nouns h5').should('be.visible').should('have.text', 'Data Category');
        cy.get('div.dataset-select div.endpoints h5').should('be.visible').should('have.text', 'Datasets');
        cy.get('div.dataset-select > div.nouns > div > div > div:nth-of-type(1)').should('be.visible')
            .should('have.text', 'Animal & Veterinary');
        cy.get('div.dataset-select > div.endpoints div.select__multi-value__label').should('be.visible')
            .should('have.text', 'Event');
        verifyUsageSummary('Animal & Veterinary', 'animal');
        verifyDataTableNavigation(58);

    })


})


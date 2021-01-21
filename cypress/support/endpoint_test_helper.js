class EndpointPagesTestHelper {

    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    overview() {
        cy.get(`a[href="${this.baseURL}"]`).click();
        cy.get('section.key-facts').should('be.visible');
        cy.get('section.key-facts h3').should('be.visible').should('have.text', 'Key Facts');
        cy.get('section.key-facts').within(() => {
            cy.get('i.fa-database + div.label').should('have.text', 'Source of the data:')
            cy.get('i.fa-edit + div.label').should('have.text', 'Changes to the source data:')
            cy.get('i.fa-calendar + div.label').should('have.text', 'Time period covered in this API:')
            cy.get('i.fa-refresh + div.label').should('have.text', 'Frequency of API updates:')
        });
    }

    howToUse() {
        cy.get(`a[href="${this.baseURL}how-to-use-the-endpoint/"]`).click();
        cy.get('section.doc-content h2').should('be.visible').should('have.text', 'How to use the API');
        cy.get('section.doc-content h3:nth-of-type(1)').should('be.visible').should('have.text', 'Making a simple API Call');
        cy.get('section.doc-content h3:nth-of-type(2)').should('be.visible').should('have.text', 'Some key pointers');
    }

    exampleQueries() {
        cy.get(`a[href="${this.baseURL}example-api-queries/"]`).click();
        cy.get('div#doc-container>section>h2').should('be.visible');
        cy.get('div#doc-container>section>section').each((section) => {
            cy.wrap(section).within(() => {
                // Check the initial state
                cy.get('textarea[aria-label="Current Query"]').should('be.visible');
                cy.get('button[aria-label="Close result of query"]').should('not.exist');
                cy.get('pre.javascript').should('not.exist');

                // Now click Run Query
                cy.get('textarea[aria-label="Current Query"] + button').click();
                cy.get('button[aria-label="Close result of query"]').should('be.visible');
                cy.get('pre.javascript').should('be.visible');

                // Now check we got back JSON
                cy.get('pre.javascript').should(($div) => {
                    const text = $div.text();
                    const json = JSON.parse(text);
                    expect(json.results.length).to.be.greaterThan(0)

                });

                // Now close the query explorer.
                cy.get('button[aria-label="Close result of query"]').click();

                // Now verify we are back to the initial state
                cy.get('button[aria-label="Close result of query"]').should('not.exist');
                cy.get('pre.javascript').should('not.exist');

            })
        });
    }
}

export {EndpointPagesTestHelper as default};

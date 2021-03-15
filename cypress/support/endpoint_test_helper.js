class EndpointPagesTestHelper {

    constructor(baseURL, apiPath) {
        this.baseURL = baseURL;
        this.apiPath = apiPath;
        cy.intercept(`https://api.fda.gov/download.json`).as('download-api-call');
        cy.intercept(`https://api.fda.gov${this.apiPath}`).as('search-api-call');
    }

    overview() {
        cy.get(`a.sidebar-item[href="${this.baseURL}"]`).click();
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
                cy.get('textarea[aria-label="Current Query"] + button').scrollIntoView().click({force: true});
                cy.get('button[aria-label="Close result of query"]').should('be.visible');
                cy.get('pre.javascript').should('be.visible');

                // Now check we got back JSON
                cy.get('pre.javascript').should(($div) => {
                    const text = $div.text();
                    const json = JSON.parse(text);
                    expect(json.results.length).to.be.greaterThan(0)

                });

                // Now close the query explorer.
                cy.get('button[aria-label="Close result of query"]').scrollIntoView().click({force: true});

                // Now verify we are back to the initial state
                cy.get('button[aria-label="Close result of query"]').should('not.exist');
                cy.get('pre.javascript').should('not.exist');

            })
        });
    }

    infographics() {
        cy.get(`a[href="${this.baseURL}explore-the-api-with-an-interactive-chart/"]`).click();
        this._waitUntilIdle();

        cy.get('p.infographic-subheader+div+p').invoke('text').should('match', /\d+ records match these search parameters/i);
        cy.get('div#infographic-tabs>button').each((section) => {
            this._infographicsTab(section);
        })
    }

    _infographicsTab(tab) {
        cy.wrap(tab).click();
        this._waitUntilIdle();
        cy.wait(3000)

        // Look at all the chart options available by default
        cy.get('fieldset#params-filter>label>input').each(($el, i) => {
            cy.get('p.infographic-subheader+div+p').then(($p) => {
                if (i > 0) {
                    const text = $p.text();
                    // Radio buttons become detached from DOM; need to re-query.
                    cy.get(`fieldset#params-filter>label:nth-of-type(${i + 1})>input`).click();
                    this._waitUntilIdle();
                    // Record count should have changed.
                    cy.get('p.infographic-subheader+div+p').should('not.have.text', text);
                }
                // Ensure no error message
                cy.get('div#chartWrapper>span.txt-c').should('not.exist');

                // Expect either a line graph, or a donut chart or a bar chart.
                cy.get('div#chartWrapper').find('span>canvas,ul[aria-label="Bar Chart"],div.donut-wrap canvas').should('exist');
            });

        });
    }

    understandingResults() {
        cy.get(`a[href="${this.baseURL}understanding-the-api-results/"]`).click();
        cy.get('section.doc-content h2').should('be.visible').should('have.text', 'Understanding the API Results');
        cy.get('section.doc-content pre.javascript').should('be.visible');
    }

    downloads() {
        cy.get(`a[href="${this.baseURL}download/"]`).click();
        cy.get('section.doc-content h2').should('be.visible').should('have.text', 'Download the dataset');
        cy.get('section.doc-content section.clearfix').then(($sec) => {
            if ($sec.find('button').length) {
                $sec.find('button').click();
                cy.wrap($sec).find('button + ul').should('not.be.empty');
            } else {
                cy.get('section.doc-content section.clearfix>ul>li').each(($el, i) => {
                    cy.wrap($el).find("a").invoke('attr', 'href')
                        .should("contain", "https://download.open.fda.gov/");

                });
            }
        });
    }

    searchableFields() {
        cy.get(`a.sidebar-item[href="${this.baseURL}searchable-fields/"]`).scrollIntoView().click({force: true});
        cy.get('section.doc-content h2').should('be.visible').should('have.text', 'Searchable Fields');
        cy.get('section.field-explorer').should('be.visible').within(($fe) => {
            // Verify at least the field list dropdown opens.
            cy.contains('Search the fields').should('be.visible').trigger('mousedown');
        });
    }

    _waitUntilIdle() {
        cy.wait('@download-api-call');
        cy.wait('@search-api-call');
        cy.wait('@search-api-call');
        cy.window().then({
            timeout: 20000
        }, win => new Cypress.Promise((resolve, reject) => win.requestIdleCallback(resolve)));
    }
}

export {EndpointPagesTestHelper as default};

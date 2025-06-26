// / <reference types="cypress" />
import {loadAndAcceptDisclaimer} from "../../../support/e2e"

const URL = '/data/downloads/'

context('Data Downloads', () => {

  beforeEach(() => {
    loadAndAcceptDisclaimer(URL)
  })

  it('Page header should read Downloads', () => {
    cy.get('h2#hero-title').should('be.visible').should('have.text', 'Downloads')
  })

  function verifyDownloads (sectionTitle, minExpectedFiles, maxExpectedFiles) {
    cy.get(`li#${sectionTitle}>section`).within(() => {
      cy.get('p:nth-of-type(2)').should(($el) => {
        const text = $el.text()
        expect(/^There are \d+ files, last updated on \d{4}-\d{2}-\d{2}.$/.test(text)).to.be.true
        const numOfFiles = Number.parseInt(text.match(/\d+/g)[0])
        expect(numOfFiles).to.be.gte(minExpectedFiles)
        expect(numOfFiles).to.be.lte(maxExpectedFiles)
        if (numOfFiles > 10) {
          // Expect and test the Show All button
          const btn = Cypress.$(Cypress.$($el).siblings('button')[0])
          expect(btn.text()).to.be.equal(`Show all ${numOfFiles} download files`)
          btn.click()
          expect(btn.text()).to.be.equal(`Hide all ${numOfFiles} download files`)
          const ul = Cypress.$(Cypress.$($el).siblings('ul')[0])
          expect(ul.find("a").length).to.be.equal(numOfFiles)
        }
        else {
          const ul = Cypress.$(Cypress.$($el).siblings('ul')[0])
          expect(ul.find("a").length).to.be.equal(numOfFiles)
        }
      })
    })
  }

  it('All downloads sections should work as designed', () => {
    // Commented out ADAE downloads testing because we customized that page
    // See https://github.com/FDA/open.fda.gov/commit/3d3c4607cbf48f070940718f4ad0563c296524b1
    // verifyDownloads('Animal\\ And\\ Veterinary\\ Event', 139, 1000);
    verifyDownloads('Food\\ Enforcement', 1, 2)
    verifyDownloads('Food\\ Event', 1, 1)
    verifyDownloads('Human\\ Drug\\ Event', 1100, 3000)
    verifyDownloads('Human\\ Drug\\ Label', 10, 20)
    verifyDownloads('Human\\ NDC\\ Directory', 1, 2)
    verifyDownloads('Human\\ Drug\\ Enforcement', 1, 1)
    verifyDownloads('Medical\\ Device\\ 510k', 1, 1)
    verifyDownloads('Medical\\ Device\\ Classification', 1, 1)
    verifyDownloads('Medical\\ Device\\ Enforcement', 1, 1)
    verifyDownloads('Medical\\ Device\\ Event', 200, 400)
    verifyDownloads('Medical\\ Device\\ PMA', 1, 1)
    verifyDownloads('Medical\\ Device\\ Recall', 1, 2)
    verifyDownloads('Medical\\ Device\\ Registration\\ Listing', 2, 3)
    verifyDownloads('Medical\\ Device\\ UDI', 30, 50)
    verifyDownloads('COVID-19\\ Serological\\ Testing\\ Evaluations', 1, 1)
    verifyDownloads('Tobacco\\ Problem\\ Reports', 1, 1)
    verifyDownloads('NSDE', 1, 4)
    verifyDownloads('Substance', 1, 2)
  })


})



// / <reference types="cypress" />
import {loadAndAcceptDisclaimer} from "../../support/e2e"

const DEVICE_FIELDS = ['device_class', 'device_name', 'fei_number', 'k_number',
  'medical_specialty_description', 'pma_number', 'registration_number', 'regulation_number']
const DRUG_FIELDS = ['application_number',
  'brand_name',
  'dosage_form',
  'generic_name',
  'is_original_packager',
  'manufacturer_name',
  'nui',
  'original_packager_product_ndc',
  'package_ndc',
  'pharm_class_cs',
  'pharm_class_epc',
  'pharm_class_moa',
  'pharm_class_pe',
  'product_ndc',
  'product_type',
  'route',
  'rxcui',
  'spl_id',
  'spl_set_id',
  'substance_name',
  'unii',
  'upc'
]

context('Harmonization Table', () => {
  beforeEach(() => {
    loadAndAcceptDisclaimer('/apis/openfda-fields/')
  })

  it('Harmonization chart should be visible', () => {
    cy.get('section#fields-harmonization').should('be.visible')
  })

  it('Harmonization chart should have two action buttons, Device being the default one', () => {
    cy.get('section#fields-harmonization>div#noun-buttons').should('be.visible').within(() => {
      // Check initial state: Device is selected by default
      cy.get('div#noun-button-device').should('be.visible').should('have.class', 'selected')
      cy.get('div#noun-button-drug').should('be.visible').should('have.class', 'unselected').click()
      // Now verify Drug is selected
      cy.get('div#noun-button-device').should('have.class', 'unselected')
      cy.get('div#noun-button-drug').should('have.class', 'selected')
    })
  })

  it('Harmonization table should have sortable columns for Device', () => {
    // Verify ascending order
    cy.get('section#fields-harmonization div[role="columnheader"]:nth-of-type(1)').click()
    cy.get('section#fields-harmonization div.rt-tbody').within(() => {
      for (let i = 0; i < DEVICE_FIELDS.length; i++) {
        cy.get(`div[role="rowgroup"]:nth-of-type(${i + 1}) div[role="gridcell"]:nth-of-type(1)`)
          .should('have.text', `${DEVICE_FIELDS[i]}`)
      }
    })
    // Now verify descending order
    const reversed = Array.from(DEVICE_FIELDS).reverse()
    cy.get('section#fields-harmonization div[role="columnheader"]:nth-of-type(1)').click()
    cy.get('section#fields-harmonization div.rt-tbody').within(() => {
      for (let i = 0; i < DEVICE_FIELDS.length; i++) {
        cy.get(`div[role="rowgroup"]:nth-of-type(${i + 1}) div[role="gridcell"]:nth-of-type(1)`)
          .should('have.text', `${reversed[i]}`)
      }
    })

  })

  it('Harmonization table should have sortable columns for Drug', () => {
    cy.get('div#noun-button-drug').click()
    // Verify ascending order
    cy.get('section#fields-harmonization div[role="columnheader"]:nth-of-type(1)').click()
    cy.get('section#fields-harmonization div.rt-tbody').within(() => {
      for (let i = 0; i < DRUG_FIELDS.length; i++) {
        cy.get(`div[role="rowgroup"]:nth-of-type(${i + 1}) div[role="gridcell"]:nth-of-type(1)`)
          .should('have.text', `${DRUG_FIELDS[i]}`)
      }
    })
    // Now verify descending order
    const reversed = Array.from(DRUG_FIELDS).reverse()
    cy.get('section#fields-harmonization div[role="columnheader"]:nth-of-type(1)').click()
    cy.get('section#fields-harmonization div.rt-tbody').within(() => {
      for (let i = 0; i < DRUG_FIELDS.length; i++) {
        cy.get(`div[role="rowgroup"]:nth-of-type(${i + 1}) div[role="gridcell"]:nth-of-type(1)`)
          .should('have.text', `${reversed[i]}`)
      }
    })

  })

  it('Harmonization table should display a tooltip when hovered over field name', () => {
    cy.get('div[role="tooltip"]').should('not.exist')
    cy.get('section#fields-harmonization div[role="columnheader"]:nth-of-type(1)').click()
    cy.get('section#fields-harmonization div.rt-tbody').within(() => {
      cy.get(`div[role="rowgroup"]:nth-of-type(1) div[role="gridcell"]:nth-of-type(1)>div`)
        .trigger('mouseenter')
    })
    cy.get('div[role="tooltip"]').should('be.visible').should(($div) => {
      const text = $div.text()
      expect(text.startsWith('device_class')).to.be.true
    })

  })


})


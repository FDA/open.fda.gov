// / <reference types="cypress" />
import EndpointPagesTestHelper from "../../../../support/endpoint_test_helper"
import {loadAndAcceptDisclaimer, waitForIdle} from "../../../../support/index"

const URL = '/apis/other/substance/'

context('Substance dataset pages', () => {
  let helper

  beforeEach(() => {
    loadAndAcceptDisclaimer(URL)
    helper = new EndpointPagesTestHelper(URL, '/other/substance.json')
  })


  it('Searchable Fields page should display and work', () => {
    helper.searchableFields()
  })

  it('Download the Dataset page should display and offer download links', () => {
    helper.downloads()
  })


  it('Overview page should display a dataset description and key facts', () => {
    helper.overview()
  })

  it('How to use the API page should provide guidance on API use', () => {
    helper.howToUse()
  })

  it('Example queries page should provide one or more working API queries', () => {
    helper.exampleQueries()
  })

  it('Understanding the API Results page should display', () => {
    helper.understandingResults()
  })


  it('Interactive charts should display', () => {
    helper.infographics()
  })


})


/// <reference types="cypress" />
import EndpointPagesTestHelper from "../../../../support/endpoint_test_helper";
import {loadAndAcceptDisclaimer} from "../../../../support/index";

const URL = '/apis/animalandveterinary/event/';

context('ADAE dataset pages', () => {
    var helper;

    beforeEach(() => {
        loadAndAcceptDisclaimer(URL);
        helper = new EndpointPagesTestHelper(URL, '/animalandveterinary/event.json');
    })

    it('Overview page should display a dataset description and key facts', () => {
        helper.overview();
    })

    it('How to use the API page should provide guidance on API use', () => {
        helper.howToUse();
    })

    it('Example queries page should provide one or more working API queries', () => {
        helper.exampleQueries();
    })
   
    it('Interactive charts should display', () => {
        helper.infographics();
    })


})


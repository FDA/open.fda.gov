
import React from 'react';
import { NounName, EndpointName } from '../types';

export const description: Record<NounName, Partial<Record<EndpointName, string>>> = {
  'animalandveterinary': {
    'event': 'Reports of drug side effects, product use errors, product quality problems, and therapeutic failures.'
  },
  'food': {
    'enforcement': 'Food product recall enforcement reports.',
    'event': 'Food, dietary supplement, and cosmetic adverse event reports.'
  },
  'cosmetic': {
    'event': 'Cosmetic adverse event reports.'
  },
  'device': {
    'event': 'Reports of serious injuries, deaths, malfunctions, and other undesirable effects associated with the use of medical devices.',
    'classification': 'Medical device names, their associated product codes, their medical specialty areas (panels) and their classification.',
    '510k': 'A 510(k) is a premarket submission made to FDA to demonstrate that the device to be marketed is at least  as safe and effective, that is,  substantially equivalent, to a legally marketed device.',
    'pma': 'Premarket approval (PMA) is the FDA process of scientific and regulatory review to evaluate the safety and effectiveness of Class III medical devices.',
    'registrationlisting': 'The registration and listing dataset contains the location of medical device establishments and the devices manufactured at those establishments.',
    'recall': 'A recall is an action taken to address a problem with a medical device that violates FDA law. Recalls occur when a medical device is defective, when it could be a risk to health, or when it is both defective and a risk to health.',
    'enforcement': 'Medical device product recall enforcement reports.',
    'udi': 'Global Unique Device Identification Database (GUIDID) Device Identification dataset.',
    'covid19serology': 'Serology tests detect the presence of antibodies in the blood when the body is responding to a specific infection, like COVID-19.'
  },
  'drug': {
    'event': 'Reports of drug side effects, product use errors, product quality problems, and therapeutic failures.',
    'label': 'Structured product information, including prescribing information, for approved drug products.',
    'ndc': 'NDC directory containing information on the National Drug Code (NDC)',
    'enforcement': 'Drug product recall enforcement reports.',
    'drugsfda': 'Drugs@FDA includes most of the drug products approved since 1939.',
    'drugshortages': 'Drug Shortages can occur for many reasons, including manufacturing and quality problems, delays, and discontinuations.'
},
  'other': {
    'historicaldocument': 'FDA Press Releases, 1913-2014, in searchable format',
    'nsde': 'Comprehensive NDC SPL Data Elements File',
    'substance': 'Substance information that is precise to the molecular level for use internally and externally (where appropriate).',
    'unii': 'Unique Ingredient Identifier list.'
  },
  'tobacco': {
    'problem': 'Reports about tobacco products that are damaged, defective, contaminated, smell or taste wrong, or cause undesirable health effects.',
    'researchpreventionads': 'Impact Potential of FDA\'s Tobacco Prevention Ads on Youth Attitudes and Beliefs: Meta-Analytical Evidence from A Decade\'s Worth of Copy Testing',
    'researchdigitalads': 'Exploring Attention to Digital Ads'
  },
  'transparency': {
    'crl': 'Centralized database of Complete Response Letters (CRLs)',
  }
}

export const ep_title: Record<NounName, Partial<Record<EndpointName, string>>> = {
  'animalandveterinary': {
    'event': 'Adverse event reports'
  },
  'food': {
    'enforcement': 'Recall enforcement reports',
    'event': 'CAERS reports'
  },
  'cosmetic': {
    'event': 'Adverse event reports.'
  },
  'device': {
    'event': 'Adverse event reports',
    'classification': 'Classification',
    '510k': '510(k) clearances',
    'pma': 'Premarket approval',
    'registrationlisting': 'Registrations and listings',
    'recall': 'Recalls',
    'enforcement': 'Recall enforcement reports',
    'udi': 'Unique device identifier',
    'covid19serology': 'COVID-19 serological testing evaluations'
  },
  'drug': {
    'event': 'Adverse events',
    'label': 'Product labeling',
    'ndc': 'NDC Directory',
    'enforcement': 'Recall enforcement reports',
    'drugsfda': 'Drugs@FDA',
    'drugshortages': 'Drug shortages'
  },
  'other': {
    'historicaldocument': 'Historical Documents',
    'nsde': 'NDC SPL Data Elements',
    'substance': 'Substance Data',
    'unii': 'UNII'
  },
  'tobacco': {
    'problem': 'Tobacco Problem Reports',
    'researchpreventionads': 'Tobacco Prevention Ads Research',
    'researchdigitalads': 'Tobacco Digital Ads Research'
  },
  'transparency': {
    'crl': 'Complete Response Letters',
  }
}
export const bg_color: Record<NounName, React.CSSProperties> = {
  'animalandveterinary': { background: "linear-gradient(to right bottom, #9cf6f6, #007CBA)" },
  'food': { background: "linear-gradient(to right bottom, rgb(143, 209, 100), rgb(81, 161, 22))" },
  'cosmetic': { background: "linear-gradient(to right bottom, #CFA1CF, #592680)" },
  'device': { background: "linear-gradient(to right bottom, #ff8989, #c94747)" },
  'drug': { background: "linear-gradient(to right bottom, rgb(220, 141, 188), rgb(153, 88, 163))" },
  'other': { background: "linear-gradient(to right bottom, #9cf6f6, #099db7)" },
  'tobacco': { background: "linear-gradient(to right bottom, #e6ccb3, #6d5843)" },
  'transparency': { background: "linear-gradient(to right bottom, rgb(241 238 237), rgb(133 133 132))" },
}

export const ep_path: Record<NounName, Partial<Record<EndpointName, string>>> = {
  'animalandveterinary': {
    'event': '/apis/animalandveterinary/event/'
  },
  'food': {
    'enforcement': '/apis/food/enforcement/',
    'event': '/apis/food/event/'
  },
  'cosmetic': {
    'event': '/apis/cosmetic/event/'
  },
  'device': {
    'event': '/apis/device/event/',
    'classification': '/apis/device/classification/',
    '510k': '/apis/device/510k/',
    'pma': '/apis/device/pma/',
    'registrationlisting': '/apis/device/registrationlisting/',
    'recall': '/apis/device/recall/',
    'enforcement': '/apis/device/enforcement/',
    'udi': '/apis/device/udi/',
    'covid19serology': '/apis/device/covid19serology/'
  },
  'drug': {
    'event': '/apis/drug/event/',
    'label': '/apis/drug/label/',
    'ndc': '/apis/drug/ndc/',
    'enforcement': '/apis/drug/enforcement/',
    'drugsfda': '/apis/drug/drugsfda/',
    'drugshortages': '/apis/drug/drugshortages/'
  },
  'other': {
    'historicaldocument': '/apis/other/historicaldocument/',
    'nsde': '/apis/other/nsde/',
    'substance': '/apis/other/substance/',
    'unii': '/apis/other/unii/'
  },
  'tobacco': {
    'problem': '/apis/tobacco/problem/',
    'researchpreventionads': '/apis/tobacco/researchpreventionads/',
    'researchdigitalads': '/apis/tobacco/researchdigitalads/'
  },
  'transparency': {
    'crl': '/apis/transparency/completeresponseletters/'
  }
}
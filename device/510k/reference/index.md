---
title: Devices API reference - 510(k)
layout: default
cover: p_knee.jpg
endpoint: /device/510k
name: Device 510k
datasets:
  - dataset: Device 510k
    url: /data/510k/
    kind: Medical device 510k.
js:
  - '/static/bower_components/jquery/dist/jquery.min.js'
  - '/static/js/min/jquery-xdomainrequest.js'
  - '/static/bower_components/bootstrap/js/modal.js'
  - '/static/bower_components/bootstrap/js/affix.js'
  - '/static/bower_components/bootstrap/js/tab.js'
  - '/static/bower_components/d3/d3.min.js'
  - '/static/bower_components/c3/c3.min.js'
  - '/static/bower_components/jquery-autosize/jquery.autosize.min.js'
  - '/static/js/min/jquery-cookie.js'
  - '/static/js/min/api-scripts.js'
---
{::nomarkdown}
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
  <div class="content-heading-text">
    <div class="content-heading-title">
      Devices
    </div>
    <h1><span class="faded">api.fda.gov</span>{{ page.endpoint }} <span class="faded">API field reference</span></h1>
  </div>
</section>

<div class="row tabs">
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/event/">Adverse events</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/enforcement/">Enforcement reports</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/classification/">Device Classification</a></h2></div>
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/510k/">510(k)</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/pma/">PMA</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

<section class="reference">

## About

    {{ site.apiurl }}{{ page.endpoint }}

{% include api-status-updated.html endpoint="https://api.fda.gov/device/510k.json?" count="product_code" %}

<!-- TODO(hansnelsen): Add back disclaimer once copy is finalized -->


### How records are organized

Example:
{% highlight javascript %}
{
  "third_party_flag": "N",
  "city": "PORTLAND",
  "advisory_committee_description": "Immunology",
  "address_1": "217 READ ST.",
  "address_2": "P.O. BOX 9731",
  "statement_or_summary": "",
  "product_code": "KTN",
  "openfda": {
    "device_name": "System, Test, Infectious Mononucleosis",
    "registration_number": [
      "3008776041",
      "1031428",
      "1017835",
      "2030633",
      "8044007",
      "2023336",
      "2027969",
      "9610746",
      "2030538",
      "1641328",
      "2435505",
      "3005641941",
      "2424478",
      "3032705",
      "2025932",
      "1119779",
      "1524213",
      "3010392988",
      "1616487",
      "2950880",
      "3003917514",
      "1319679",
      "1649661",
      "3008741972",
      "2000007960",
      "2250030",
      "2024674",
      "1832216",
      "2246703",
      "2244821",
      "2247139",
      "3002792284",
      "8010096"
    ],
    "fei_number": [
      "",
      "3008776041",
      "1031428",
      "1017835",
      "1000520007",
      "1000119795",
      "1641328",
      "3005641941",
      "2424478",
      "2246703",
      "3002806557",
      "1000135116",
      "1000125596",
      "3001501421",
      "1000122189",
      "3000210620",
      "1119779",
      "1524213",
      "3010392988",
      "1616487",
      "3001451797",
      "3002701146",
      "3003917514",
      "3008741972",
      "2000007960",
      "2250030",
      "2024674",
      "1000136749",
      "1832216",
      "3000107480",
      "2244821",
      "2025932",
      "3002792284"
    ],
    "device_class": "2",
    "medical_specialty_description": "Immunology",
    "regulation_number": "866.5640"
  },
  "zip_code": "04103",
  "applicant": "VENTREX LABORATORIES, INC.",
  "decision_code": "SESE",
  "decision_date": "1987-06-29",
  "country_code": "US",
  "device_name": "VENTRESCREEN (TM) MONO",
  "advisory_committee": "IM",
  "expedited_review_flag": "",
  "contact": "JAMES W CHAMPLIN",
  "state": "ME",
  "review_advisory_committee": "IM",
  "k_number": "K872032",
  "date_received": "1987-05-27",
  "postal_code": "04103",
  "clearance_type": "Traditional",
  "decision_description": "Substantially Equivalent"
}
{% endhighlight %}

<!-- TODO(hansnelsen): Add link to dataset page once it is ready -->

{% include api-anatomy.html %}

### Results

For non-`count` queries, the `results` section includes matching device classification records returned by the API.

## Field-by-field reference

`k_number`
: **string**
: FDA-assigned premarket notification number, including leading letters.
: Leading letters "BK" indicates 510(k) clearance, or Premarket Notification, cleared by Center for Biologics Evaluation and Research.
: Leading letters "DEN" indicates De Novo, or Evaluation of Automatic Class III Designation.
: Leading letter "K" indicates 510(k) clearance, or Premarket Notification.

`clearance_type`
: **string**
: Denotes the submission method utilized for the submission of the 510(k).
: `traditional`
: `special`
: `abbreviated`
: `post`
: `nse`
: `direct`
: `track`
: `dual`

`zip_code`
: **string**
: Portion of address that designates the U.S. zip code of applicant.

`decision_code`
: **string**
: Four letter codes that denote the specific substantial equivalence decision rendered by FDA on a specific 510(k).
: `SEKD` = `Substantially Equivalent - Kit with Drugs`
: `SESD` = `Substantially Equivalent with Drug`
: `SESE` = `Substantially Equivalent`
: `SESK` = `Substantially Equivalent - Kit`
: `SESP` = `Substantially Equivalent - Postmarket Surveillance Required`
: `SESU` = `Substantially Equivalent - With Limitations`
: `SESR` = `Potential Recall`

`decision_description`
: **string**
: This is the full spelling associated with the abbreviated decision code (e.g. Substantially Equivalent - Postmarket Surveillance Required).

`statement_or_summary`
: **string**
: A statement or summary can be provided per 21 CFR 807.3(n) and (o).  A 510(k) summary, submitted under section 513(i) of the act, of the safety and effectiveness information contained in a premarket notification submission upon which a determination of substantial equivalence can be based. Safety and effectiveness information refers to safety and effectiveness data and information supporting a finding of substantial equivalence, including all adverse safety and effectiveness. The 510(k) Statement is a statement, made under section 513(i) of the act, asserting that all information in a premarket notification submission regarding safety and effectiveness will be made available within 30 days of request by any person if the device described in the premarket notification submission is determined to be substantially equivalent. The information to be made available will be a duplicate of the premarket notification submission, including any adverse safety and effectiveness information, but excluding all patient identifiers, and trade secret or confidential commercial information, as defined in 21 CFR 20.61.

`date_received`
: **date**
: Date that the FDA Document Control Center received the submission.
: `format` = `YYYY-MM-DD`

`third_party_flag`
: **string**
: Eligibility for a manufacturer to utilize a contracted Accredited Person in lieu of direct submission to FDA yielding a streamlined review process.  Criteria in section 523(b)(3) of 21 U.S.C. 360m(b).
: `Y`
: `N`

`state`
: **string**
: This is the state of record of U.S. based applicants.

`address_1`
: **string**
: Delivery address of the applicant.

`address_2`
: **string**
: Delivery address of the applicant.

`contact`
: **string**
Per 21 CFR 807.3(e), this is the official correspondent designated by the owner or operator of an establishment as responsible for the following:
(1) The annual registration of the establishment and
(2) Contact with the Food and Drug Administration for device listing; and
(3) Maintenance and submission of a current list of officers and directors to the Food and Drug Administration upon the request of the Commissioner; and
(4) The receipt of pertinent correspondence from the Food and Drug Administration directed to and involving the owner or operator and/or any of the firm’s : establishments; and
(5) The annual certification of medical device reports required by 804.30 of this chapter or forwarding the certification form to the person designated by the firm as responsible for the certification.
For 510ks received before Aug 14, 2014, this could be either the contact from the manufacturer who submitted the 510k, the third party OR the consultant; after Aug 14, 2014, it is always the Applicant (manufacturer)

`country_code`
: **string**
: The numeric 2 character code (ISO 3166-1 alpha-2) that designates the country of a postal delivery location (also known as country code).

`city`
: **string**
: City of the delivery address of the applicant.

`review_advisory_committee`
: **string**
: Known as the “510(k) Review Panel” since 2014, this helps define the review division within CDRH in which the 510(k) would be reviewed, if it were reviewed today; this is derived from the procode and is always the same as the “Review Panel” field in the Device Classification database.

`advisory_committee`
: **string**
: Code under which the product was originally classified, based on the product code. This is a historical designation for the group that initially placed a device into Class I, Class II, or Class III following the medical device amendments of May 28, 1976. Two letters indicate the medical specialty panel that was responsible for classifying the product (e.g. GU).
: `AN` = `Anesthesiology`
: `CV` = `Cardiovascular`
: `CH` = `Clinical Chemistry`
: `DE` = `Dental`
: `EN` = `Ear, Nose, Throat`
: `GU` = `Gastroenterology, Urology`
: `HO` = `General Hospital`
: `HE` = `Hematology`
: `IM` = `Immunology`
: `MI` = `Microbiology`
: `NE` = `Neurology`
: `OB` = `Obstetrics/Gynecology`
: `OP` = `Ophthalmic`
: `OR` = `Orthopedic`
: `PA` = `Pathology`
: `PM` = `Physical Medicine`
: `RA` = `Radiology`
: `SU` = `General, Plastic Surgery`
: `TX` = `Clinical Toxicology`
: `''` = `Unknown`

`advisory_committee_description`
: **string**
: Full spelling of the Advisory Committee abbreviation (e.g. Gastroenterology and Urology Devices Panel of the Medical Devices Advisory Committee).
: (note that `&` and `and` have been removed from the descriptions as they conflicted with the API syntax)

`device_name`
: **string**
: This is the proprietary name of the cleared device (trade name).

`expedited_review_flag`
: **string**
: Qualifying products are eligible for 'priority review' by CDRH in one of four possible review tracks if it is intended to treat or diagnose a life-threatening or irreversibly debilitating disease or condition and is: (1) A breakthrough technology or; (2) there is no alternative means of treatment or diagnosis; or (3) The device offers significant, clinically meaningful advantages over existing approved alternatives; or (4) the availability of the device is in the best interest of patients.

`product_code`
: **string**
: A three-letter identifier assigned to a device category. Assignment is based upon the medical device classification designated under 21 CFR Parts 862-892, and the technology and intended use of the device. Occasionally these codes are changed over time.

`postal_code`
: **string**
: A series of letters and/or digits, sometimes including spaces or punctuation, included in a postal address for the purpose of sorting mail. In the United States, this is a Zip code (below).

`applicant`
: **string**
: The manufacturer of record or third party who submits a 510(k) submission.  Also known as sponsor. Please note, before Aug 14, 2014, this could be either the manufacturer who submitted the 510k, the third party OR the consultant; after Aug 14, 2014, it is always the manufacturer.

`decision_date`
: **date**
: This is the date on which FDA rendered a final decision on a 510(k) submission.
: `format` = `YYYY-MM-DD`

### Openfda

`device_name`
: **string**
: This is the proprietary name, or trade name, of the cleared device

`medical_specialty_description`
: **string**
: Regulation Medical Specialty is assigned based on the regulation (e.g. 21 CFR Part 888 is Orthopedic Devices) which is why Class 3 devices lack the “Regulation Medical Specialty” field.

`device_class`
: **string**
: A risk based classification system for all medical devices ((Federal Food, Drug, and Cosmetic Act, section 513):
: `1` = `Class I (low to moderate risk): general controls`
: `2` =  `Class II (moderate to high risk): general controls and special controls`
: `3` = `Class III (high risk): general controls and Premarket Approval (PMA)`
: `U` = `Unclassified`
: `N` = `Not classified`
: `F` = `HDE`
: Additional information can be found [here](http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/Overview/ClassifyYourDevice/default.htm).

`regulation_number`
: **string**
: The classification regulation in the Code of Federal Regulations (CFR) under which the device is identified, described, and formally classified (Code of Federal regulations Title 21, 862.00 through 892.00).  The classification regulation covers various aspects of design, clinical evaluation, manufacturing, packaging, labeling, and postmarket surveillance of the specific medical device.
: [CFR database](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/cfrsearch.cfm)
: This field must be queried with the exact regulation number. There is no partial search.

`registration_number`
: **string**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.

`fei_number`
: **string**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.

<!-- TODO(hansnelsen): add dataset link when ready -->
</section>
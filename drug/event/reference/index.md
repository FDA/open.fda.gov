---
title: Drugs API reference - Adverse Events
layout: default
endpoints:
  - endpoint: /drug/event/
    name:  Drug adverse events
    description: 'Drug adverse events.'
    status: active
datasets:
  - dataset: FAERS
    url: "/data/faers/"
    kind: Drug adverse event reports.
js:
  - '/static/bower_components/jquery/dist/jquery.min.js'
  - '/static/bower_components/bootstrap/js/modal.js'
  - '/static/bower_components/bootstrap/js/affix.js'
  - '/static/bower_components/bootstrap/js/tab.js'
  - '/static/bower_components/d3/d3.min.js'
  - '/static/bower_components/c3/c3.min.js'
  - '/static/bower_components/jquery-autosize/jquery.autosize.min.js'
  - '/static/js/min/jquery-cookie.js'
  - '/static/js/min/api-scripts.js'
---

<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
  <div class="content-heading-text">
  <div class="content-heading-title">
  <a href="{{ site.baseurl }}/drug/event/">Data and examples</a> | API reference
  </div>
  <h1>Drugs API reference</h1>
  </div>
</section>

<div class="row tabs">
  <div class="col-sm-4 tab selected"><h2><a href="#">Adverse events</a></h2></div>
  <div class="col-sm-4 tab"><h2><a href="{{ site.baseurl }}/drug/label/reference/">Product labels</a></h2></div>
  <div class="col-sm-4 tab"><h2><a href="{{ site.baseurl }}/drug/enforcement/reference/">Enforcement reports</a></h2></div>
</div>


<section id="reference">

## About adverse events

    https://api.fda.gov/drug/event

The openFDA drug adverse event API returns data from the <a href="{{ site.baseurl }}/data/faers/">FDA Adverse Event Reporting System (FAERS)</a>, a database that contains information on adverse event and medication error reports submitted to FDA. Currently, this data covers publically releasable records submitted to the FDA from 2004-2013. The data is updated quarterly.

An adverse event is submitted to the FDA to report any undesirable experience associated with the use of a medical product in a patient. For drugs, this includes serious drug side effects, product use errors, product quality problems, and therapeutic failures for prescription or over-the-counter medicines and medicines administered to hospital patients or at outpatient infusion centers.

{% include panel.html type="warning" title="Disclaimer" text="FAERS data does have limitations. There is no certainty that the reported event (adverse event or medication error) was actually due to the product. FDA does not require that a causal relationship between a product and event be proven, and reports do not always contain enough detail to properly evaluate an event.<br /><br />Further, FDA does not receive reports for every adverse event or medication error that occurs with a product. Many factors can influence whether or not an event will be reported, such as the time a product has been marketed and publicity about an event.<br /><br />Submission of a safety report does not constitute an admission that medical personnel, user facility, importer, distributor, manufacturer or product caused or contributed to the event. The information in these reports has not been scientifically or otherwise verified as to a cause and effect relationship and cannot be used to estimate the incidence of these events." %}

In 2012, FDA changed from the Adverse Event Reporting System (AERS) to the FDA Adverse Event Reporting System (FAERS). There was a minor shift in terms as part of this transition. If you are using data from before December 2012, you should be aware of this shift.

### Format

Adverse event reports use the [ICH E2b/M2 version 2.1 standard.](http://estri.ich.org/e2br22/ICH_ICSR_Specification_V2-3.pdf) OpenFDA annotates the original records with [special fields.](#openfda-fields)

### Data downloads

FDA releases [quarterly updates to FAERS data.](http://www.fda.gov/Drugs/GuidanceComplianceRegulatoryInformation/Surveillance/AdverseDrugEffects/ucm082193.htm) OpenFDA uses these extracts, but processes the data further before supplying them through the API. During our beta testing, we are investigating the best ways to offer direct downloads of data provided by the API.

There are no plans for the OpenFDA initiative to change the FAERS release protocols. At this time it is anticipated that FAERS downloads will continue to be available from the same site on the same quarterly schedule. OpenFDA is a research project to make access to these datasets easier, not replace the current process. The information available through openFDA is not for clinical production use and is in beta testing. While the FDA makes every effort to ensure the data is accurate, it should be assumed that all results are not validated.

### Who reports adverse events?

Reporting of adverse events by healthcare professionals and consumers is voluntary in the United States. FDA receives some adverse event reports directly from healthcare professionals (such as physicians, pharmacists, nurses and others) and consumers (such as patients, family members, lawyers and others). Healthcare professionals and consumers may also report adverse events to the products’ manufacturers. If a manufacturer receives an adverse event report, it is normally required to send the report to FDA.

### Responsible use of the data

Adverse event reports submitted to FDA do not undergo extensive validation or verification. Therefore, **a causal relationship cannot be established between product and reactions listed in a report.** While a suspected relationship *may* exist, it is not medically validated and should not be the sole source of information for clinical decision making or other assumptions about the safety or efficacy of a product.

Additionally, it is important to remember that adverse event reports represent a small percentage of total usage numbers of a product. Common products may have a higher number of adverse events due to the higher total number of people using the product. In recent years the FDA has undertaken efforts to increase collection of adverse events. Increases in the total number of adverse events is likely caused by improved reporting.

### How adverse events are organized

Adverse events are collected through a series of *safety reports.* Each is identified by a 8-digit string (for instance, `6176304-1`). The first 7 digits (before the hyphen) identify the individual report, and the last digit (after the hyphen) is a checksum. Rather than updating individual records in FAERS, subsequent updates are submitted in seperate reports.

## Anatomy of a response

Here's an example API return from openFDA. This particular response features one result. The return is split into two high-level sections: `meta` and `results`. Note that this record is not real.

{% highlight javascript %}
{
  "meta": {
    "disclaimer": "openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.",
    "license": "http://open.fda.gov/license",
    "last_updated": "2014-05-29",
    "results": {
      "skip": 0,
      "limit": 1,
      "total": 111964
    }
  },
  "results": [
    "safetyreport": "1234567-8",
    "safetyreportversion": "17",
    "receivedate": "20041025",
    "receivedateformat": "102",
    "receiptdate": "20040224",
    "receiptdateformat": "102",
    "serious": "1",
    "seriousnesscongenitalanomali": "1",
    "seriousnessdeath": "1",
    "seriousnessdisabling": "1"
    "seriousnesshospitalization": "1",
    "seriousnesslifethreatening": "1",
    "seriousnessother": "1",
    "transmissiondate": "1",
    "transmissiondateformat": "1",
    "duplicate": "1",
    "companynumb": "200501050",
    "occurcountry": "US",
    "primarysourcecountry": "US",
    "primarysource": {
      "qualification": "1",
      "reportercountry": "UNITED STATES"
    },
    "reportduplicate": {
      "duplicatesource": "NOVARTIS",
      "duplicatenumb": "PHEH2006US00792"
    },
    "sender": {
      "sendertype": "2",
      "senderorganization": "FDA-Public Use"
    },
    "receiver": {
      "receivertype": "6",
      "receiverorganization": "FDA"
    },
    "patient": {
      "patientonsetage": "",
      "patientonsetageunit": "",
      "patientsex": "",
      "patientweight": "",
      "patientdeath": {
        "patientdeathdate": "20030401",
        "patientdeathdateformat": "102"
      },
      "drug": [
        {
          "actiondrug": "1",
          "drugadditional": "1",
          "drugcumulativedosagenumb": "4100",
          "drugcumulativedosageunit": "003",
          "drugdosageform": "Tablet",
          "drugintervaldosagedefinition": "804",
          "drugintervaldosageunitnumb": "1",
          "drugrecurreadministration": "3",
          "drugseparatedosagenumb": "1",
          "drugstructuredosagenumb": "600",
          "drugstructuredosageunit": "003",
          "drugadministrationroute": "048",
          "drugauthorizationnumb": "021223",
          "drugbatchnumb": "020113A",
          "drugcharacterization": "1",
          "drugdoseagetext": "3.5 MG/KG, 1 IN 1 AS NECESSARY, INTRAVENOUS DRIP",
          "drugenddate": "20020920",
          "drugenddateformat": "102",
          "drugindication": "RHEUMATOID ARTHRITIS",
          "drugstartdate": "20020903",
          "drugstartdateformat": "102",
          "drugtreatmentduration": "1",
          "drugtreatmentdurationunit": "804",
          "medicinalproduct": "ASCORBIC ACID",
          "openfda": {
            "spl_id": [
              "f67ce1df-27ea-4c67-a8a3-daf3fb3b9a92",
              "72133842-ac3f-4a39-a825-38e01930a0a7"
            ],
            "product_ndc": [
              "0389-0486",
              "67457-118",
              "67457-303"
            ],
            "route": [
              "INTRAMUSCULAR",
              "INTRAVENOUS",
              "SUBCUTANEOUS"
            ],
            "substance_name": [
              "ASCORBIC ACID"
            ],
            "rxcui": [
              "308395"
            ],
            "spl_set_id": [
              "a6c36a36-28ee-4a1b-86fe-98ef94064b68",
              "d05200cb-cf29-4bc7-bf0c-b42ab2d20958"
            ],
            "package_ndc": [
              "67457-118-50",
              "0389-0486-50",
              "67457-303-50"
            ],
            "product_type": [
              "HUMAN PRESCRIPTION DRUG"
            ],
            "generic_name": [
              "ASCORBIC ACID"
            ],
            "manufacturer_name": [
              "The Torrance Company",
              "Mylan Institutional LLC"
            ],
            "brand_name": [
              "ASCORBIC ACID"
            ]
          }
        }
      ],
      "reaction": [
        {
          "reactionmeddrapt": "Osteonecrosis of jaw",
          "reactionmeddraversionpt": "16.1",
          "reactionoutcome": "6"
        },
        {
          "reactionmeddrapt": "HYPERTENSION"
        },
        {
          "reactionmeddrapt": "POLYTRAUMATISM"
        }
      ]
    }
  ]
}
{% endhighlight %}

#### Meta section

The `meta` section provides a number of important details about the results given by the API endpoint.

{% highlight javascript %}
"meta": {
  "disclaimer": "openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.",
  "license": "http://open.fda.gov/license",
  "last_updated": "2014-05-29",
  "results": {
    "skip": 0,
    "limit": 1,
    "total": 111964
  }
}
{% endhighlight %}

`disclaimer`
: **string**
: Important details about the openFDA beta and limitations of the dataset.

`license`
: **string**
: A link to a web page providing information on the licensing terms of data within openFDA.

`last_updated`
: **string**
: The last date when openFDA was updated. Note that this does not correspond to the last report date in the system. Rather, it is the last time openFDA received a system or data update.

`results`
: **Dictionary**
: A dictionary of details about the results section.

`results.skip`
: **Integer**
: The offset of the results, as provided by the `skip` parameter in the URL.

`results.limit`
: **Integer**
: The number of results out of the total number of returns that are provided, as provided by the `limit` parameter in the URL.

`results.total`
: **Integer**
: The total number of results fitting the search criteria.

#### Results section

For non-`count` queries, the `results` section includes matching adverse event reports returned by the API.

Each adverse event report consists of these major sections:

- **Header:** General information about the adverse event
- **Patient Information:** Details on the patient who experienced the event, such as age, weight, sex, etc.
- **Drugs:** Information on the drugs taken while the event was experienced
- **Ractions:** Information on the reactions experienced by the patient

### Field reference

#### Header

General information about the adverse event.

{% highlight javascript %}
"safetyreport": "1234567-8",
"safetyreportversion": "17",
"receivedate": "20041025",
"receivedateformat": "102",
"receiptdate": "20040224",
"receiptdateformat": "102",
"serious": "1",
"seriousnesscongenitalanomali": "1",
"seriousnessdeath": "1",
"seriousnessdisabling": "1"
"seriousnesshospitalization": "1",
"seriousnesslifethreatening": "1",
"seriousnessother": "1",
"transmissiondate": "1",
"transmissiondateformat": "1",
"duplicate": "1",
"companynumb": "200501050",
"occurcountry": "US",
"primarysourcecountry": "US"
"primarysource": {
  "qualification": "1",
  "reportercountry": "UNITED STATES"
},
"reportduplicate": {
  "duplicatesource": "NOVARTIS",
  "duplicatenumb": "PHEH2006US00792"
},
"sender": {
  "sendertype": "2",
  "senderorganization": "FDA-Public Use"
},
"receiver": {
  "receivertype": "6",
  "receiverorganization": "FDA"
}
{% endhighlight %}

`safetyreportid`
: **string**
: The 8-digit Safety Report ID number. The first 7 digits (before the hyphen) identify the individual report and the last digit (after the hyphen) is a checksum.

`safetyreportversion`
: **string**
: The version number of the `safetyreportid`. Multiple versions of the same report may exist, it is generally best to only count the latest report and disregard others. OpenFDA will only return the latest version of a report.

`receivedate`
: **string**
: Date that the report was *first* received by FDA. If this report has multiple versions, this will be the date the first version was received by FDA.

`receivedateformat`
: **string**
: Identifies the encoding format of the `receivedate` field. Always set to `102` (YYYYMMDD).

`receiptdate`
: **string**
: Date that *most recent information* in the report was received by FDA.

`receiptdateformat`
: **string**
: Identifies the encoding format of the `receiptdate` field. Always set to `102` (YYYYMMDD).

`serious`
: **string**
: `1` = The adverse event resulted in death, a life threatening condition, hospitalization, disability, congenital anomali, or other serious condition.
: `2` = The adverse event did not result in any of the above.

`seriousnesscongenitalanomali`
: **string**
: This value is `1` if the adverse event resulted in a congenital anomali, and absent otherwise.

`seriousnessdeath`
: **string**
: This value is `1` if the adverse event resulted in death, and absent otherwise.

`seriousnessdisabling`
: **string**
: This value is `1` if the adverse event resulted in disability, and absent otherwise.

`seriousnesshospitalization`
: **string**
: This value is `1` if the adverse event resulted in a hospitalization, and absent otherwise.

`seriousnesslifethreatening`
: **string**
: This value is `1` if the adverse event resulted in a life threatening condition, and absent otherwise.

`seriousnessother`
: **string**
: This value is `1` if the adverse event resulted in some other serious condition, and absent otherwise.

`transmissiondate`
: **string**
: Date that the record was created. This may be earlier than the date the record was received by the FDA.

`transmissiondateformat`
: **string**
: Identifies the encoding format of the `transmissiondate` field. Always set to `102` (YYYYMMDD).

`duplicate`
: **string**
: This value is `1` if the report has had previous versions submitted. OpenFDA only shows the most recent version.

`companynumb`
: **string**
: Identifier for the company providing the report. This is self-assigned.

`occurcountry`
: **string**
: The name of the country where the event occured.

`primarysourcecountry`
: **string**
: The country of the reporter of the event.

`primarysource`
: **Dictionary**
: Information about the source provider of the adverse event.

`primarysource.qualification`
: **string**
: An encoded value for the category of individual submitting the report.
: `1` = Physician
: `2` = Pharmacist
: `3` = Other Health Professional
: `4` = Lawyer
: `5` = Consumer or non-health professional

`primarysource.reportercountry`
: **string**
: The name of the country from which the report was submitted.

`reportduplicate`
: **Dictionary**
: If a report is a duplicate or more recent version than a previously submitted report, this field will provide additional details on source provider.

`reportduplicate.duplicatesource`
: **string**
: The name of the organization providing the duplicate.

`reportduplicate.duplicatenumb`
: **string**
: The case identifier for the duplicate.

`sender`
: **Dictionary**
: Information on the organization sending the report.

`sender.sendertype`
: **string**
: The name of the organization sending the report. Because FDA is providing these reports to you, it will always appear as `2`.
: `1` = Pharmaceutical Company
: `2` = Regulatory Authority
: `3` = Health Professional
: `4` = Regional Pharmacovigilance Center
: `5` = WHO Collaborating
Center for International
Drug Monitoring
: `6` = Other

`sender.senderorganization`
: **string**
: The name of the organization sending the report. Because FDA is providing these reports to you, it will always appear as `FDA-Public Use`.

`receiver`
: **Dictionary**
: Information on the organization receiving the report.

`receiver.receivertype`
: **string**
: The name of the organization receiving the report.
: `1` = Pharmaceutical Company
: `2` = Regulatory Authority
: `3` = Health Professional
: `4` = Regional Pharmacovigilance Center
: `5` = WHO Collaborating
Center for International
Drug Monitoring
: `6` = Other

`receiver.receiverorganization`
: **string**
: The name of the organization receiving the report.


#### Patient

Information about the patient in the adverse event report.

{% highlight javascript %}
patient: {
  "patientonsetage": "59",
  "patientonsetageunit": "801",
  "patientsex": "2",
  "patientweight": "78",
  "patientdeath": {
    "patientdeathdate": "20030401",
    "patientdeathdateformat": "102"
  },
    "drug": [
      {
        "actiondrug": "1",
        "drugadditional": "1",
        "drugcumulativedosagenumb": "4100",
        "drugcumulativedosageunit": "003",
        "drugdosageform": "Tablet",
        "drugintervaldosagedefinition": "804",
        "drugintervaldosageunitnumb": "1",
        "drugrecurreadministration": "3",
        "drugseparatedosagenumb": "1",
        "drugstructuredosagenumb": "600",
        "drugstructuredosageunit": "003",
        "drugadministrationroute": "048",
        "drugauthorizationnumb": "021223",
        "drugbatchnumb": "020113A",
        "drugcharacterization": "1",
        "drugdoseagetext": "3.5 MG/KG, 1 IN 1 AS NECESSARY, INTRAVENOUS DRIP",
        "drugenddate": "20020920",
        "drugenddateformat": "102",
        "drugindication": "RHEUMATOID ARTHRITIS",
        "drugstartdate": "20020903",
        "drugstartdateformat": "102",
        "drugtreatmentduration": "1",
        "drugtreatmentdurationunit": "804",
        "medicinalproduct": "ASCORBIC ACID",
        "openfda": {
          "spl_id": [
            "f67ce1df-27ea-4c67-a8a3-daf3fb3b9a92",
            "72133842-ac3f-4a39-a825-38e01930a0a7"
          ],
          "product_ndc": [
            "0389-0486",
            "67457-118",
            "67457-303"
          ],
          "route": [
            "INTRAMUSCULAR",
            "INTRAVENOUS",
            "SUBCUTANEOUS"
          ],
          "substance_name": [
            "ASCORBIC ACID"
          ],
          "rxcui": [
            "308395"
          ],
          "spl_set_id": [
            "a6c36a36-28ee-4a1b-86fe-98ef94064b68",
            "d05200cb-cf29-4bc7-bf0c-b42ab2d20958"
          ],
          "package_ndc": [
            "67457-118-50",
            "0389-0486-50",
            "67457-303-50"
          ],
          "product_type": [
            "HUMAN PRESCRIPTION DRUG"
          ],
          "generic_name": [
            "ASCORBIC ACID"
          ],
          "manufacturer_name": [
            "The Torrance Company",
            "Mylan Institutional LLC"
          ],
          "brand_name": [
            "ASCORBIC ACID"
          ]
        }
      }
    ],
    "reaction": [
      {
        "reactionmeddrapt": "Osteonecrosis of jaw",
        "reactionmeddraversionpt": "16.1",
        "reactionoutcome": "6"
      },
      {
        "reactionmeddrapt": "HYPERTENSION"
      },
      {
        "reactionmeddrapt": "POLYTRAUMATISM"
      }
    ]
  }
}
{% endhighlight %}

`patient.patientonsetage`
: **string**
: The age of the patient when the event first occured.

`patient.patientonsetageunit`
: **string**
: The unit of measurement for the `patient.patientonsetage` field.
: `800` = Decade
: `801` = Year
: `802` = Month
: `803` = Week
: `804` = Day
: `805` = Hour

`patient.patientsex`
: **string**
: The sex of the patient.
: `0` = Unknown
: `1` = Male
: `2` = Female

`patient.patientweight`
: **string**
: The weight of the patient expressed in kilograms.

`patient.patientdeath`
: **Dictionary**
: If the patient died, this section contains information about the death.

`patient.patientdeath.patientdeathdate`
: **string**
: Date that the patient died.

`patient.patientdeath.patientdeathdateformat`
: **string**
: Identifies the encoding format of the `tient.patientdeath.patientdeathdate` field. Always set to `102` (YYYYMMDD).

##### Patient Drug Data

`patient.drug`
: **Array of dictionaries**
: The drugs taken by the patient at the time of the event.

`patient.drug.actiondrug`
: **string**
: Actions taken with the drug
: `1` = Drug withdrawnw
: `2` = Dose reduced
: `3` = Dose increased
: `4` = Dose not changed
; `5` = Unknown
: `6` = Not applicable

`patient.drug.drugadditional`
: **string**
: Additional details about the circumstances behind taking the drug.

`patient.drug.drugcumulativedosagenumb`
: **string**
: The cumulative dose taken until the first reaction was experienced.

`patient.drug.drugcumulativedosageunit`
: **string**
: The unit for `drugcumulativedosagenumb`

: `001` = kg kilogram(s)
: `002` = G gram(s)
: `003` = Mg milligram(s)
: `004` = μg microgram(s)

`patient.drug.drugdosageform`
: **string**
: The form through which the drug was taken.

`patient.drug.drugintervaldosagedefinition`
: **string**
: The unit for the interval in `patient.drug.drugintervaldosageunitnumb`.
: `801` = Year
: `802` = Month
: `803` = Week
: `804` = Day
: `805` = Hour
: `806` = Minute
: `807` = Trimester
: `810` = Cyclical
: `811` = Trimester
: `812` = As Necessary
: `813` = Total

`patient.drug.drugintervaldosageunitnumb`
: **string**
: Number of units in `patient.drug.drugintervaldosagedefinition`

`patient.drug.drugrecurreadministration`
: **string**
: Value for if the reaction occured on a readministration of the drug.
: `1` = Yes
: `2` = No
: `3` = Unknown

`patient.drug.drugseparatedosagenumb`
: **String*
: The number of separate dosages

`patient.drug.drugstructuredosagenumb`
: **string**
: The number of doses

`patient.drug.drugstructuredosageunit`
: **string**
: The unit for `drugstructuredosagenumb`
: `001` = kg kilogram(s)
: `002` = G gram(s)
: `003` = Mg milligram(s)
: `004` = μg microgram(s)

`patient.drug.drugadministrationroute`
: The drug's route of administration.
: `001` = Auricular (otic)
: `002` = Buccal
: `003` = Cutaneous
: `004` = Dental
: `005` = Endocervical
: `006` = Endosinusial
: `007` = Endotracheal
: `008` = Epidural
: `009` = Extra-amniotic
: `010` = Hemodialysis
: `011` = Intra corpus cavernosum
: `012` = Intra-amniotic
: `013` = Intra-arterial
: `014` = Intra-articular
: `015` = Intra-uterine
: `016` = Intracardiac
: `017` = Intracavernous
: `018` = Intracerebral
: `019` = Intracervical
: `020` = Intracisternal
: `021` = Intracorneal
: `022` = Intracoronary
: `023` = Intradermal
: `024` = Intradiscal (intraspinal)
: `025` = Intrahepatic
: `026` = Intralesional
: `027` = Intralymphatic
: `028` = Intramedullar (bone marrow)
: `029` = Intrameningeal
: `030` = Intramuscular
: `031` = Intraocular
: `032` = Intrapericardial
: `033` = Intraperitoneal
: `034` = Intrapleural
: `035` = Intrasynovial
: `036` = Intratumor
: `037` = Intrathecal
: `038` = Intrathoracic
: `039` = Intratracheal
: `040` = Intravenous bolus
: `041` = Intravenous drip
: `042` = Intravenous (not otherwise specified)
: `043` = Intravesical
: `044` = Iontophoresis
: `045` = Nasal
: `046` = Occlusive dressing technique
: `047` = Ophthalmic
: `048` = Oral
: `049` = Oropharingeal
: `050` = Other
: `051` = Parenteral
: `052` = Periarticular
: `053` = Perineural
: `054` = Rectal
: `055` = Respiratory (inhalation)
: `056` = Retrobulbar
: `057` = Sunconjunctival
: `058` = Subcutaneous
: `059` = Subdermal
: `060` = Sublingual
: `061` = Topical
: `062` = Transdermal
: `063` = Transmammary
: `064` = Transplacental
: `065` = Unknown
: `066` = Urethral
: `067` = Vaginal

`patient.drug.drugauthorizationnumb`
: The Authorization or Application number of the drug

`patient.drug.drugbatchnumb`
: Lot Number of the product

`patient.drug.drugcharacterization`
: Reported role of the drug in the adverse event.
: `1` = Suspect drug
: `2` = Concomitant drug
: `3` = Interacting drug

`patient.drug.drugdosagetext`
: Additional detail about the dosage taken.

`patient.drug.drugenddate`
: Date the patient ended taking the drug.

`patient.drug.drugenddateformat`
: Identifies the encoding format of the `patient.drug.drugenddateformat` field. Always set to `102` (YYYYMMDD).

`patient.drug.drugindication`
: Indication for use in the case.

`patient.drug.drugstartdate`
: Date the patient began taking the drug.

`patient.drug.drugstartdateformat`
: Identifies the encoding format of the `patient.drug.drugstartdate` field. Always set to `102` (YYYYMMDD).

`patient.drug.drugtreatmentduration`
: The length of time the patient was using the drug.

`patient.drug.drugtreatmentdurationunit`
: The unit for `patient.drug.drugtreatmentduration`
: `801` = Year
: `802` = Month
: `803` = Week
: `804` = Day
: `805` = Hour
: `806` = Minute

`patient.drug.medicinalproduct`
: Valid Trade name of the product

##### openFDA fields

`openfda`
: **Dictionary**
: For all fields in `openfda`, see the [API Basics]({{ site.baseurl }}/api/reference/#openfda-fields) reference guide.

Different datasets use different drug identifiers—brand name, generic name, NDA, NDC, etc. It can be difficult to find the same drug in different datasets. And some identifiers, like pharmacologic class, are useful search filters but not available in all datasets.

OpenFDA features harmonization of drug identifiers, to make it easier to connect adverse event report records to other drug information. Drug products that appear in FAERS records are joined to the NDC dataset first on brand name, and if there is no brand name, on generic name. If that is succesful, further links are established to other datasets. **The linked data is listed as an `openfda` annotation in the `patient.drug` section of a result.**

Roughly 86% of adverse event records have at least one `openfda` section. Because the harmonization process requires an exact match, some drug products cannot be harmonized in this fashion—for instance, if the drug name is misspelled. Some drug products will have `openfda` sections, while others will never, if there was no match during the harmonization process.

{% include panel.html type="warning" title="Important note about <strong>openfda</strong> fields" text="A single drug product listed in an adverse event report may have multiple associated manufacturer names, NDCs, and SPLs in a corresponding <strong>openfda</strong> section. That is because the drug may have multiple manufacturers, packagers, dosage forms, etc. Their inclusion in the <strong>openfda</strong> section does not mean that they had any connection to the adverse event. The ordering of data in <strong>openfda</strong> fields is not significant." %}


##### Patient reaction data

`patient.reaction.reactionmeddrapt`
: [MedDRA](http://www.meddra.org/) term(s) for the reaction(s). Note that these terms are encoded in British English. For instance, "diarrhea" is recorded as "diarrohea."

`patient.reaction.reactionmeddraversionpt`
: The [MedDRA](http://www.meddra.org/) version that `patient.reaction.reactionmeddrapt` uses.

`patient.reaction.reactionoutcome`
: Outcome of the reaction/event at the time of last observation
: `1` = recovered/resolved
: `2` = recovering/resolving
: `3` = not recovered/not resolved
: `4` = recovered/resolved with sequelae
: `5` = fatal
: `6` = unknown


## Datasets

The following datasets provide data for this endpoint.

{% include api-reference/datasets.html datasets=page.datasets %}

</section>

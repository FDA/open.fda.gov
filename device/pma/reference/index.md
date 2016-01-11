---
title: Devices API reference - Device pma
layout: default
cover: p_knee.jpg
endpoint: /device/pma
name: Device pma
datasets:
  - dataset: Device PMA
    url: /data/pma/
    kind: Medical device pma.
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
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/510k/">510(k)</a></h2></div>
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/pma/">PMA</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

<section class="reference">

## About

    {{ site.apiurl }}{{ page.endpoint }}

{% include api-status-updated.html endpoint="https://api.fda.gov/device/pma.json?" count="product_code" %}

[General information about PMA](http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/PremarketSubmissions/PremarketApprovalPMA/default.htm) that contains seemly everything that needs to be known about PMA.

`PMA` is any premarket approval application for a class III medical device, including all information submitted with or incorporated by reference. "PMA" includes a new drug application for a device under section 520(l) of the FD&C Act.

<!-- TODO(hansnelsen): Add back disclaimer once copy is finalized -->

### Downloads

{% include api-download.html endpoint="device.pma" %}

### How records are organized
Example:
{% highlight javascript %}
{
  "decision_code": "LE30",
  "supplement_number": "S031",
  "supplement_type": "30-DAY NOTICE",
  "decision_date": "2010-11-24",
  "product_code": "NIP",
  "city": "FLAGSTAFF",
  "zip": "86005",
  "pma_number": "P040037",
  "generic_name": "",
  "openfda": {
    "regulation_number": "",
    "fei_number": [
      "",
      "3001732452",
      "2183870",
      "3002504068",
      "1048735",
      "3003528016",
      "3007049942",
      "3002806434",
      "3004091615",
      "1643918",
      "3004635528",
      "1721676",
      "3005364322",
      "2183744",
      "3005941719",
      "3002095335",
      "3005544822",
      "3008443827",
      "2024168",
      "3001451463",
      "2017233",
      "1016427",
      "3010097171",
      "3002807090"
    ],
    "device_name": "Stent, Superficial Femoral Artery",
    "device_class": "3",
    "medical_specialty_description": "Unknown",
    "registration_number": [
      "2183870",
      "9616099",
      "3002504068",
      "1048735",
      "9681442",
      "2939561",
      "9681834",
      "3004091615",
      "1643918",
      "1721676",
      "1225687",
      "3005364322",
      "2183744",
      "3005941719",
      "2134265",
      "3005544822",
      "9612164",
      "3008443827",
      "2024168",
      "2134244",
      "2017233",
      "1016427",
      "3010097171",
      "3002807090"
    ]
  },
  "state": "AZ",
  "date_received": "2010-10-27",
  "trade_name": "GORE VIABAHN ENDOPROSTHESIS",
  "supplement_reason": "PROCESS CHANGE: MANUFACTURING",
  "advisory_committee_description": "Cardiovascular",
  "zip_ext": "",
  "street_1": "3250 W. KILTIE LANE",
  "street_2": "",
  "docket_number": "",
  "applicant": "W.L. GORE & ASSOCIATES,INC",
  "advisory_committee": "CV",
  "expedited_review_flag": "N",
  "ao_statement": "DUPLICATE MANUFACTURING PROCESS AT THE MEDICAL CENTRAL BUILDING AT THE FLAGSTAFF FACILITY."
}
{% endhighlight %}

<!-- TODO(hansnelsen): Add link to dataset page once it is ready -->

{% include api-anatomy.html %}

### Results

For non-`count` queries, the `results` section includes matching device PMA records returned by the API.

## Field-by-field reference
`applicant`
: **string**
: The manufacturer of record or third party who submits a PMA submission for clearance (also known as sponsor).

`supplement_number`
: **string**
: FDA assigned supplement number.

`supplement_type`
: **string**
: <a href="http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?CFRPart=814">Link to general criteria used for PMA regulation.</a>


: The "PMA regulation" (21 CFR Part 814) sets forth general criteria for determining when you must submit a PMA supplement or a 30-day notice for a device modification or manufacturing change (21 CFR 814.39).


: Subpart B "Premarket Approval Application" of the PMA regulation in Part 814 describes PMA amendments and supplements.


: Subpart E -"Post Approval Requirements" describes requirements for continuing evaluation (post-approval studies), periodic reporting, and other requirements related to the continued reasonable assurance of safety and effectiveness of an approved PMA device. The Act defines different types of PMA supplements that are used to request approval of a change to a device that has an approved PMA (see section 737(4) of the Act (21 U.S.C. 379i(4)) for definitions of 180-day supplements, real-time supplements, panel-track supplements).


: `PMA supplement (180 days)` Per section 737(4)(C) of the Act (21 U.S.C. 379i(4)(C)), this is a supplement to an approved premarket application or premarket report under section 515 that is not a panel-track supplement and requests a significant change in components, materials, design, specification, software, color additives, or labeling.


: `Special PMA Supplement -- Changes Being Effected` Sections 21 CFR 814.39(d)(1) and (d)(2) provide that certain labeling and manufacturing changes that enhance the safety of the device or the safety in the use of the device may be submitted as a supplement marked “Special PMA Supplement – Changes Being Effected.” The Special PMA Supplement is a narrow exception to the general rule that prior FDA approval of changes to a PMA, including the labeling for a device, is a condition of lawful distribution and, therefore, may only be utilized when (1) the applicant has newly acquired safety-related information; (2) the information in question was not previously submitted to the FDA; and (3) the information involves labeling changes that add or strengthen a contraindication, warning, precaution, or information about an adverse reaction for which there is reasonable evidence of a causal association.


: `30-day Notice and 135 PMA Supplement` Section 515(d) of the Act (21 U.S.C. 360e), as amended by the Food and Drug Administration Modernization Act of 1997 (FDAMA)(Pub. L. 105-115), permits a PMA applicant to submit written notification to the agency of a modification to the manufacturing procedure or method of manufacture affecting the safety and effectiveness of the device rather than submitting such change as a PMA supplement. The applicant may distribute the device 30 days after the date on which FDA receives the notice, unless FDA finds such information in the 30-day notice is not adequate, notifies the applicant that the submission has been converted to a 135-day supplement (21 CFR 814.39(f)), and describes further information or action that is required for acceptance of the modification.


: `PMA Manufacturing Site Change Supplement` After approval of a PMA, an applicant shall submit a PMA supplement for review and approval by FDA before making a change that affects the safety or effectiveness of the device, including a change that uses a different facility or establishment to manufacture, process, or package the device. Such a PMA supplement for a move to a different facility or establishment is called a “manufacturing site change supplement.”


: `Annual (periodic) Report or 30-day Supplements` In accordance with 21 CFR 814.82(a)(7), FDA may require as a condition of approval submission to FDA at intervals specified in the approval order of periodic reports containing the information required by 21 CFR 814.84(b). In most cases, after the PMA is approved, the PMA applicant is required to submit reports to FDA annually unless a different time frame is specified in the approval order.

: `PMA` Any premarket approval application for a class III medical device, including all information submitted with or incorporated by reference.
: See [here](http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/PremarketSubmissions/PremarketApprovalPMA/ucm050467.htm#types) for more detail.

`decision_date`
: **date**
: `format` = `YYYY-MM-DD`
: This is the date that FDA rendered a decision on the status of a PMA submission (i.e. clearance).

`product_code`
: **string**
: A three-letter identifier assigned to a device category. Assignment is based upon the medical device classification designated under 21 CFR Parts 862-892, and the technology and intended use of the device. Occasionally these codes are changed over time.

`pma_number`
: **string**
: FDA-assigned premarket application number, including leading letters.
: Leading letter "D" indicates Product Development Protocol type of Premarket Approval.
: Leading letters "BP" indicates Premarket Approval by Center for Biologics Evaluation and Research.
: Leading letter "H" indicates Humanitarian Device Exemption approval.
: Leading letter "N" indicates New Drug Application. Early PMAs were approved as NDAs.
: Leading letter "P" indicates Premarket Approval.

`generic_name`
: **string**
: Common or generic name as specified in the submission. Not to be confused with the official device nomenclature name related to the product code.

`trade_name`
: **string**
: This is the proprietary name of the approved device.

`date_received`
: **date**
: `format` = `YYYY-MM-DD`
: Date that the FDA Document Control Center received the submission.

`supplement_reason`
: **string**
: General description for the reason for the supplement or application.

`expedited_review_flag`
: **string**
: Qualifying products are eligible for 'priority review' by CDRH in one of four possible review tracks if it is intended to treat or diagnose a life-threatening or irreversibly debilitating disease or condition and is:
: (1) A breakthrough technology or;
: (2) there is no alternative means of treatment or diagnosis; or
: (3) The device offers significant, clinically meaningful advantages over existing approved alternatives; or
: (4) the availability of the device is in the best interest of patients.

: Possible values
: `Y`
: `N`

`street_1`
: **string**
: Delivery address of the applicant.

`street_2`
: **string**
: Delivery address of the applicant.

`city`
: **string**
: City of record of the applicant.

`state`
: **string**
: Portion of address that designates the state of the applicant.

`zip`
: **string**
: Portion of address that designates the zip code of the applicant.

`zip_ext`
: **string**
: Portion of address that designates the "speed zip" or the "+4" of the applicant.

`docket_number`
: **string**
: The assigned posted docket number in the Federal Register.

`decision_code`
: **string**
: A four digit code reflecting the final decision for a PMA submission.
: `APPR` = Approval: PMA has been approved.
: `WTDR` = Withdrawal: PMA has been withdrawn.
: `DENY` = Denial: PMA has been denied.
: `LE30` = 30 day notice acceptance (decision made in ≤30 days).
: `APRL` = Reclassification after approval.
: `APWD` = Withdrawal after approval.
: `GT30` = No decision made in 30 days.
: `APCV` = Conversion after approval.

`advisory_committee`
: **string**
: This equates to the review division within CDRH in which the PMA would be reviewed, if it were reviewed today; this is derived from the procode and is always same as the "Review Panel" field in the Device Classification database (e.g. GU).
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
: Full spelling of the Advisory committee abbreviation (e.g. gastroenterology).


`ao_statement`
: **string**
: Approval order statement: a brief description of the reason for the supplement/application approval by FDA.

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

<!-- TODO(hansnelsen): Add dataset link when ready -->

</section>
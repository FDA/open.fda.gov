---
title: Devices API reference - Device classification
layout: default
cover: p_knee.jpg
endpoint: /device/classification
name: Device classification
datasets:
  - dataset: Device Classification
    url: /data/classification/
    kind: Medical device classification.
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
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/classification/">Device Classification</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/510k/">510(k)</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/pma/">PMA</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

<section class="reference">

## About

    {{ site.apiurl }}{{ page.endpoint }}

{% include api-status-updated.html endpoint="https://api.fda.gov/device/classification.json?" count="product_code" %}

<!-- TODO(hansnelsen): Add back disclaimer once copy is finalized -->

### Downloads

{% include api-download.html endpoint="device.classification" %}

### How records are organized
Example:
{% highlight javascript %}
{
  "third_party_flag": "N",
  "life_sustain_support_flag": "N",
  "gmp_exempt_flag": "Y",
  "openfda": {
    "registration_number": [
      "3005846457",
      "3008808082",
      "3007183188",
      "9616306",
      "3005885000",
      "1058152",
      "3008311431",
      "3002714597",
      "9616086",
      "3009240907",
      "3010508273",
      "3005037196",
      "2128677",
      "3006617872",
      "3004993527",
      "1625408",
      "3004129296",
      "3007076137",
      "3011611571",
      "2950684",
      "3008395114",
      "3007479130",
      "1825034",
      "3009141122",
      "9616494",
      "1000642894",
      "3007109661",
      "3010179889",
      "3007222552",
      "1822565",
      "2020737",
      "3005906953",
      "3003674698",
      "3007628943",
      "3006943846",
      "2939821",
      "1832148",
      "9616914",
      "1042714",
      "3010182295",
      "3005056396",
      "1523560",
      "3004824959",
      "1526350",
      "3005621301",
      "3003849847",
      "3007127364",
      "3008494300",
      "2921578",
      "3008386501",
      "3004939558",
      "3007115614",
      "3011497619",
      "1000570634",
      "3003967977",
      "3006227741",
      "3010123014"
    ],
    "fei_number": [
      "3005846457",
      "3008808082",
      "3007183188",
      "3005885000",
      "3008311431",
      "3002714597",
      "3009240907",
      "3010508273",
      "3005037196",
      "2128677",
      "1000547756",
      "1000123590",
      "3006617872",
      "3002771063",
      "3004993527",
      "3007222552",
      "3004129296",
      "3007076137",
      "3011611571",
      "3008395114",
      "1000220733",
      "3010179889",
      "1825034",
      "3009141122",
      "1000642894",
      "3007109661",
      "1000222089",
      "2020737",
      "1000119374",
      "3003674698",
      "1000124207",
      "3006076154",
      "3005906953",
      "1832148",
      "3006943846",
      "1042714",
      "3010182295",
      "3005056396",
      "1523560",
      "3004824959",
      "1526350",
      "3005621301",
      "3003849847",
      "3007479130",
      "3007628943",
      "3003117657",
      "3007127364",
      "3008494300",
      "2921578",
      "3008386501",
      "3004939558",
      "3007115614",
      "3011497619",
      "1000570634",
      "3003967977",
      "3006227741",
      "3010123014"
    ],
    "k_number": [
      "K830842",
      "K823811",
      "K823152"
    ]
  },
  "product_code": "ILE",
  "review_panel": "PM",
  "medical_specialty": "PM",
  "device_name": "Sling, Arm, Overhead Supported",
  "review_code": "",
  "unclassified_reason": "",
  "device_class": "1",
  "medical_specialty_description": "Physical Medicine",
  "definition": "",
  "implant_flag": "N",
  "regulation_number": "890.3475",
  "submission_type_id": "4"
}
{% endhighlight %}

<!-- TODO(hansnelsen): Add dataset page once it is ready -->

{% include api-anatomy.html %}

### Results

For non-`count` queries, the `results` section includes matching device classification records returned by the API.

## Field-by-field reference

`regulation_number`
: **string**
: The classification regulation in the Code of Federal Regulations (CFR) under which the device is identified, described, and formally classified (Code of Federal regulations Title 21, 862.00 through 892.00).  The classification regulation covers various aspects of design, clinical evaluation, manufacturing, packaging, labeling, and postmarket surveillance of the specific medical device.
: [CFR database](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/cfrsearch.cfm)
: This field must be queried with the exact regulation number. There is no partial search.

`life_sustain_support_flag`
: **string**
: An indicator that the device is essential to, or yields information that is essential to, the restoration or continuation of a bodily function important to the continuation of human life.
: `Y` = Device is used for life sustaining purposes.
: `N` = Device is _not_ used for life sustaining purposes.

`definition`
: **string**
: Compositional definition of a medical device, based on the input of nomenclature experts, incorporating the definition of components of a device

`review_code`:
: **string**
: The Panel associated with the medical specialty that determines the FDA Division that will take the lead to review the device.

`submission_type_id`
: **string**
: The submission type (510(k), PMA, 510(k) Exempt) to which a product code is limited, or “Contact ODE” if its limitations (if any) are undetermined.
: `1` = `510(K)`
: `2` = `PMA`
: `3` = `Contact ODE`
: `4` = `510(K) Exempt`

`third_party_flag`
: **string**
: Eligibility for a manufacturer to utilize a contracted Accredited Person in lieu of direct submission to FDA.  By law, FDA must in turn issue a final determination within 30 days after receiving the recommendation of an Accredited Person (yielding a streamlined review process).
: `Y` = `Device is a candidate for a third party review program`
: `N` = `Device is not a candidate for a third party review program`

`implant_flag`
: **string**
: An indicator that the device is placed into a surgically or naturally formed cavity of the human body.  Intended to remain implanted for 30 days or more; or the Commissioner makes a determination (that the device is to be considered implanted).
: `Y` = Device is implantable
: `N` = Device is _not_ implantable

`medical_specialty`
: **string**
: Regulation Medical Specialty is assigned based on the regulation (e.g. 21 CFR Part 888 is Orthopedic Devices) which is why Class 3 devices lack the “Regulation Medical Specialty” field.
: Two letters indicating the medical specialty panel responsible for reviewing the product.
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
: See [link](http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/Overview/ClassifyYourDevice/ucm051668.htm#medicalspecialty) for further detail.

`medical_specialty_description`
: **string**
: Same as above but with the codes replaced with a human readable description. Note that `&` and `and` have been removed from the descriptions as they conflicted with the API syntax).

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

`device_name`
: **string**
: This is the proprietary name, or trade name, of the cleared device

`product_code`
: **string**
: A three-letter identifier assigned to a device category. Assignment is based upon the medical device classification designated under 21 CFR Parts 862-892, and the technology and intended use of the device. Occasionally these codes are changed over time.

`review_panel`
: **string**
: Known as the “510(k) Review Panel” since 2014, this helps define the review division within CDRH in which the 510(k) would be reviewed, if it were reviewed today; this is derived from the procode and is always the same as the “Review Advisory Committee” field in the 510(k) database.

`unclassified_reason`
: **string**
: This indicates the reason why a device is unclassified (e.g. Pre-Amendment).
: `1` = `Pre-Amendment`
: `2` = `IDE`
: `3` = `For Export Only`
: `4` = `Unknown`
: `5` = `Guidance Under Development`
: `6` = `Enforcement Discretion`
: `7` = `Not FDA Regulated`

`gmp_exempt_flag`
: **string**
: An indication the device is exempt from Good Manufacturing Processes CFR 820. U.S. zip code of the Applicant
: `Y` = Exempt due to Good Manufacturing Practice (GMP)/Quality System
: `N` = _Not_ exempt due to Good Manufacturing Practice (GMP)/Quality System
: See [here](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpcd/315.cfm) for more detail.

### Openfda

Note: `device_class`, `device_name` `medical_specialty_description` and `regulation_number` are missing from this section, since they are present in the parent document.

`fei_number`
: **list of strings**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.
: `Source`: Registration and listings

`registration_number`
: **list of strings**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.
: `Source`: Registration and listings

`k_number`
: **list of strings**
: FDA-assigned premarket notification number, including leading letters.
: Leading letters "BK" indicates 510(k) clearance, or Premarket Notification, cleared by Center for Biologics Evaluation and Research.
: Leading letters "DEN" indicates De Novo, or Evaluation of Automatic Class III Designation.
: Leading letter "K" indicates 510(k) clearance, or Premarket Notification.
: `Source`: 510(k)

`pma_number`
: **list of strings**
: FDA-assigned premarket application number, including leading letters.
: Leading letter "D" indicates Product Development Protocol type of Premarket Approval.
: Leading letters "BP" indicates Premarket Approval by Center for Biologics Evaluation and Research.
: Leading letter "H" indicates Humanitarian Device Exemption approval.
: Leading letter "N" indicates New Drug Application. Early PMAs were approved as NDAs.
: Leading letter "P" indicates Premarket Approval.
: `Source`: PMA

</section>
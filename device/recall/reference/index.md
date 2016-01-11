---
title: Devices API reference - Device recall
layout: default
cover: p_knee.jpg
endpoint: /device/recall
name: Device recall
datasets:
  - dataset: Device Classification
    url: /data/recall/
    kind: Medical device recall.
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
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/pma/">PMA</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

<section class="reference">

## About

    {{ site.apiurl }}{{ page.endpoint }}

{% include api-status-updated.html endpoint="https://api.fda.gov/device/recall.json?" count="product_code" %}

### Downloads

{% include api-download.html endpoint="device.recall" %}

<!-- TODO(hansnelsen): Add back disclaimer once copy is finalized -->
<!-- TODO(hansnelsen): Add dataset page once it is ready -->

### How records are organized
Example:
{% highlight javascript %}
{
  "other_submission_description": "",
  "res_event_number": "52634",
  "firm_fei_number": "3002980729",
  "k_numbers": [
    "K082332"
  ],
  "openfda": {
    "device_name": "Orthosis, Spinal Pedicle Fixation, For Degenerative Disc Disease",
    "registration_number": [
      "2031966"
    ],
    "fei_number": [
      "3002980729"
    ],
    "device_class": "3",
    "medical_specialty_description": "Orthopedic",
    "k_number": [
      "K082332"
    ],
    "regulation_number": "888.3070"
  },
  "product_code": "NKB",
  "root_cause_description": "Device Design",
  "pma_numbers": [],
  "event_date_terminated": "2012-11-19",
  "product_res_number": "Z-0359-2013"
}
{% endhighlight %}

{% include api-anatomy.html %}

### Results

For non-`count` queries, the `results` section includes matching device recall records returned by the API.

## Field-by-field reference
`event_date_terminated`
: **date string - *YYYY-MM-DD***
: Date that FDA determined recall actions were completed and terminated the recall. For details about termination of a recall see [here](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/cfrsearch.cfm?fr=7.55).

`firm_fei_number`
: **string**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.

`product_code`
: **string**
: A three-letter identifier assigned to a device category. Assignment is based upon the medical device classification designated under 21 CFR Parts 862-892, and the technology and intended use of the device. Occasionally these codes are changed over time.

`res_event_number`
: **string**
: A five digit, numerical designation assigned by FDA to a specific recall event used for tracking purposes.

`root_cause_description`
: **string**
: FDA determined general type of recall cause. Per FDA policy, recall cause determinations are subject to modification up to the point of termination of the recall.

`k_number`
: **list of strings**
: FDA-assigned premarket notification number, including leading letters.
: Leading letters "BK" indicates 510(k) clearance, or Premarket Notification, cleared by Center for Biologics Evaluation and Research.
: Leading letters "DEN" indicates De Novo, or Evaluation of Automatic Class III Designation.
: Leading letter "K" indicates 510(k) clearance, or Premarket Notification.
: `Source`: 510(k)

`pma_numbers`
: **list of strings**
: FDA-assigned premarket application number, including leading letters.
: Leading letter "D" indicates Product Development Protocol type of Premarket Approval.
: Leading letters "BP" indicates Premarket Approval by Center for Biologics Evaluation and Research.
: Leading letter "H" indicates Humanitarian Device Exemption approval.
: Leading letter "N" indicates New Drug Application. Early PMAs were approved as NDAs.
: Leading letter "P" indicates Premarket Approval.

`other_submission_description`
: **string**
: If 510(k) or PMA numbers are not applicable to the device recalled, the recall may contain other regulatory descriptions, such as `exempt`.

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

`registration_number`
: **string**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.

`fei_number`
: **string**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.

</section>
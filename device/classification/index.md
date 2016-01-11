---
title: Devices - Device classification
layout: api
cover: p_knee.jpg
endpoint: /device/classification
name: Device classification
docs:
  - name: API reference
    url: /device/classification/reference/
---
{::nomarkdown}
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
  <div class="content-heading-text">
    <div class="content-heading-title">
      Devices
    </div>
    <h1><span class="faded">api.fda.gov</span>{{ page.endpoint }}</h1>
    <a href="{{ site.baseurl }}{{ page.endpoint }}/reference/" class="api-nav">API field reference »</a>
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

<!-- TODO(hansnelsen): add this file -->
{% include api-demo-device-classification.html endpoint=page.endpoint %}

<section class="reference">

## About device classification

The U.S. Food and Drug Administration (FDA) regulates medical devices in the United States. Medical devices range from simple tongue depressors and bedpans to complex programmable pacemakers with microchip technology and laser surgical devices. In addition, medical devices include in vitro diagnostic products, such as general purpose lab equipment, reagents, and test kits, which may include monoclonal antibody technology. Certain electronic radiation emitting products with medical application and claims meet the definition of medical device. Examples include diagnostic ultrasound products, x-ray machines, and medical lasers.

<p>The Product Classification dataset contains medical device names, their associated product codes, their medical specialty areas (panels) and their classification. The name and product code identify the generic category of a device for FDA. The product code assigned to a device is based upon the medical device product classification designated under 21 CFR Parts 862-892. </p>
<p>The Food and Drug Administration (FDA) has established classifications for approximately 1,700 different generic types of devices and grouped them into 16 medical specialties referred to as panels. Each of these generic types of devices is assigned to one of three regulatory classes based on the level of control necessary to assure the safety and effectiveness of the device.</p>
<p>For additional information, see <a href="http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/Overview/ClassifyYourDevice/default.htm">here</a>.</p>

<!-- TODO(hansnelsen): add dataset download link to dataset page once it exists  -->

{% include getting-started.html %}

## Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of device classifications.

## Downloads

{% include api-download.html endpoint="device.classification" %}

## How to search this endpoint

    {{ site.apiurl }}{{ page.endpoint }}.json?

You can search for device classifications by <a href="reference/">fields specific to the `device/classification.json` endpoint</a>.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One device classification</h4>
<div class="query-description">
This query searches for all records with a particular `regulation_number`.

 - **search** for all records with `regulation_number` equal to `872.6855`.
 - **limit** to 1 record.

</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=regulation_number:872.6855&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">One classification for a <em>NOB</em> product code</h4>
<div class="query-description">
This query searches for records matching a certain search term, and asks for a single one.

 - **search** for all records with `product_code` equals *NOB*
 - **limit** to 1 record.

See the [reference](reference/) for more fields you can use to narrow searches for device classification.
</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=product_code:NOB&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of top Facility Establishment Identifiers (FEI) for device classifications.</h4>
<div class="query-description">
This query is similar to the prior one, but returns a count of the most frequent FEI numbers.

  - **search** for all records
  - **count** the field `openfda.fei_number`

See the [reference](reference/) for more fields you can use to count and understand the nature of device adverse event reports.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?count=openfda.fei_number" %}
</div>
</div>

</section>

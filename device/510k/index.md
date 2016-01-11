---
title: Devices - 510(k)
layout: api
cover: p_knee.jpg
endpoint: /device/510k
name: Device 510(k)
docs:
  - name: API reference
    url: /device/510k/reference/
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
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/classification/">Device Classification</a></h2></div>
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/510k/">510(k)</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/pma/">PMA</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

<!-- TODO(hansnelsen): add this file -->
{% include api-demo-device-510k.html endpoint=page.endpoint %}

<section class="reference">

## About device 510(k)

<p>The premarket notification dataset contains details about specific products and the original sponsors of premarket notification applications.  It also contains administrative and tracking information about the applications and receipt and decision dates.</p>

<p>A 510(k) is a premarket submission made to FDA to demonstrate that the device to be marketed is at least as safe and effective, that is, substantially equivalent, to a legally marketed device (21 CFR 807.92(a)(3)) that is not subject to PMA. Submitters must compare their device to one or more similar legally marketed devices and make and support their substantial equivalency claims. A legally marketed device, as described in 21 CFR 807.92(a)(3), is a device that was legally marketed prior to May 28, 1976 (preamendments device), for which a PMA is not required, or a device which has been reclassified from Class III to Class II or I, or a device which has been found substantially equivalent through the 510(k) process. The legally marketed device(s) to which equivalence is drawn is commonly known as the "predicate."</p>

For additional information, see <a href="http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/PremarketSubmissions/PremarketNotification510k/default.htm">here</a>.


<!-- TODO(hansnelsen): add dataset download link dataset page once it is ready. -->

{% include getting-started.html %}

## Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of a device 510(k).

## Downloads

{% include api-download.html endpoint="device.510k" %}

## How to search this endpoint

    {{ site.apiurl }}{{ page.endpoint }}.json?

You can search for device 510(k) by <a href="reference/">fields specific to the `device/510k.json` endpoint</a>.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One device 510(k) for a <em>CV</em> advisory committee</h4>
<div class="query-description">
This query searches for all records with a particular `advisory_committee`.

 - **search** for all records with `advisory_committee` equal to `cv`.
 - **limit** to 1 record.

</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=advisory_committee:cv&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">One device 510(k) for a <em>868.5895</em> regulation number</h4>
<div class="query-description">
This query searches for records matching a certain search term, and asks for a single one.

 - **search** for all records with `openfda.regulation_number` equals *868.5895*
 - **limit** to 1 record.

See the [reference](reference/) for more fields you can use to narrow searches for device classification.
</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=openfda.regulation_number:868.5895&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of top country codes for device 510(k)</h4>
<div class="query-description">
This query is similar to the prior one, but returns a count of the most frequent country codes.

  - **search** for all records
  - **count** the field `country_code`

See the [reference](reference/) for more fields you can use to count and understand the nature of device adverse event reports.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?count=country_code" %}
</div>
</div>

</section>

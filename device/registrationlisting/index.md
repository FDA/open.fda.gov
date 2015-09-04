---
title: Devices - Device registrations and listings
layout: api
cover: p_knee.jpg
endpoint: /device/registrationlisting
name: Device registrations and listings
docs:
  - name: API reference
    url: /device/registrationlisting/reference/
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
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/510k/">510(k)</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/pma/">PMA</a></h2></div>
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

{% include api-demo-device-registrationlisting.html endpoint=page.endpoint %}

<section class="reference">

## About registrations and listings

The registration and listing dataset contains the location of medical device establishments and the devices manufactured at those establishments. Owners or operators of places of business (also called establishments or facilities) that are involved in the production and distribution of medical devices intended for use in the United States are required to register annually with the FDA. This process is known as establishment registration. Most foreign and domestic establishments that are required to register with the FDA are also required to list the devices that are made there for commercial distribution.

For additional information, see [here](http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/RegistrationandListing/default.htm).

<!-- TODO(hansnelsen): add dataset download link once it is ready -->

{% include getting-started.html %}

## Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of device registrations and listings.

## How to search this endpoint

    {{ site.apiurl }}{{ page.endpoint }}.json?

You can search for device registrations and listings by <a href="reference/">fields specific to the `device/registrationlisting.json` endpoint</a>.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One device registration and listing</h4>
<div class="query-description">
This query searches for all records with a particular `products.product_code`.

 - **search** for all records with `products.product_code` equal to `HQY`.
 - **limit** to 1 record.

</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=products.product_code:HQY&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">One registrations and listings for <em>886.5850</em> regulation number</h4>
<div class="query-description">
This query searches for records matching a certain search term, and asks for a single one.

 - **search** for all records with `products.openfda.regulation_number` equals *886.5850*
 - **limit** to 1 record.

See the [reference](reference/) for more fields you can use to narrow searches for device registrations and listings.
</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=products.openfda.regulation_number:886.5850&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of top device classes for device registrations and listings.</h4>
<div class="query-description">
This query is similar to the prior one, but returns a count of the most device classes.

  - **search** for all records
  - **count** the field `products.openfda.device_class`

See the [reference](reference/) for more fields you can use to count and understand the nature of device adverse event reports.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?count=products.openfda.device_class" %}
</div>
</div>

</section>

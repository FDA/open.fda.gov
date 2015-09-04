---
title: Devices - Device recall
layout: api
cover: p_knee.jpg
endpoint: /device/recall
name: Device recall
docs:
  - name: API reference
    url: /device/recall/reference/
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
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

{% include api-demo-device-recall.html endpoint=page.endpoint %}

<section class="reference">

## About device recalls

A recall is an action taken to address a problem with a medical device that violates FDA law. Recalls occur when a medical device is defective, when it could be a risk to health, or when it is both defective and a risk to health. Recall as defined in 21 CFR 7.3(g) is “a firm's removal or correction of a marketed product that the Food and Drug Administration considers to be in violation of the laws it administers and against which the agency would initiate legal action, e.g., seizure. Recall does not include a market withdrawal or a stock recovery.”  If a firm conducts a recall to reduce a risk to health, the firm is required to submit a written report to the FDA with the information described in 21 CFR 806.10.

For additional information, see [here](http://www.fda.gov/MedicalDevices/Safety/ListofRecalls/ucm329946.htm).

<!-- TODO(hansnelsen): Add dataset page once it is ready -->
{% include getting-started.html %}

## Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of device recalls.

## How to search this endpoint

    {{ site.apiurl }}{{ page.endpoint }}.json?

You can search for device recalls by <a href="reference/">fields specific to the `device/recall.json` endpoint</a>.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One device recall for product code <em>FOZ</em></h4>
<div class="query-description">
This query searches for all records with a particular `product_code`.

 - **search** for all records with `product_code` equal to `FOZ`.
 - **limit** to 1 record.

</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=product_code:FOZ&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">One recall for a <em>880.5200</em> regulation number</h4>
<div class="query-description">
This query searches for records matching a certain search term, and asks for a single one.

 - **search** for all records with `openfda.regulation_number` equals *880.5200*
 - **limit** to 1 record.

See the [reference](reference/) for more fields you can use to narrow searches for device recall.
</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=openfda.regulation_number:880.5200&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of top product codes for device recalls.</h4>
<div class="query-description">
This query is similar to the prior one, but returns a count of the most popular product codes.

  - **search** for all records
  - **count** the field `product_code`

See the [reference](reference/) for more fields you can use to count and understand the nature of device recalls.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?count=product_code" %}
</div>
</div>

</section>

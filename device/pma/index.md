---
title: Devices - Device pma
layout: api
cover: p_knee.jpg
endpoint: /device/pma
name: Device pma
docs:
  - name: API reference
    url: /device/pma/reference/
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
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/pma/">PMA</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

<!-- TODO(hansnelsen): add this file -->
{% include api-demo-device-pma.html endpoint=page.endpoint %}

<section class="reference">

## About device pre-market approval

The PMA dataset contains details about specific products and the sponsors of premarket approval applications and supplements.  It also contains administrative and tracking information about the applications and receipt and decision dates.
Premarket approval (PMA) is the FDA process of scientific and regulatory review to evaluate the safety and effectiveness of Class III medical devices. An approved PMA Application is, in effect, a private license granted to the applicant for marketing a particular medical device.

Class III devices are those that support or sustain human life, are of substantial importance in preventing impairment of human health, or that present a potential, unreasonable risk of illness or injury. Due to the level of risk associated with Class III devices, FDA has determined that general and special controls alone are insufficient to assure the safety and effectiveness of class III devices.

<!-- TODO(hansnelsen): add dataset page link once it is ready. -->

{% include getting-started.html %}

## Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of device pre-market approval.

## Downloads

{% include api-download.html endpoint="device.pma" %}

## How to search this endpoint

    {{ site.apiurl }}{{ page.endpoint }}.json?

You can search for device classifications by <a href="reference/">fields specific to the `device/pma.json` endpoint</a>.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One PMA record with the <em>decision_code</em> equal to <em>APPR</em> </h4>
<div class="query-description">
This query searches for all records with a particular `decision_code`.

 - **search** for all records with `decision_code` equal to `APPR`.
 - **limit** to 1 record.

</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=decision_code:APPR&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">One PMA record for the <em>LWP</em> product code</h4>
<div class="query-description">
This query searches for records matching a certain search term, and asks for a single one.

 - **search** for all records with `product_code` equals *LWP*
 - **limit** to 1 record.

See the [reference](reference/) for more fields you can use to narrow searches for device classification.
</div>
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?search=product_code:LWP&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of top advisory committees for PMA submissions.</h4>
<div class="query-description">
This query is similar to the prior one, but returns a count of the most frequent advisory committees.

  - **search** for all records
  - **count** the field `advisory_committee`

See the [reference](reference/) for more fields you can use to count and understand the nature of device PMA approval.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html endpoint=page.endpoint query=".json?count=advisory_committee" %}
</div>
</div>

</section>

---
title: Devices - Adverse event reports
layout: api
cover: p_knee.jpg
endpoints:
  - endpoint: /device/event/
    name:  Device adverse event reports
    description: 'Device adverse event reports.'
    status: active
    docs:
      - name: API reference
        url: /device/event/reference/
---
{::nomarkdown}
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
  <div class="content-heading-text">
    <div class="content-heading-title">
      Getting started | <a href="{{ site.baseurl }}/device/event/reference/">Reference</a>
    </div>
    <h1>Devices</h1>
  </div>
</section>

<div class="row tabs">
  <div class="col-sm-6 tab selected"><h2><a href="#">Adverse events</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/enforcement/">Enforcement reports</a></h2></div>
</div>
{:/}

<section id="endpoint">

{% include api-demo-device-event.html %}

## About device adverse events

The U.S. Food and Drug Administration (FDA) regulates medical devices in the United States. Medical devices range from simple tongue depressors and bedpans to complex programmable pacemakers with microchip technology and laser surgical devices. In addition, medical devices include in vitro diagnostic products, such as general purpose lab equipment, reagents, and test kits, which may include monoclonal antibody technology. Certain electronic radiation emitting products with medical application and claims meet the definition of medical device. Examples include diagnostic ultrasound products, x-ray machines, and medical lasers.

An adverse event report is submitted to the FDA to report serious events or undesirable experiences associated with the use of a medical device.

### Adverse event reports

Each year, the FDA receives several hundred thousand medical device reports (MDRs) of suspected device-associated deaths, serious injuries and malfunctions. The FDA uses MDRs to monitor device performance, detect potential device-related safety issues, and contribute to benefit-risk assessments of these products. The MAUDE database houses MDRs submitted to the FDA by submitted by mandatory reporters—manufacturers, importers and device user facilities—and voluntary reporters such as health care professionals, patients, and consumers.

Although MDRs are a valuable source of information, this passive surveillance system has limitations, including the potential submission of incomplete, inaccurate, untimely, unverified, or biased data. In addition, the incidence or prevalence of an event cannot be determined from this reporting system alone due to potential under-reporting of events and lack of information about frequency of device use. Because of this, MDRs comprise only one of the FDA's several important postmarket surveillance data sources.

See the <a href="{{ site.baseurl }}/data/maude/">MAUDE dataset page</a> for more details.

{% include getting-started.html %}

## Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of device adverse event reports.

## How to query the API

    https://api.fda.gov/device/event.json?

You can search for device adverse event reports by <a href="reference/">fields specific to the `device/event.json` endpoint</a>.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One adverse event report</h4>
<div class="query-description">
This query searches for all records in a certain date range, and asks for a single one.

 - **search** for all records with `date_received` between *Jan 01, 2004 and Dec 31, 2008*.
 - **limit** to 1 record.

Brackets `[ ]` are used to specify a range for date, number, or string fields. The plus sign `+` is used in place of a space character, and the word `TO` is used between the start and end dates.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/device/event.json?search=date_received:[20130101+TO+20141231]&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">One report involving an <em>x-ray</em> device</h4>
<div class="query-description">
This query searches for records matching a certain search term, and asks for a single one.

 - **search** for all records with `device.generic_name` (generic device name) contains *x-ray*
 - **limit** to 1 record.

See the [reference](reference/) for more fields you can use to narrow searches for device adverse event reports.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/device/event.json?search=device.generic_name:x-ray&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of top event types associated with <em>x-ray</em> devices</h4>
<div class="query-description">
This query is similar to the prior one, but returns a count of the most frequently reported event types.

  - **search** for all records with `device.generic_name` (generic device name) contains *x-ray*
  - **count** the field `event_type` (outcomes associated with an adverse event report)

The suffix .exact is required by openFDA to count the unique full phrases in the field `event_type`. Without it, the API will count each word in that field individually—*No answer provided* would be counted as separate values, *No* and *answer* and *provided*.

See the [reference](reference/) for more fields you can use to count and understand the nature of device adverse event reports.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html query="/device/event.json?search=device.generic_name:x-ray&count=event_type.exact" %}
</div>
</div>

</section>

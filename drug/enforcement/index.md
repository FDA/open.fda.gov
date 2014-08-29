---
title: Drugs - Recall enforcement reports
layout: api
cover: p_chemist.jpg
endpoints:
  - endpoint: /drug/enforcement/
    name:  Drug enforcement reports
    description: 'Drug product recall enforcement reports.'
    status: active
    docs:
      - name: API reference
        url: /drug/enforcement/reference/
---
{::nomarkdown}
<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
  <div class="content-heading-text">
    <div class="content-heading-title">
      Getting started | <a href="{{ site.baseurl }}/drug/enforcement/reference/">Reference</a>
    </div>
    <h1>Drugs</h1>
  </div>
</section>

<div class="row tabs">
  <div class="col-sm-4 tab"><h2><a href="{{ site.baseurl }}/drug/event/">Adverse events</a></h2></div>
  <div class="col-sm-4 tab"><h2><a href="{{ site.baseurl }}/drug/label">Labeling</a></h2></div>
  <div class="col-sm-4 tab selected"><h2><a href="#">Enforcement reports</a></h2></div>
</div>
{:/}

<section id="endpoint">

{% include api-demo-drug-enforcement.html %}

## About drug recalls and enforcement reports

Recalls are an appropriate alternative method for removing or correcting marketed consumer products, their labeling, and/or promotional literature that violate the laws administered by the Food and Drug Administration (FDA). Recalls afford equal consumer protection but generally are more efficient and timely than formal administrative or civil actions, especially when the product has been widely distributed.

Manufacturers and/or distributors may initiate a recall at any time to fulfill their responsibility to protect the public health from products that present a risk of injury or gross deception, or are otherwise defective. Firms may also initiate a recall following notification of a problem by FDA or a state agency, in response to a formal request by FDA, or as ordered by FDA.

### Enforcement reports

An enforcement report contains information on actions taken in connection with FDA regulatory activities. The data served by this API endpoint includes enforcement reports about drug product recalls.

This API should not be used as a method to collect data to issue alerts to the public. FDA seeks publicity about a recall only when it believes the public needs to be alerted to a serious hazard. FDA works with industry and our state partners to publish press releases and other public notices about recalls that may potentially present a significant or serious risk to the consumer or user of the product. [Subscribe to this Recall/Safety Alert feed here.](http://www.fda.gov/AboutFDA/ContactFDA/StayInformed/RSSFeeds/Recalls/rss.xml)

Whereas not all recalls are announced in the media or on our recall press release page all FDA-monitored recalls go into FDA's Enforcement Report once they are classified according to the level of hazard involved.  For more information, see [FDA 101: Product Recalls from First Alert to Effectiveness Checks.](http://www.fda.gov/ForConsumers/ConsumerUpdates/ucm049070.htm)

{% include getting-started.html %}

## Reference

See the <a href="reference/">comprehensive field-by-field reference</a> for more detail about the structure and contents of enforcement reports.

## How to query the API

    https://api.fda.gov/drug/enforcement.json?

You can search for drug recall enforcement reports by <a href="reference/">fields specific to the `drug/enforcement.json` endpoint</a>. You can also search by other drug identifiers, such as pharmacologic class, NDC (National Drug Code), or even UPC. These identifiers are annotations, not part of the original enforcement report. They are easily identified in the <a href="{{ site.baseurl }}/api/reference/#openfda-fields">`openfda` section</a> of API results.

<div class="api-explorer" style="margin-top: 7ex">
<div class="query">
<h4 class="query-title">One enforcement report</h4>
<div class="query-description">This query searches for all records in a certain date range, and asks for a single one.

 - **search** for all records with **report_date** between *Jan 01, 2004 and Dec 31, 2013*.
 - **limit** to 1 record.

See the [reference](reference/) for more about **report_date**. Brackets `[ ]` are used to specify a range for date, number, or string fields.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/enforcement.json?search=report_date:[20040101+TO+20131231]&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">One enforcement report of a certain health hazard class</h4>
<div class="query-description">This query searches records of a certain health hazard, and returns a single record.

 - **search** for all records where **classification** (health hazard level) was *Class III*.
 - **limit** to 1 record.

Double quotation marks `" "` surround phrases that must match exactly. The plus sign `+` is used in place of a space character ` `.
</div>
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/enforcement.json?search=classification:\"Class+III\"&limit=1" %}
</div>
</div>

<div class="api-explorer">
<div class="query">
<h4 class="query-title">Count of voluntary vs. mandated enforcement reports</h4>
<div class="query-description">The vast majority of recalls are firm-initiated. This query searches the endpoint for all records, and tells the API to count how many enforcement reports were for voluntary vs. FDA-mandated recalls. 

 - **count** the field **voluntary_mandated.exact** (type of recall).

The suffix **.exact** is required by openFDA to count the unique full phrases in the field **voluntary_mandated**. Without it, the API will count each word in that field individually—**Firm Initiated** would be counted as separate values, **Firm** *and* **Initiated**.
</div>
<!-- <svg class="chart"></svg> -->
</div>
<div class="explorer">
{% include api-explorer.html query="/drug/enforcement.json?count=voluntary_mandated.exact" %}
</div>
</div>

</section>
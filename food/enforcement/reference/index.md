---
title: Foods API reference - Recall enforcement reports
layout: default
endpoints:
  - endpoint: /food/enforcement/
    name:  Food enforcement reports
    description: 'Food product recall enforcement reports.'
    status: active
datasets:
  - dataset: RES
    url: "/data/res/"
    kind: Recall enforcement reports.
js:
  - '/static/bower_components/jquery/dist/jquery.min.js'
  - '/static/bower_components/bootstrap/js/modal.js'
  - '/static/bower_components/bootstrap/js/affix.js'
  - '/static/bower_components/bootstrap/js/tab.js'
  - '/static/bower_components/d3/d3.min.js'
  - '/static/bower_components/c3/c3.min.js'
  - '/static/bower_components/jquery-autosize/jquery.autosize.min.js'
  - '/static/js/min/jquery-cookie.js'
  - '/static/js/min/api-scripts.js'
---

<section class="content-heading api {% if page.cover %}cover{% endif %}" style="background-image:url('{{ site.baseurl }}/assets/img/{{ page.cover }}');">
<div class="content-heading-text">
<div class="content-heading-title">
<a href="{{ site.baseurl }}/food/enforcement/">Data and examples</a> | API reference
</div>
<h1>Foods API reference</h1>
</div>
</section>

<div class="row tabs">
<div class="col-sm-12 tab selected"><h2><a href="#">Enforcement reports</a></h2></div>
</div>


<section id="reference">

## About enforcement reports

    https://api.fda.gov/food/enforcement

The openFDA food enforcement reports API returns data from the <a href="{{ site.baseurl }}/data/res/">FDA Recall Enterprise System (RES)</a>, a database that contains information on recall event information submitted to FDA. Currently, this data covers publically releasable records from 2004-present. The data is updated weekly.

The procedures followed to input recall information into RES when FDA learns of a recall event are outlined in [Chapter 7 of FDA’s Regulatory Procedure Manual.](http://www.fda.gov/ICECI/ComplianceManuals/RegulatoryProceduresManual/ucm177304.htm) The Regulatory Procedures Manual is a reference manual for FDA personnel. It provides FDA personnel with information on internal procedures to be used in processing domestic and import regulatory and enforcement matters.

{% include panel.html type="warning" title="Important note about RES data as published through the Enforcement Report process" text="This data should not be used as a method to collect data to issue alerts to the public, nor should it be used to track the lifecycle of a recall. FDA seeks publicity about a recall only when it believes the public needs to be alerted to a serious hazard. FDA works with industry and our state partners to publish press releases and other public notices about recalls that may potentially present a significant or serious risk to the consumer or user of the product. <a href=\"http://www.fda.gov/AboutFDA/ContactFDA/StayInformed/RSSFeeds/Recalls/rss.xml\">Subscribe to this Recall/Safety Alert feed here.</a><br /><br />Further, FDA does not update the status of a recall after the recall has been classified according to its level of hazard. As such, the status of a recall (open, completed, or terminated) will remain unchanged after published in the Enforcement Reports." %}

When necessary, the FDA will make corrections or changes to recall information previously disclosed in a past Enforcement Report for various reasons. For instance, the firm may discover that the initial recall should be expanded to include more batches or lots of the same recalled product than formerly reported. For more information about corrections or changes implemented, please refer to the Enforcement Report’s [Changes to Past Enforcement Reports" page.](http://www.fda.gov/Safety/Recalls/EnforcementReports/ucm345487.htm)

### Data downloads

FDA releases [weekly enforcement reports.](http://www.fda.gov/%20Safety/Recalls/EnforcementReports/default.htm) OpenFDA uses these enforcement reports, but processes the data further before supplying them through the API. During our beta testing, we are investigating the best ways to offer direct downloads of data provided by the API.

There are no plans for the OpenFDA initiative to change the RES release protocols. At this time it is anticipated that RES downloads will continue to be available from the same site on the same weekly schedule. OpenFDA is a research project to make access to these datasets easier, not replace the current process. The information available through openFDA is not for clinical or production use and is in beta testing. While the FDA makes every effort to ensure the data is accurate, it should be assumed that all results are not validated.

### What are enforcement reports?

An enforcement report contains information on actions taken in connection with FDA regulatory activities. The data served by this API endpoint includes enforcement reports about food product recalls.

Whereas not all recalls are announced in the media or on [FDA's Recalls press release page](http://www.fda.gov/Safety/recalls/default.htm), all recalls montiored by FDA are included in [FDA's weekly Enforcement Report](http://www.fda.gov/%20Safety/Recalls/EnforcementReports/default.htm) once they are classified according to the level of hazard involved.

Manufacturers and/or distributors may initiate a recall at any time to fulfill their responsibility to protect the public health from products that present a risk of injury or gross deception, or are otherwise defective. Firms may also initiate a recall following notification of a problem by FDA or a state agency, in response to a formal request by FDA, or as ordered by FDA.

## Anatomy of a response

Here's an example API return from openFDA. This particular response features one result. The return is split into two high-level sections: `meta` and `results`. Note that this record is not real.

{% highlight javascript %}
{
  "meta": {
    "disclaimer": "openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.",
    "license": "http://open.fda.gov/license",
    "last_updated": "2014-05-29",
    "results": {
      "skip": 0,
      "limit": 1,
      "total": 6
    }
  },
  "results": [
    {
      "reason_for_recall": "Cass-Clay Creamery is voluntarily recalling a number of ice cream products because they may contain undeclared soy (lecithin).",
      "status": "Ongoing",
      "distribution_pattern": "ND, AZ, MN, SD, KS",
      "product_quantity": "81 containers",
      "recall_initiation_date": "20120720",
      "state": "ND",
      "event_id": "62644",
      "product_type": "Food",
      "product_description": "Cass-Clay   , Swiss Chip, 3 Gallon(11.34 L).",
      "country": "US",
      "city": "Fargo",
      "recalling_firm": "Cass Clay Creamery AMPI Fargo Division",
      "report_date": "20120905",
      "voluntary_mandated": "Voluntary: Firm Initiated",
      "classification": "Class II",
      "code_info": "all products that has a plant code of \"38-25\".",
      "openfda": {},
      "initial_firm_notification": "Two or more of the following: Email, Fax, Letter, Press Release, Telephone, Visit"
    }
  ]
}
{% endhighlight %}

#### Meta section

The `meta` section provides a number of important details about the results provided by the API endpoint.

{% highlight javascript %}
"meta": {
  "disclaimer": "openFDA is a beta research project and not for clinical use. While we make every effort to ensure that data is accurate, you should assume all results are unvalidated.",
  "license": "http://open.fda.gov/license",
  "last_updated": "2014-05-29",
  "results": {
    "skip": 0,
    "limit": 1,
    "total": 6
  }
}
{% endhighlight %}

`disclaimer`
: **string**
: {:.data-description} Important details about the openFDA beta and limitations of the dataset.

`license`
: **string**
: {:.data-description} A link to a web page providing information on the licensing terms of data within openFDA.

`last_updated`
: **string**
: {:.data-description} The last date when openFDA was updated. Note that this does not correspond to the last report date in the system. Rather, it is the last time openFDA received a system or data update.

`results`
: **Dictionary**
: {:.data-description} A dictionary of details about the results section.

`results.skip`
: **Integer**
: {:.data-description} The offset of the results, as provided by the `skip` parameter in the URL.

`results.limit`
: **Integer**
: {:.data-description} The number of results out of the total number of returns that are provided, as provided by the `limit` parameter in the URL.

`results.total`
: **Integer**
: {:.data-description} The total number of results fitting the search criteria.

#### Results section

For non-`count` queries, the `results` section includes matching enforcement report records returned by the API, each of which has a set of fields describing the food product recall.

The data format of RES enforcement reports changed in June 2012. In openFDA API results, reports from before that time do not contain the following fields:

 - `event-id`
 - `status`
 - `city`
 - `state`
 - `country`
 - `voluntary-mandated`
 - `initial-firm-notification`
 - `recall-initiation-date`

### Field reference

#### Enforcement report data

{% highlight javascript %}
"results": [
  {
    "reason_for_recall": "Cass-Clay Creamery is voluntarily recalling a number of ice cream products because they may contain undeclared soy (lecithin).",
    "status": "Ongoing",
    "distribution_pattern": "ND, AZ, MN, SD, KS",
    "product_quantity": "81 containers",
    "recall_initiation_date": "20120720",
    "state": "ND",
    "event_id": "62644",
    "product_type": "Food",
    "product_description": "Cass-Clay   , Swiss Chip, 3 Gallon(11.34 L).",
    "country": "US",
    "city": "Fargo",
    "recalling_firm": "Cass Clay Creamery AMPI Fargo Division",
    "report_date": "20120905",
    "voluntary_mandated": "Voluntary: Firm Initiated",
    "classification": "Class II",
    "code_info": "all products that has a plant code of \"38-25\".",
    "openfda": {},
    "initial_firm_notification": "Two or more of the following: Email, Fax, Letter, Press Release, Telephone, Visit"
  }
{% endhighlight %}

`recalling_firm`
: **string**
: The firm that initiates a recall or, in the case of an FDA requested recall or FDA mandated recall, the firm that has primary responsibility for the manufacture and (or) marketing of the product to be recalled.

`classification`
: **string**
: Numerical designation (I, II, or III) that is assigned by FDA to a particular product recall that indicates the relative degree of health hazard.
: `Class I` =  Dangerous or defective products that predictably could cause serious health problems or death. Examples include: food found to contain botulinum toxin, food with undeclared allergens, a label mix-up on a lifesaving drug, or a defective artificial heart valve.
: `Class II` = Products that might cause a temporary health problem, or pose only a slight threat of a serious nature. Example: a drug that is under-strength but that is not used to treat life-threatening situations.
: `Class III` = Products that are unlikely to cause any adverse health reaction, but that violate FDA labeling or manufacturing laws. Examples include: a minor container defect and lack of English labeling in a retail food.

`status`
: **string**
: `On-Going` = A recall which is currently in progress.
: `Completed` = The recall action reaches the point at which the firm has actually retrieved and impounded all outstanding product that could reasonably be expected to be recovered, or has completed all product corrections. 
: `Terminated` = FDA has determined that all reasonable efforts have been made to remove or correct the violative product in accordance with the recall strategy, and proper disposition has been made according to the degree of hazard.
: `Pending` = Actions that have been determined to be recalls, but that remain in the process of being classified. 

`distribution_pattern`
: **string**
: General area of initial distribution such as, “Distributors in 6 states: NY, VA, TX, GA, FL and MA; the Virgin Islands; Canada and Japan”. The term “nationwide” is defined to mean the fifty states or a significant portion.  Note that subsequent distribution by the consignees to other parties may not be included. 

`product_description`
: **string**
: Brief description of the product being recalled.

`code_info`
: **string**
: A list of all lot and/or serial numbers, product numbers, packer or manufacturer numbers, sell or use by dates, etc., which appear on the product or its labeling.

`reason_for_recall`
: **string**
: Information describing how the product is defective and violates the FD&C Act or related statutes.

`product_quantity`
: **string**
: The amount of defective product subject to recall.

`voluntary_mandated`
: **string**
: Describes who initiated the recall. Recalls are almost always voluntary, meaning initiated by a firm. A recall is deemed voluntary when the firm voluntarily removes or corrects marketed products or FDA requests the marketed products be removed or corrected. A recall is mandated when the firm was ordered by the FDA to remove or correct the marketed products, under section 518(e) of the FD&C Act, National Childhood Vaccine Injury Act of 1986, 21 CFR 1271.440, Infant Formula Act of 1980 and its 1986 amendments, or the Food Safety Modernization Act (FSMA).

`report_date`
: **string**
: The date (YYYYMMDD) that FDA issued the enforcement report for the product recall.

`recall_initiation_date`
: **string**
: The date (YYYYMMDD) that the firm first began notifying the public or their consignees of the recall.

`initial_firm_notification`
: **string**
: The method(s) by which the firm initially notified the public or their consignees of a recall. A consignee is a person or firm named in a bill of lading to whom or to whose order the product has or will be delivered.

`recall_number`
: **string**
: A numerical designation assigned by FDA to a specific recall event used for tracking purposes.

`event_id`
: **string**
: A numerical designation assigned by FDA to a specific recall event used for tracking purposes.

`product_type`
: **string**
: The type of product being recalled. For food queries, this will always be `Food`.
: `Drugs` = The recalled product is a drug product.
: `Devices` = The recalled product is a device product.
: `Food` = The recalled product is a food product.

#### Geographic data

`city`
: **string**
: The city in which the recalling firm is located.

`state`
: **string**
: The U.S. state in which the recalling firm is located.

`country`
: **string**
: The country in which the recalling firm is located.

#### openFDA fields

`openfda`
: **dictionary**
: For all fields in the `openfda` section, see the [API basics]({{ site.baseurl }}/api/reference/#openfda-fields).

Food product recall enforcement reports will always have an empty `openfda` section.

## Datasets

The following datasets provide data for this endpoint.

{% include api-reference/datasets.html datasets=page.datasets %}

</section>

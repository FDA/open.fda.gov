---
title: Devices API reference - Device registrations and listings
layout: default
cover: p_knee.jpg
endpoint: /device/registrationlisting
name: Device registrations and listings
datasets:
  - dataset: Device registrations and listings
    url: /data/registrationlisting/
    kind: Medical device registrations and listings.
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
  <div class="col-sm-6 tab selected"><h2><a href="{{ site.baseurl }}/device/registrationlisting/">Registrations and listings</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/recall/">Recalls</a></h2></div>
</div>
{:/}

<section class="reference">

## About

    {{ site.apiurl }}{{ page.endpoint }}

{% include api-status-updated.html endpoint="https://api.fda.gov/device/registrationlisting.json?" count="registration_number" %}

{% include panel.html type="warning" title="Disclaimer" text="Registration and listing data are submitted and maintained by medical device companies that are required to identify their places of business and the devices they produce or process at those places of business. These data are generally not reviewed by FDA for accuracy or completeness and the appearance of these data on the FDA web site and on open.fda.gov does not infer FDA approval of either the products or the facilities.When using the Product data, keep in mind that the definition of 'product' can be variable, based on whether the device requires some form of premarket approval or notification, or can be marketed without any premarket review by FDA. You may want to identify the number of products by the number of proprietary names associated with a given data set rather than the number of product rows returned. However, as noted, the data provided by these APIs may or may not be complete as most of them have not been verified by FDA." %}


### How records are organized
Example:
{% highlight javascript %}
{
  "": "55457",
  "proprietary_name": [
    "FIBERWIRE"
  ],
  "establishment_type": [
    "Manufacture Medical Device"
  ],
  "registration": {
    "status_code": "1",
    "iso_country_code": "US",
    "city": "Naples",
    "registration_number": "1220246",
    "zip_code": "34108",
    "owner_operator": {
      "owner_operator_number": "1220287",
      "official_correspondent": {},
      "firm_name": "ARTHREX, INC.",
      "contact_address": {
        "city": "Naples",
        "iso_country_code": "US",
        "address_1": "1370 CREEKSIDE BLVD.",
        "address_2": "--",
        "state_province": "",
        "postal_code": "34108",
        "state_code": "FL"
      }
    },
    "name": "ARTHREX, INC.",
    "address_line_1": "1370 Creekside Blvd",
    "fei_number": "1220246",
    "initial_importer_flag": "N",
    "address_line_2": "",
    "postal_code": "",
    "state_code": "FL",
    "us_agent": {},
    "reg_expiry_date_year": "2015"
  },
  "pma_number": "",
  "k_number": "K012923",
  "products": [
    {
      "owner_operator_number": "1220287",
      "created_date": "2008-11-26",
      "exempt": "N",
      "product_code": "GAT",
      "openfda": {
        "device_name": "Suture, Nonabsorbable, Synthetic, Polyethylene",
        "medical_specialty_description": "General, Plastic Surgery",
        "device_class": "2",
        "regulation_number": "878.5000"
      }
    }
  ]
    }
    {% endhighlight %}

<!-- TODO(hansnelsen): add dataset page once it is ready -->
{% include api-anatomy.html %}

### Results

For non-`count` queries, the `results` section includes matching device registrations and listings             records returned by the API.

## Field-by-field reference

### Registration
The Registration record provides identification (name, registration number) and address information for a medical device establishment that performs an activity that requires that they register with the FDA Center for Devices and Radiological Health (CDRH). [See](http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/RegistrationandListing/ucm053165.htm) for more information on who must register.

`status_code`
: **string**
: Registration status code.
: `1` = `Active`
: `5` = `Active awaiting assignment of registration number`


`initial_importer_flag`
: **string**
: Identifies whether facility is an initial importer.
: `Y`
: `N`

`reg_expiry_date_year`
: **string**
: `format` = `YYYY`
: Year that registration expires (expires 12/31 of that year).

`address_line_1`
: **string**
: Facility or US agent address line 1.

`address_line_2`
: **string**
: Facility or US agent address line 2.

`city`
: **string**
: Facility or US agent city.

`state_code`
: **string**
: Facility or US agent US state or foreign state or province.

`zip_code`
: **string**
: Facility or US agent Zip code.

`postal_code`
: **string**
: Facility foreign postal code.

`iso_country_code`
: **string**
: Facility or US agent country code.

`name`
: **string**
: Name associated with the facility or US agent.

`fei_number`
: **string**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.

`registration_number`
: **string**
: Facility identifier assigned to facility by the FDA Office of Regulatory Affairs.


#### Owner operator
The owner operator section has a few of its own keys as well as two subdocuments, `official_correspondent` and `contact_address`. The keys for each of these subdocuments will be prefixed with the appropriate parent name. For example, `official_correspondent.phone_number` is really `owner_operator.official_correspondent.phone_number` in a API result, but is shortened in this reference for readability.

The Owner Operator is the company that owns or operates the registered establishment. They are responsible for the activities that are conducted at the registered establishment and the devices put in commercial distribution in the U.S. This is usually the corporate headquarters of the company.

The Official Correspondent is the person who is responsible for maintaining the establishment’s registration and listing information with CDRH. This can be, but does not have be, the same person as the Owner Operator or, in the case of a foreign establishment, the US Agent.

`owner_operator_number`
: **string**
: Number assigned to Owner Operator by CDRH.

`firm_name`
: **string**
: Firm name of owner operator.

`official_correspondent.first_name`
: **string**
: Official correspondent first name.

`official_correspondent.phone_number`
: **string**
: Official correspondent phone number.

`official_correspondent.middle_initial`
: **string**
: Official correspondent middle initial.

`official_correspondent.last_name`
: **string**
: Official correspondent last name.

`official_correspondent.subaccount_company_name`
: **string**
: Official correspondent company name (if different from owner operator company name).

`contact_address.address_1`
: **string**
: First line of address for owner operator.

`contact_address.address_2`
: **string**
: Second line of address for owner operator.

`contact_address.city`
: **string**
: Owner operator city.

`contact_address.state_code`
: **string**
: Owner operator US state identifier.

`contact_address.state_province`
: **string**
: Owner operator foreign state/province identifier.

`contact_address.postal_code`
: **string**
: Owner operator zip or foreign postal code.

`contact_address.iso_country_code`
: **string**
: Owner operator country code.

#### US Agent
The US agent is a person who must reside or keep a place of business in the United States and can represent the registered foreign establishment in communications with FDA. All foreign establishments are required to identify a single US agent for all of the products exported to the U.S. from their establishment.

`name`
: **string**
: US agent individual name.

`business_name`
: **string**
: Business name of US agent.

`address_line_1`
: **string**
: US agent address line 1.

`address_line_2`
: **string**
: US agent address line 2.

`city`
: **string**
: US agent city.

`state_code`
: **string**
: US agent US state or foreign state or province.

`zip_code`
: **string**
: US agent zip code.

`postal_code`
: **string**
: Foreign postal code.

`iso_country_code`
: **string**
: US agent country code.

`bus_phone_area_code`
: **string**
: US agent phone area code.

`bus_phone_num`
: **string**
: US agent phone number.

`bus_phone_extn`
: **string**
: US agent phone extension.

`fax_area_code`
: **string**
: US agent fax area code.

`fax_num`
: **string**
: US agent fax phone number.

`email_address`
: **string**
: US agent email address.


### Proprietary Names
The Proprietary Names are the names under which the medical device is marketed in the U.S. The Proprietary Names are identified at the Owner Operator level, so they may not be accurately associated with individual establishments if a product is made at more than one establishment owned or operated by the same company. In other words, if a company makes a product under Proprietary Name “A” at Establishment “1” and under Proprietary Name “B” at Establishment “2,” it will appear in the Registration and Listing data as both products being made at both establishments.

`proprietary_name`
: **list of strings**
: Proprietary or brand name or model number a product is marketed under.

### Establishment types
The Establishment Types identify the activity or activities being conducted at a given establishment for a given product. These include Manufacturer, Contract Manufacturer, Repacker/Relabeler, and several others (see [here](http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/RegistrationandListing/ucm053165.htm) for a full list). A company has to identify at least one Establishment Type for each product it makes. These are identified at the establishment and product listing level.

`establishment_type`
: **list of strings**
: Facility operation or activity, e.g. "Manufacturer" (short version).

### Products
All medical devices entering commerce in the U.S. must be “listed” with FDA. This means that each owner or operator of a medical device establishment that conducts an activity – manufactures, sterilizes, relabels, etc. – that is regulated by FDA must identify the devices that they market in the U.S. This can get a bit tricky as these products are identified differently depending on whether a company has to submit a premarket application or notification prior to marketing their device (see [here](http://www.fda.gov/MedicalDevices/DeviceRegulationandGuidance/HowtoMarketYourDevice/default.htm)).

If they do not have to submit a premarket application or notification, then the device is considered “exempt” from premarket notification, and the company identifies the device they are making by selecting the appropriate product code and providing the Establishment Types that apply to their establishment and the Proprietary Names they are marketing the device under. It will appear in the open.fda.gov data as one document or record.

If, however, a company must get premarket approval or clearance, they identify the product they are making by the premarket approval (PMA, HDE, PDP or NDA) or clearance (510(k) or Denovo) number assigned by FDA. Each Establishment Type and Proprietary Name is then associated with the product in the open.fda.gov database based on that premarket number, not by product code, although all listings, including those that are not exempt, have product codes assigned.

`created_date`
: **date**
: `foramt` = `YYYY-MM-DD`
: Date listing was created (may be unreliable).

`exempt`
: **string**
: `Y`
: `N`

`owner_operator_number`
: **string**
: Number assigned to Owner Operator by CDRH.

`product_code`
: **string**
: A three-letter identifier assigned to a device category. Assignment is based upon the medical device classification designated under 21 CFR Parts 862-892, and the technology and intended use of the device. Occasionally these codes are changed over time.

### Openfda
The `openfda` section of each document is determined initially by looking at the `product_code` value. Since there are potentially more than one `product_code` values associated with a listing, there is an `openfda` subdocument for each one.

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
: `2` = `Class II (moderate to high risk): general controls and special controls`
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

<!-- TODO(hansnelsen): Added datasets link here when it is ready -->
</section>
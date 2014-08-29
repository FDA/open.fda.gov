---
title: Devices API reference - Adverse event reports
layout: default
cover: p_knee.jpg
endpoints:
  - endpoint: /device/event/
    name:  Device adverse event reports
    description: 'Device adverse event reports.'
    status: active
datasets:
  - dataset: MAUDE
    url: "/data/maude/"
    kind: Medical device adverse event reports.
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
<a href="{{ site.baseurl }}/device/event/">Getting started</a> | Reference
</div>
<h1>Devices API reference</h1>
</div>
</section>

<div class="row tabs">
  <div class="col-sm-6 tab selected"><h2><a href="#">Adverse events</a></h2></div>
  <div class="col-sm-6 tab"><h2><a href="{{ site.baseurl }}/device/enforcement/reference/">Enforcement reports</a></h2></div>
</div>


<section id="reference">

## About

    https://api.fda.gov/device/event

{% include api-status-updated.html endpoint="https://api.fda.gov/device/event.json?" count="date_received" %}

The openFDA device adverse event API returns data from <a href="http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm">Manufacturer and User Facility Device Experience (MAUDE)</a>, an FDA dataset that contains medical device adverse event reports submitted by mandatory reporters—manufacturers, importers and device user facilities—and voluntary reporters such as health care professionals, patients, and consumers. Currently, this data covers publically releasable records submitted to the FDA from about 1992 to the present. The data is updated weekly.

Each year, the FDA receives several hundred thousand medical device reports (MDRs) of suspected device-associated deaths, serious injuries and malfunctions. The FDA uses MDRs to monitor device performance, detect potential device-related safety issues, and contribute to benefit-risk assessments of these products.

{% include panel.html type="warning" title="Disclaimer" text="Although MDRs are a valuable source of information, this passive surveillance system has limitations, including the potential submission of incomplete, inaccurate, untimely, unverified, or biased data. In addition, the incidence or prevalence of an event cannot be determined from this reporting system alone due to potential under-reporting of events and lack of information about frequency of device use. Because of this, MDRs comprise only one of the FDA's several important postmarket surveillance data sources." %}

See the <a href="{{ site.baseurl }}/data/maude/">MAUDE dataset page</a> for more details.

### How records are organized

Device adverse event reports vary significantly, depending on who initially reported the event, what kind of event was reported, and whether there were follow-up reports. Some reports come directly from user facilities (like hospitals) or device importers (distributors), while others come directly from manufacturers. Some involve adverse reactions in patients, while others are reports of defects that did not result in such adverse reactions.

Records served by the openFDA device adverse events endpoint loosely reflect field organization found in the [forms used by manufacturers and members of the public](http://www.fda.gov/Safety/MedWatch/HowtoReport/DownloadForms/default.htm) to report these events. Since reports may come from manufacturers, user facilities, distributors, and voluntary sources (such as patients and physicians) who are subject to different reporting requirements, the collected data in the adverse event system may not always capture every field and should not be interpreted as incomplete.

**Patients and devices.**

Reports may involve more than one device, and more than one patient. *Each* device, and each patient, is identified in the report by a *sequence number*, beginning with `1`.

  - The `device` section in a result has one JSON object for each device.
  - Each device is identified by a number in the field `device.device_sequence_number`.
  - The other fields describe that device.


  - The `patient` section in a result has one JSON object for each patient.
  - Each patient identified by a number in the field `patient.patient_sequence_number`.
  - The other fields describe outcomes and treatments for that patient.

  - The `mdr_text` section, which has narrative descriptions of the adverse event or problem report, links these descriptions to patient outcomes by way of the same patient sequence number
  - Here the sequence number is in the field `mdr_text.patient_sequence_number`.
  - Even in reports that did not involve any patient, the general device problem description is still associated with a "patient" with `patient_sequence_number` `1`.

### Data downloads

Medical device adverse event reports in MAUDE are current as of the end of the previous month. OpenFDA uses these adverse event reports, but processes the data further before supplying them through the API. During our beta testing, we are investigating the best ways to offer direct downloads of data provided by the API.

There are no plans for the openFDA initiative to change the MAUDE data release protocols. OpenFDA is a research project to make access to these datasets easier, not replace the current process. The information available through openFDA is not for clinical or production use and is in beta testing. While FDA makes every effort to ensure the data is accurate, it should be assumed that all results are not validated.

{% include api-anatomy.html %}

### Results

For non-`count` queries, the `results` section includes matching device adverse event report records returned by the API.

## Field-by-field reference

### Event

These fields describe the general nature of the adverse event. For example, whether it was a device malfunction or defect, whether there were patients involved, who reported the event, and so on.

`adverse_event_flag`
: **string**
: `Y` = The report is about an incident where the use of the device is suspected to have resulted in an adverse outcome in a patient.
: `N` = The report is not about an adverse outcome in a patient.
: Empty if no data was available or entered.

`product_problem_flag`
: **string**
: `Y` = The report is about the quality, performance, or safety of a device—for example, defects or malfunctions. This flag is set when a device malfunction could lead to a death or serious injury if the malfunction were to recur.
: `N` = The report is not about a defect or malfunction.
: Empty if no data was available or entered.

`date_of_event`
: **date string - *YYYYmmdd***
: Actual or best estimate of the date of first onset of the adverse event. This field was added in 2006.

`date_report`
: **date string - *YYYYmmdd***
: Date the initial reporter (whoever initially provided information to the user facility, manufacturer, or importer) provided the information about the event.

`date_received`
: **date string - *YYYYmmdd***
: Date the report was received by the FDA.

`number_devices_in_event`
: **string**
: Number of devices noted in the adverse event report. Almost always *1*. May be empty if `report_source_code` contains `Voluntary report`.

`number_patients_in_event`
: **string**
: Number of patients noted in the adverse event report. Almost always *1*. May be empty if `report_source_code` contains `Voluntary report`.

`report_number`
: **string**
: Identifying number for the adverse event report. The format varies, according to the source of the report. The field is empty when a user facility submits a report.
: *For manufacturer reports.* Manufacturer Report Number. The report number consists of three components: The manufacturer’s FDA registration number for the manufacturing site of the reported device, the 4-digit calendar year, and a consecutive 5-digit number for each report filed during the year by the manufacturer (e.g. 1234567-2013-00001, 1234567-2013-00002).
: *For user facility/importer (distributor) reports.* Distributor Report Number. Documentation forthcoming.
: *For consumer reports.* This field is empty.

### Source

These fields describe the source and initial reporter of the adverse event report.

`report_source_code`
: **string**
: Source of the adverse event report. Possible values:
: `Manufacturer report`
: `Voluntary report`
: `User facility report`
: `Distributor report`

`health_professional`
: **string**
: Whether the initial reporter was a health professional (e.g. physician, pharmacist, nurse, etc.) or not.
: `Y` = The initial reporter is a health professional.
: `N` = The initial reporter is not a health professional.

`reporter_occupation_code`
: **string**
: Initial reporter occupation.
: `Other`
: `Physician`
: `Nurse`
: `Health professional`
: `Lay user/patient`
: `Other health care professional`
: `Audiologist`
: `Dental hygienist`
: `Dietician`
: `Emergency medical technician`
: `Medical technologist`
: `Nuclear medicine technologist`
: `Occupational therapist`
: `Paramedic`
: `Pharmacist`
: `Phlebotomist`
: `Physical therapist`
: `Physician assistant`
: `Radiologic technologist`
: `Respiratory therapist`
: `Speech therapist`
: `Dentist`
: `Other caregivers`
: `Dental assistant`
: `Home health aide`
: `Medical assistant`
: `Nursing assistant`
: `Patient`
: `Patient family member or friend`
: `Personal care assistant`
: `Service and testing personnel`
: `Biomedical engineer`
: `Hospital service technician`
: `Medical equipment company technician/representative`
: `Physicist`
: `Service personnel`
: `Device unattended`
: `Risk manager`
: `Attorney`
: `Unknown`
: `Not applicable`
: `No information`
: `Unknown`
: `Invalid data`

`initial_report_to_fda`
: **string**
: Whether the initial reporter also notified or submitted a copy of this report to FDA.
: `Yes` = FDA was also notified by the initial reporter.
: `No` =  FDA was not notified by the initial reporter.
: `Unknown` = Unknown whether FDA was also notified by the initial reporter.
: `No answer provided` or empty = This information was not provided.

`reprocessed_and_reused_flag`
: **string**
: Indicates whether the suspect device was a single-use device that was reprocessed and reused on a patient.
: `Y` = Was a single-use device that was reprocessed and reused.
: `N` = Was not a single-use device that was reprocessed and reused.
: `UNK` = The original equipment manufacturer was unable to determine if their single-use device was reprocessed and reused.



### Device

If there were devices listed in the adverse event report, there will be a `device` section, consisting of a list of devices. Each object in the `device` section may consist of many of the following fields.

{% highlight javascript %}
"device": [
  {
    "…": "…"
  }
]
{% endhighlight %}

The first field is a record-local index for the particular device; it is also used to link this device information to narrative (text) descriptions in the `mdr_text` section.

`device.device_sequence_number`
: **string**
: Number identifying this particular device. For example, the first device object will have the value `1`. This is an enumeration corresponding to the number of patients involved in an adverse event.

`device.device_event_key`
: **string**
: Documentation forthcoming.

`device.date_received`
: **string**
: Documentation forthcoming.

#### Identification

Each device has fields that can be used to uniquely identify it.

`device.brand_name`
: **string**
: The trade or proprietary name of the suspect medical device as used in product labeling or in the catalog (e.g. Flo-Easy Catheter, Reliable Heart Pacemaker, etc.). If the suspect device is a reprocessed single-use device, this field will contain `NA`.

`device.generic_name`
: **string**
: The generic or common name of the suspect medical device or a generally descriptive name (e.g. urological catheter, heart pacemaker, patient restraint, etc.).

`device.device_report_product_code`
: **string**
: Three-letter FDA Product Classification Code. Medical devices are classified under [21 CFR Parts 862-892](http://www.fda.gov/medicaldevices/deviceregulationandguidance/overview/classifyyourdevice/default.htm). The assigned FDA Product Classification Code (procode) can be identified using the [Product Classification Database](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPCD/classification.cfm).

**Device model and catalog numbers**

If available, these values should be recorded exactly as they appear on the device or device labeling, including spaces, hyphens, etc.

`device.model_number`
: **string**
: The exact model number found on the device label or accompanying packaging.

`device.catalog_number`
: **string**
: The exact number as it appears in the manufacturer’s catalog, device labeling, or accompanying packaging.

`device.lot_number`
: **string**
: If available, the lot number found on the label or packaging material.

`device.other_id_number`
: **string**
: Any other identifier that might be used to identify the device. Expect wide variability in the use of this field. It is commonly empty, or marked `NA`, `N/A`, `*`, or `UNK`, if unknown or not applicable.

**Age and expiration date**

`device.expiration_date_of_device`
: **string**
: If available; this date is often be found on the device itself or printed on the accompanying packaging.

`device.device_age_text`
: **string**
: Age of the device or a best estimate, often including the unit of time used. Contents vary widely, but common patterns include:
: `nn YR` or `n.n YR` = Device age *nn* or *n.n* years.
: `nn MO` or `n.n MO` = Device age *nn* or *n.n* months.
: `nn DA` or `nn DA` or `nn DAY` = Device age *nn* or *n.n* days.
: `UNK` or `UNKNOWN` = Device age unknown.
: `DA` = Documentation forthcoming.
: `NO INFO` = Documentation forthcoming.
: `*` or empty if information not provided.

**Evaluation by manufacturer**

`device.device_availability`
: **string**
: Whether the device is available for evaluation by the manufacturer, or whether the device was returned to the manufacturer.
: `Yes`
: `No`
: `Device was returned to manufacturer`
: `No answer provided`
: `I` = Documentation forthcoming.
: May also be empty if no answer provided.

`device.date_returned_to_manufacturer`
: **date string - *YYYYmmdd***
: Date the device was returned to the manufacturer, if applicable.

`device.device_evaluated_by_manufacturer`
: **string**
: Whether the suspect device was evaluated by the manufacturer.
: `Yes` = An evaluation was made of the suspect or related medical device.
: `No` = An evaluation of a returned suspect or related medical device was not conducted.
: `Device not returned to manufacturer` = An evaluation could not be made because the
device was not returned to, or made available to,
the manufacturer.
: `No answer provided` or empty = No answer was provided or this information was unavailable.

#### Use of device

The following fields describe who was operating the device, if applicable, and whether it was an implanted device.

`device.device_operator`
: **string**
: The person using the medical device at the time of the adverse event. This may be a health professional, a lay person, or may not be applicable.
: `Physician`
: `Nurse`
: `Health professional`
: `Lay user/patient`
: `Other health care professional`
: `Audiologist`
: `Dental hygienist`
: `Dietician`
: `Emergency medical technician`
: `Medical technologist`
: `Nuclear medicine technologist`
: `Occupational therapist`
: `Paramedic`
: `Pharmacist`
: `Phlebotomist`
: `Physical therapist`
: `Physician assistant`
: `Radiologic technologist`
: `Respiratory therapist`
: `Speech therapist`
: `Dentist`
: `Other caregivers`
: `Dental assistant`
: `Home health aide`
: `Medical assistant`
: `Nursing assistant`
: `Patient`
: `Patient family member or friend`
: `Personal care assistant`
: `Service and testing personnel`
: `Biomedical engineer`
: `Hospital service technician`
: `Medical equipment company technician/representative`
: `Physicist`
: `Service personnel`
: `Device unattended`
: `Risk manager`
: `Attorney`
: `Other`
: `Unknown`
: `Not applicable`
: `No information`
: `Unknown`
: `Invalid data`

`device.implant_flag`
: **string**
: Whether a device was implanted or not. May be either marked `N` or left empty if this was not applicable.

`device.date_removed_flag`
: **string**
: Whether an implanted device was removed from the patient, and if so, what kind of date was provided.
: `Month and year provided only day defaults to 01` = Only a year and month were provided. Day was set to 01.
: `Year provided only` = Only a year was provided. Month was set to 01 (January) and day set to 01.
: `No information at this time` = Documentation forthcoming.
: `Not available` = Documentation forthcoming.
: `Unknown` = Documentation forthcoming.
: `*` = Documentation forthcoming.
: `B` = Documentation forthcoming.
: `V` = Documentation forthcoming.

#### Manufacturer

Each device has its own fields for identification of the manufacturer.

**Device manufacturer name**

`device.manufacturer_d_name`
: **string**
: Device manufacturer name.

**Address**

`device.manufacturer_d_address_1`
: **string**
: Device manufacturer address line 1.

`device.manufacturer_d_address_2`
: **string**
: Device manufacturer address line 2.

`device.manufacturer_d_city`
: **string**
: Device manufacturer city.

`device.manufacturer_d_state`
: **string**
: Device manufacturer two-letter state code.

`device.manufacturer_d_country`
: **string**
: Device manufacturer two-letter country code.

`device.manufacturer_d_zip_code`
: **string**
: Device manufacturer 5-digit zip code.

`device.manufacturer_d_zip_code_ext`
: **string**
: Device manufacturer 4-digit zip code extension (zip+4 code).

`device.manufacturer_d_postal_code`
: **string**
: Device manufacturer postal code. May contain the zip code for addresses in the United States.



### Patient

If there were patients noted in the adverse event report, there will be `patient` section, consisting of a list of patient treatment and outcomes. Each object in the `patient` section consists of the following fields.

{% highlight javascript %}
"patient": {
  "…": "…"
}
{% endhighlight %}

`patient.patient_sequence_number`
: **string**
: Number identifying this particular patient. For example, the first patient object will have the value `1`. This is an enumeration corresponding to the number of patients involved in an adverse event.

`patient.date_received`
: **date string *YYYYmmdd***
: Date the report about this patient was received.

`patient.sequence_number_treatment`
: **list of strings**
: Treatment the patient received.

`patient.sequence_number_outcome`
: **list of strings**
: Outcome associated with the adverse event for this patient. Expect wide variability in this field; each string in the list of strings may contain multiple outcomes, separated by commas, and with numbers, which may or may not be related to the `patient_sequence_number`.
: `Life Threatening`
: `Hospitalization`
: `Disability`
: `Congenital Anomaly`
: `Required Intervention`
: `Other`
: `Invalid Data`
: `Unknown`
: `No Information`
: `Not Applicable`
: `Death`


### Report text

The `mdr_text` section contains narrative information about the adverse event or problem report. Text may be about the problem, about the device, or about the patient adverse event, depending on the nature of the report. Each narrative or text description has the following fields.

{% highlight javascript %}
"mdr_text": {
  "…": "…"
}
{% endhighlight %}

`mdr_text.patient_sequence_number`
: **string**
: Patient which the narrative text or problem description is about. For reports that did not involve a patient adverse event, this field will still often contain `1` even if the problem description is just about the suspect medical device.

`mdr_text.text_type_code`
: **string**
: `Description of Event or Problem` = The problem (quality, performance, or safety concern) in sufficient detail so that the circumstances surrounding the defect or malfunction of the medical product can be understood. For patient adverse events, may include a description of the event in detail using the reporter’s own words, including a description of what happened and a summary of all relevant clinical information (medical status prior to the event; signs and/or symptoms; differential diagnosis for the event in question; clinical course; treatment; outcome, etc.). If available and if relevant, may include synopses of any office visit notes or the hospital discharge summary. This section may also contain information about surgical procedures and laboratory tests.
: `Manufacturer Evaluation Summary` = If available, the results of any evaluation of a malfunctioning device and, if known, any relevant maintenance/service information should be included in this section.
: `Additional Manufacturer Narrative` = Documentation forthcoming.

`mdr_text.text`
: **string**
: Narrative text or problem description.

`mdr_text.mdr_text_key`
: **string**
: Documentation forthcoming.

`mdr_text.date_received`
: **string date - *YYYYmmdd***
: Documentation forthcoming.



### Reporter-dependent fields

#### By user facility/importer

For reports submitted by user facilities, importers, or distributors, the following information is available.

`type_of_report`
: **list of strings**
: The type of report.
: `Initial submission` = Initial report of an event.
: `Followup` = Additional or corrected information.
: `Extra copy received` = Documentation forthcoming.
: `Other information submitted` = Documentation forthcoming.

`date_facility_aware`
: **date string - *YYYYmmdd***
: Date the user facility’s medical personnel or the importer (distributor) became aware that the device has or may have caused or contributed to the reported event.

`report_date`
: **date string - *YYYYmmdd***
: Date of the report, or the date that the report was forwarded to the manufacturer and/or the FDA.

`report_to_fda`
: **string**
: Whether the report was sent to the FDA by a user facility or importer (distributor). User facilities are required to send reports of device-related deaths. Importers are required to send reports of device-related deaths and serious injuries.
: `Y` = The report was sent to the FDA by a user facility or importer.
: `N` = The report was not sent to the FDA by a user facility or importer.
: Empty if this information was not provided.

`date_report_to_fda`
: **date string - *YYYYmmdd***
: Date the user facility/importer (distributor) sent the report to the FDA, if applicable.

`report_to_manufacturer`
: **string**
: Whether the report was sent to the manufacturer by a user facility or importer (distributor). User facilities are required to send reports of device-related deaths and serious injuries to manufacturers. Importers are required to send reports to manufacturers of device-related deaths, device-related serious injuries, and device-related malfunctions that could cause or contribute to a death or serious injury.
: `Y` = The report was sent to the manufacturer by a user facility or importer.
: `N` = The report was not sent to the manufacturer by a user facility or importer.
: Empty if this information was not provided.

`date_report_to_manufacturer`
: **date string - *YYYYmmdd***
: Date the user facility/importer (distributor) sent the report to the manufacturer, if applicable.

`event_location`
: **string**
: Where the event occurred.
: `Other`
: `Hospital`
: `Home`
: `Nursing home`
: `Outpatient treatment facility`
: `Outpatient diagnostic facility`
: `Ambulatory surgical facility`
: `Hospital`
: `Catheterization suite`
: `Critical care unit`
: `Dialysis unit`
: `Emergency room`
: `Examination room`
: `Laboratory/pathology department`
: `Maternity ward - nursery`
: `Operating room`
: `Outpatient clinic/surgery`
: `Patient's room or ward`
: `Radiology department`
: `Ambulatory health care facility`
: `Ambulatory surgical center`
: `Blood bank`
: `Bloodmobile`
: `Catheterization lab - free standing`
: `Chemotherapy center`
: `Clinic - walk in, other`
: `Dialysis center`
: `Drug clinic`
: `Imaging center - mobile`
: `Imaging center - stationary`
: `Laboratory`
: `Mobile health unit`
: `Mri centers`
: `Psychiatric center - walk in, other`
: `Tuberculosis clinic`
: `Urgent care center`
: `Outpatient diagnostic facility`
: `Long-term care facility`
: `Hospice`
: `Nursing home`
: `Psychiatric facility`
: `Rehabilitation center`
: `Retirement home`
: `Patient's home`
: `In transit to user/medical facility`
: `Public venue`
: `Outdoors`
: `Park`
: `Playground`
: `Public building`
: `School`
: `Street`
: `Unknown`
: `Not applicable`
: `No information`
: `Unknown`
: `Invalid data`

##### Name and address

`distributor_name`
: **string**
: User facility or importer (distributor) name.

`distributor_address_1`
: **string**
: User facility or importer (distributor) address line 1.

`distributor_address_2`
: **string**
: User facility or importer (distributor) address line 2.

`distributor_city`
: **string**
: User facility or importer (distributor) city.

`distributor_state`
: **string**
: User facility or importer (distributor) two-digit state code.

`distributor_zip_code`
: **string**
: User facility or importer (distributor) 5-digit zip code.

`distributor_zip_code_ext`
: **string**
: User facility or importer (distributor) 4-digit zip code extension (zip+4 code).

##### Suspect device manufacturer

User facilities/importers (distributors) include the suspect device manufacturer name and address in their reports.

`manufacturer_name`
: **string**
: Suspect medical device manufacturer name.

`manufacturer_address_1`
: **string**
: Suspect medical device manufacturer address line 1.

`manufacturer_address_2`
: **string**
: Suspect medical device manufacturer address line 2.

`manufacturer_city`
: **string**
: Suspect medical device manufacturer city.

`manufacturer_state`
: **string**
: Suspect medical device manufacturer two-letter state code.

`manufacturer_zip_code`
: **string**
: Suspect medical device manufacturer 5-digit zip code.

`manufacturer_zip_code_ext`
: **string**
: Suspect medical device manufacturer 4-digit zip code extension (zip+4 code).

`manufacturer_country`
: **string**
: Suspect medical device manufacturer two-letter country code.

`manufacturer_postal_code`
: **string**
: Suspect medical device manufacturer postal code. May contain the zip code for addresses in the United States.

#### By device manufacturer

These fields are for reports submitted by device manufacturers.

`event_type`
: **list of strings**
: Outcomes associated with the adverse event.
: `Death` = Death, either caused by or associated with the adverse event.
: `Injury (IN)` = Documentation forthcoming.
: `Injury (IL)` = Documentation forthcoming.
: `Injury (IJ)` = Documentation forthcoming.
: `Malfunction` = Product malfunction.
: `Other` = Other serious/important medical event.
: `No answer provided` = No information was provided.

`device_date_of_manufacture`
: **date string - *YYYYmmdd***
: Date of manufacture of the suspect medical device.
: `U` = Unknown.

`single_use_flag`
: **string**
: Whether the device was labeled for single use or not.
: `Yes` = The device was labeled for single use.
: `No` = The device was not labeled for single use, or this is irrelevant to the device being reported (e.g. an X-ray machine).
: Empty = This information was not provided.

`previous_use_code`
: **string**
: Whether the use of the suspect medical device was the initial use, reuse, or unknown.
: `I` = Initial use.
: `R` = Reuse.
: `U` = Unknown.
: `*` or empty = Invalid data or this information was not provided.

##### Corrective or remedial action

These fields describe the nature of corrective actions taken by the time the report was filed, if applicable.

`remedial_action`
: **list of strings**
: Follow-up actions taken by the device manufacturer at the time of the report submission, if applicable.
: `Recall`
: `Repair`
: `Replace`
: `Relabeling`
: `Other`
: `Notification`
: `Inspection`
: `Patient Monitoring`
: `Modification/Adjustment`
: `Invalid Data`

`removal_correction_number`
: **string**
: If a corrective action was reported to FDA under [21 USC 360i(f)](http://www.law.cornell.edu/uscode/text/21/360i), the correction or removal reporting number (according to the format directed by [21 CFR 807](http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/CFRSearch.cfm?CFRPart=807)). If a firm has not submitted a correction or removal report to the FDA, but the FDA has assigned a recall number to the corrective action, the recall number may be used.

##### Contact

For reports submitted by a device manufacturer, these fields contain identification and contact information (including for the manufacturing site).

**Contact person**

`manufacturer_contact_t_name`
: **string**
: Manufacturer contact person title (Mr., Mrs., Ms., Dr., etc.)

`manufacturer_contact_f_name`
: **string**
: Manufacturer contact person first name.

`manufacturer_contact_l_name`
: **string**
: Manufacturer contact person last name.

**Contact person address**

`manufacturer_contact_street_1`
: **string**
: Manufacturer contact person street address line 1.

`manufacturer_contact_street_2`
: **string**
: Manufacturer contact person street address line 2.

`manufacturer_contact_city`
: **string**
: Manufacturer contact person city.

`manufacturer_contact_state`
: **string**
: Manufacturer contact person two-letter state code.

`manufacturer_contact_zip_code`
: **string**
: Manufacturer contact person 5-digit zip code.

`manufacturer_contact_zip_ext`
: **string**
: Manufacturer contact person 4-digit zip code extension (zip+4 code).

`manufacturer_contact_postal`
: **string**
: Manufacturer contact person postal code. May contain the zip code for addresses in the United States.

`manufacturer_contact_country`
: **string**
: Manufacturer contact person two-letter country code.

**Contact person phone number**

`manufacturer_contact_pcountry`
: **string**
: Manufacturer contact person phone number country code.

`manufacturer_contact_area_code`
: **string**
: Manufacturer contact person phone number area code.

`manufacturer_contact_exchange`
: **string**
: Manufacturer contact person phone number exchange.

`manufacturer_contact_extension`
: **string**
: Manufacturer contact person phone number extension.

`manufacturer_contact_pcity`
: **string**
: Manufacturer contact person phone number city code.

`manufacturer_contact_phone_number`
: **string**
: Manufacturer contact person phone number.

`manufacturer_contact_plocal`
: **string**
: Manufacturer contact person local phone number.

**Manufacturer name and address**

`manufacturer_g1_name`
: **string**
: Manufacturer name.

`manufacturer_g1_street_1`
: **string**
: Manufacturer street address line 1.

`manufacturer_g1_street_2`
: **string**
: Manufacturer street address line 2.

`manufacturer_g1_city`
: **string**
: Manufacturer city.

`manufacturer_g1_state`
: **string**
: Manufacturer two-letter state code.

`manufacturer_g1_zip_code`
: **string**
: Manufacturer 5-digit zip code.

`manufacturer_g1_zip_ext`
: **string**
: Manufacturer 4-digit zip code extension (zip+4 code).

`manufacturer_g1_postal_code`
: **string**
: Manufacturer postal code. May contain the zip code for addresses in the United States.

`manufacturer_g1_country`
: **string**
: Manufacturer two-letter country code.

#### By any manufacturer

This information is ordinarily provided by all manufacturers.

`date_manufacturer_received`
: **date string - *YYYYmmdd***
: Date when the applicant, manufacturer, corporate affiliate, etc. receives information that an adverse event or medical device malfunction has occurred. This would apply to a report received anywhere in the world. For follow-up reports, the date that the follow-up information was received.

`source_type`
: **list of strings**
: The manufacturer-reported source of the adverse event report.
: `Other`
: `Foreign`
: `Study`
: `Literature`
: `Consumer`
: `Health Professional`
: `User facility`
: `Company representation`
: `Distributor`
: `Unknown`
: `Invalid data`



### Keys and flags

`event_key`
: **string**
: Documentation forthcoming.

`mdr_report_key`
: **string**
: Documentation forthcoming.

`manufacturer_link_flag_`
: **string**
: Indicates whether a user facility/importer-submitted (distributor-submitted) report has had subsequent manufacturer-submitted reports. If so, the distributor information (address, etc.) will also be present and this field will contain `Y`. 
: `Y` = There are subsequent manufacturer-submitted reports.
: `N` = There are no subsequent manufacturer-submitted reports.

## Datasets

The following datasets provide data for this endpoint.

{% include api-reference-datasets.html datasets=page.datasets %}

</section>
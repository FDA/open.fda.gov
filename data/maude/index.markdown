---
layout:             dataset
cover:              
title:              MAUDE
title_long:         Manufacturer and User Facility Device Experience
slug:               maude
source_url:         http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm
provider_name:      FDA
provider_url:       http://www.fda.gov/
update_frequency:   Monthly
time_period:        ~1992-present
record_count:       ~3.6M records
license:            Public Domain (<a href="http://creativecommons.org/publicdomain/zero/1.0/">CC0</a>)
description:        FDA dataset that contains medical device adverse event reports submitted by mandatory reporters—manufacturers, importers and device user facilities—and voluntary reporters such as health care professionals, patients, and consumers.
download_url:       http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm
endpoints:
  - area:           Devices
    endpoint:       /device/event.json
    docs: 					/device/event/
    kind:           Device adverse event reports.
---

## About MAUDE

Each year, the FDA receives several hundred thousand medical device reports (MDRs) of suspected device-associated deaths, serious injuries and malfunctions. The FDA uses MDRs to monitor device performance, detect potential device-related safety issues, and contribute to benefit-risk assessments of these products. The MAUDE database houses MDRs submitted to the FDA by mandatory reporters[^1]  (manufacturers, importers and device user facilities) and voluntary reporters such as health care professionals, patients and consumers.

Although MDRs are a valuable source of information, this passive surveillance system has limitations, including the potential submission of incomplete, inaccurate, untimely, unverified, or biased data. In addition, the incidence or prevalence of an event cannot be determined from this reporting system alone due to potential under-reporting of events and lack of information about frequency of device use. Because of this, MDRs comprise only one of the FDA's several important postmarket surveillance data sources.

 - MDR data alone cannot be used to establish rates of events, evaluate a change in event rates over time or compare event rates between devices. The number of reports cannot be interpreted or used in isolation to reach conclusions about the existence, severity, or frequency of problems associated with devices.
 - Confirming whether a device actually caused a specific event can be difficult based solely on information provided in a given report. Establishing a cause-and-effect relationship is especially difficult if circumstances surrounding the event have not been verified or if the device in question has not been directly evaluated.
 - MAUDE data does not represent all known safety information for a reported medical device and should be interpreted in the context of other available information when making device-related or treatment decisions.
 - Variations in trade, product, and company names affect search results. Searches only retrieve records that contain the search term(s) provided by the requester.
 - Submission of a medical device report and the FDA's release of that information is not necessarily an admission that a product, user facility, importer, distributor, manufacturer, or medical personnel caused or contributed to the event.
 - Certain types of report information are protected from public disclosure under the Freedom of Information Act (FOIA). If a report contains trade secret or confidential business information, that text is replaced by "(b)(4)". If a report contains personnel or medical files information, that text is replaced by "(b)(6)". The designations "(b)(4)" and "(b)(6)" refer to the exemptions in the FOIA. For example, "(b)(4)" may be found in place of the product's composition and "(b)(6)" may be found in place of a patient's age.
 - MAUDE is updated monthly and the search page reflects the date of the most recent update. The FDA seeks to include all reports received prior to the update but the inclusion of some reports may be delayed.

## Downloads

See the [MAUDE site]({{ page.source_url }}) for download information.

[^1]:
    **Mandatory reporters**

    Manufacturers and importers must submit reports when they become aware of information that reasonably suggests that one of their marketed devices may have caused or contributed to a death or serious injury or has malfunctioned and the malfunction of the device or a similar device that they market would be likely to cause or contribute to a death or serious injury if the malfunction were to recur.  Manufacturers must send reports of such deaths, serious injuries, and malfunctions to the FDA.  Importers must send reports of deaths and serious injuries to the FDA and the manufacturer, and reports of malfunctions to the manufactuerer.

    Device user facilities include hospitals, outpatient diagnostic or treatment facilities, nursing homes and ambulatory surgical facilities.  Device user facilities must submit reports when they become aware of information that reasonably suggests that a device may have caused or contributed to a death or serious injury of a patient in their facility. Death reports must be sent to the FDA and the manufacturer, if known. Serious injury reports must be sent to the manufacturer or to the FDA, if the manufacturer is not known

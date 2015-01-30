---
layout:             dataset
cover:              
title:              FAERS
title_long:         FDA Adverse Event Reporting System
slug:               faers
source_url:         http://www.fda.gov/Drugs/GuidanceComplianceRegulatoryInformation/Surveillance/AdverseDrugEffects/default.htm
provider_name:      FDA
provider_url:       http://www.fda.gov/
update_frequency:   Quarterly
time_period:        Q1 2004-Q3 2013
record_count:       ~3.8M records
license:            Public Domain (<a href="http://creativecommons.org/publicdomain/zero/1.0/">CC0</a>)
description:        The FDA Adverse Event Reporting System (FAERS) is a database that contains information on adverse event and medication error reports submitted to FDA.
download_url:       http://www.fda.gov/Drugs/GuidanceComplianceRegulatoryInformation/Surveillance/AdverseDrugEffects/ucm082193.htm
endpoints:
  - area:           Drugs
    endpoint:       /drug/event.json
    docs: /drug/event/
    kind:           Drug adverse reactions.
---

## About FAERS

The FDA Adverse Event Reporting System (FAERS) is a database that contains information on adverse event and medication error reports submitted to FDA. The database is designed to support the FDA's post-marketing safety surveillance program for drug and therapeutic biologic products. The informatic structure of the FAERS database adheres to the international safety reporting guidance issued by the International Conference on Harmonisation (ICH E2B). Adverse events and medication errors are coded to terms in the Medical Dictionary for Regulatory Activities (MedDRA) terminology.

## Downloads

See the [FAERS site]({{ page.source_url }}) for download information.
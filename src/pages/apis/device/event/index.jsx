import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import InteractiveInfographic from '../../../../components/InteractiveInfographic'

import infographic_definitions from './_infographic_definitions.json'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Device Adverse Event Overview</h2>
        <p>The U.S. Food and Drug Administration (FDA) regulates medical devices in the United States. Medical devices range from simple tongue depressors and bedpans to complex programmable pacemakers and laser surgical devices. In addition, medical devices include in vitro diagnostic products, such as general purpose lab equipment, reagents, and test kits, which may include monoclonal antibody technology. Certain electronic radiation emitting products with medical application and claims meet the definition of medical device. Examples include diagnostic ultrasound products, x-ray machines, and medical lasers.</p>
        <p>An adverse event report is submitted to the FDA to report serious events or undesirable experiences associated with the use of a medical device.</p>

        <InteractiveInfographic
          infographicDefinitions={infographic_definitions}
          meta={meta}
        />

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>About MAUDE data</h3>
        <p>The openFDA device adverse event API returns data from <a href="http://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfmaude/search.cfm">Manufacturer and User Facility Device Experience (MAUDE)</a>, an FDA dataset that contains medical device adverse event reports submitted by mandatory reporters—manufacturers, importers and device user facilities—and voluntary reporters such as health care professionals, patients, and consumers. Currently, this data covers publically releasable records submitted to the FDA from about 1992 to the present. The data is updated weekly.</p>
        <p>Each year, the FDA receives several hundred thousand medical device reports (MDRs) of suspected device-associated deaths, serious injuries and malfunctions. The FDA uses MDRs to monitor device performance, detect potential device-related safety issues, and contribute to benefit-risk assessments of these products. The MAUDE database houses MDRs submitted to the FDA by mandatory reporters (manufacturers, importers and device user facilities) and by voluntary reporters (such as health care professionals, patients, and consumers).</p>
        <p>Although MDRs are a valuable source of information, this passive surveillance system has limitations, including the potential submission of incomplete, inaccurate, untimely, unverified, or biased data. In addition, the incidence or prevalence of an event cannot be determined from this reporting system alone due to potential under-reporting of events and lack of information about frequency of device use. Because of this, MDRs comprise only one of the FDA’s several important postmarket surveillance data sources.</p>
        <p>See the [MAUDE dataset page](/data/maude/) for more details.</p>

        <h3>How adverse events are collected</h3>
        <p>Adverse events are collected through a series of <strong>safety reports</strong>. Each is identified by a 8-digit string (for instance, <code>6176304-1</code>). The first 7 digits (before the hyphen) identify the individual report, and the last digit (after the hyphen) is a checksum. Rather than updating individual records in FAERS, subsequent updates are submitted in seperate reports.</p>

        <h3>How records are organized</h3>
        <p>Device adverse event reports vary significantly, depending on who initially reported the event, what kind of event was reported, and whether there were follow-up reports. Some reports come directly from user facilities (like hospitals) or device importers (distributors), while others come directly from manufacturers. Some involve adverse reactions in patients, while others are reports of defects that did not result in such adverse reactions.</p>
        <p>Records served by the openFDA device adverse events endpoint loosely reflect field organization found in the <a href="http://www.fda.gov/Safety/MedWatch/HowtoReport/DownloadForms/default.htm">forms used by manufacturers and members of the public</a> to report these events. Since reports may come from manufacturers, user facilities, distributors, and voluntary sources (such as patients and physicians) who are subject to different reporting requirements, the collected data in the adverse event system may not always capture every field and should not be interpreted as incomplete.</p>

        <h3>Responsible use of the data</h3>
        <p>Adverse event reports submitted to FDA do not undergo extensive validation or verification. Therefore, <strong>a causal relationship cannot be established between product and reactions listed in a report.</strong> While a suspected relationship <em>may</em> exist, it is not medically validated and should not be the sole source of information for clinical decision making or other assumptions about the safety or efficacy of a product.</p>
        <p>Additionally, it is important to remember that adverse event reports represent a small percentage of total usage numbers of a product. Common products may have a higher number of adverse events due to the higher total number of people using the product. In recent years the FDA has undertaken efforts to increase collection of adverse events. Increases in the total number of adverse events is likely caused by improved reporting.</p>

        <h3>Disclaimer</h3>
        <p>Although MDRs are a valuable source of information, this passive surveillance system has limitations, including the potential submission of incomplete, inaccurate, untimely, unverified, or biased data. In addition, the incidence or prevalence of an event cannot be determined from this reporting system alone due to potential under-reporting of events and lack of information about frequency of device use. Because of this, MDRs comprise only one of the FDA's several important postmarket surveillance data sources.</p>
      </section>
    )
  }
}

export default IndexRoute

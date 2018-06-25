import React from "react"
import Link from "gatsby-link"

import KeyFacts from '../../../../components/RenderContentObject/KeyFacts'
import InteractiveInfographic from '../../../../components/InteractiveInfographic'
import MultipleProductTable from '../../../../components/MultipleProductTable'

import infographic_definitions from './_infographic_definitions.json'
import meta from './_meta.yaml'

class IndexRoute extends React.Component {
  render() {

    return (
      <section className="doc-content">
        <h2>Drug Adverse Event Overview</h2>
        <p>The openFDA drug adverse event API returns data that has been collected from the <Link to="/data/faers/">FDA Adverse Event Reporting System (FAERS)</Link>, a database that contains information on adverse event and medication error reports submitted to FDA.</p>

        <InteractiveInfographic
          infographicDefinitions={infographic_definitions}
          meta={meta}
        />

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>About FAERS data</h3>
        <p>An adverse event is submitted to the FDA to report any undesirable experience associated with the use of a medical product in a patient. For drugs, this includes serious drug side effects, product use errors, product quality problems, and therapeutic failures for prescription or over-the-counter medicines and medicines administered to hospital patients or at outpatient infusion centers.</p>
        <p>Reporting of adverse events by healthcare professionals and consumers is voluntary in the United States. FDA receives some adverse event reports directly from healthcare professionals (such as physicians, pharmacists, nurses and others) and consumers (such as patients, family members, lawyers and others). Healthcare professionals and consumers may also report adverse events to the products’ manufacturers. If a manufacturer receives an adverse event report, it is normally required to send the report to FDA.</p>
        <p>Learn more about FAERS here:</p>
        <ul>
          <li><a href="https://www.fda.gov/Drugs/GuidanceComplianceRegulatoryInformation/Surveillance/AdverseDrugEffects/">Questions and Answers on FDA's Adverse Event Reporting System (FAERS)</a></li>
          <li><a href="https://www.fda.gov/Drugs/GuidanceComplianceRegulatoryInformation/Surveillance/AdverseDrugEffects/ucm070093.htm">FDA Adverse Events Reporting System (FAERS) Public Dashboard</a></li>
        </ul>

        <h3>How adverse events are collected</h3>
        <p>Adverse events are collected through a series of <strong>safety reports</strong>. Each is identified by a 8-digit string (for instance, <code>6176304-1</code>). The first 7 digits (before the hyphen) identify the individual report, and the last digit (after the hyphen) is a checksum. Rather than updating individual records in FAERS, subsequent updates are submitted in seperate reports.</p>

        <h3>How adverse events are formatted and organized</h3>
        <p>Adverse event reports use the <a href="http://estri.ich.org/e2br22/ICH_ICSR_Specification_V2-3.pdf">ICH E2b/M2 version 2.1 standard.</a></p>
        <p>This highly simplified schematic illustrates the general nature of an adverse event report. A report may list several drug products, as well as several patient reactions. No individual drug is connected to any individual reaction. <strong>When a report lists multiple drugs and multiple reactions, there is no way to conclude from the data therein that a given drug is responsible for a given reaction.</strong></p>
        <MultipleProductTable/>
        <p>Any number of the drugs may be marked as <em>suspect</em> if thought to be responsible for one or more of the reactions, but that information is not validated. <em>Concomitant</em> drugs are those which are not suspected of causing one or more of the reactions. Many drug products appear frequently in adverse event reports simply because they are commonly taken by many people in the population, not because they are responsible for more adverse events.</p>
        <p>Reports contain varying levels of detail about the drug products involved, indications for use, route of administration, and dose.</p>

        <h3>Responsible use of the data</h3>
        <p>Adverse event reports submitted to FDA do not undergo extensive validation or verification. Therefore, <strong>a causal relationship cannot be established between product and reactions listed in a report.</strong> While a suspected relationship <em>may</em> exist, it is not medically validated and should not be the sole source of information for clinical decision making or other assumptions about the safety or efficacy of a product.</p>
        <p>Additionally, it is important to remember that adverse event reports represent a small percentage of total usage numbers of a product. Common products may have a higher number of adverse events due to the higher total number of people using the product. In recent years the FDA has undertaken efforts to increase collection of adverse events. Increases in the total number of adverse events is likely caused by improved reporting.</p>

        <h3>Disclaimer</h3>
        <p>FAERS data does have limitations. There is no certainty that the reported event (adverse event or medication error) was actually due to the product. FDA does not require that a causal relationship between a product and event be proven, and reports do not always contain enough detail to properly evaluate an event.</p>
        <p>Further, FDA does not receive reports for every adverse event or medication error that occurs with a product. Many factors can influence whether or not an event will be reported, such as the time a product has been marketed and publicity about an event.</p>
        <p>Submission of a safety report does not constitute an admission that medical personnel, user facility, importer, distributor, manufacturer or product caused or contributed to the event. The information in these reports has not been scientifically or otherwise verified as to a cause and effect relationship and cannot be used to estimate the incidence of these events.</p>
      </section>
    )
  }
}

export default IndexRoute

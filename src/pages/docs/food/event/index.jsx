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
        <h2>Adverse Food Event Overview</h2>
        <p>The openFDA food, dietary supplements, and cosmetic adverse event API returns data from the <Link to="/data/caers/">Center for Food Safety and Applied Nutrition Adverse Event Reporting System (CAERS)</Link>, a database that contains information on adverse event and product complaint reports submitted to FDA for foods, dietary supplements, and cosmetics. The database is designed to support CFSAN's safety surveillance program.
        </p>

        <InteractiveInfographic
          infographicDefinitions={infographic_definitions}
          meta={meta}
        />

        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
        />

        <h3>Additional Information About Food, Dietary Supplement, and Cosmetic Adverse Events</h3>
        <p>The U.S. Food and Drug Administration (FDA) regulates food products in the United States, working to assure that the food supply is safe, sanitary, wholesome, and honestly labeled. FDA's responsibility covers all domestic and imported food except meat, poultry, and frozen, dried, and liquid eggs, and the labeling of alcoholic beverages (above 7% alcohol). It even includes dietary supplements, bottled water, food additives, infant formulas, and other food products. The FDA also regulates all cosmetic products and ingredients in the United States, including hair products, makeup, soaps, and lotions</p>
	    <p>Reporting of adverse events by healthcare professionals and consumers is voluntary in the United States. FDA receives some adverse event reports directly from healthcare professionals (such as physicians, pharmacists, nurses and others) and consumers (such as patients, family members, lawyers and others). Healthcare professionals and consumers may also report adverse events to the products’ manufacturers. If a manufacturer receives an adverse event report, it is normally required to send the report to FDA.</p>
	    <p>An adverse event is submitted to the FDA to report adverse health effects and product complaints about foods, dietary supplements, and cosmetics. These may include side effects, product use errors, and product quality problems. Reporting is voluntary for beverages, conventional foods, dietary supplements, and cosmetics, which means that manufacturers and citizens may report them at any time but are not obligated to. For dietary supplements, manufacturers, packers, and distributers must notify the FDA if they receive reports about serious adverse events in connection with the use of their products.</p>
	    <p>Each report received regarding an individual that experiences an adverse event is assigned a unique report number. Even with mandatory reporting of serious adverse events for dietary supplements, generally only a small fraction of adverse events associated with any product is reported.</p>
	    <p>A report may list several products, as well as several reactions that the consumer experienced. No individual food, dietary supplements, or cosmetic product is connected to any individual reaction. When a report lists multiple products and multiple reactions, there is no way to conclude from the data therein that a given product is responsible for a given reaction.</p>
        <p>To read more about CAERS data, please visit:</p>
        <ul>
          <li><a href="http://www.fda.gov/Food/ComplianceEnforcement/ucm494015.htm">CFSAN Adverse Event Reporting System (CAERS)</a></li>
          <li><Link to="/data/caers/">FDA’s CAERS database</Link></li>
        </ul>

        <h3>Responsible use of the data</h3>
        <p>Do not rely on openFDA to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products. We may limit or otherwise restrict your access to the API in line with our <Link to="/terms/">Terms of Service</Link></p>
		<p>Adverse event reports submitted to FDA do not undergo extensive validation or verification. Therefore, <i className="weight-700 italic">a causal relationship cannot be established between product and reactions listed in a report.</i> While a suspected relationship <i className="weight-700 italic">may</i> exist, it is not medically validated and should not be the sole source of information for clinical decision making or other assumptions about the safety or efficacy of a product.</p>
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




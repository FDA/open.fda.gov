import React from "react"
import KeyFacts from "../../../../components/RenderContentObject/KeyFacts";
import meta from "./_meta.yaml";

class IndexRoute extends React.Component {
  render () {

    return (
      <section className='doc-content'>
        <h2>Complete Response Letters</h2>
        <p>This database contains Complete Response Letters (CRLs) associated with approved and unapproved New Drug Applications (NDAs) and Biologics License Applications (BLAs).
          Currently, the database includes CRLs issued to sponsors between 2024 and 2025. FDA will continue to add to this database as CRLs are issued to sponsors, providing
          the public with significant insight into the agency’s decisions. Additionally, FDA may publish in this database batches of CRLs from its archives associated with
          withdrawn and approved applications.</p>

        <p>FDA will send the sponsor a CRL if the agency determines that it will not approve the application in its current form. The agency correspondence reflects FDA's analysis
          of the data submitted in an application and describes the specific deficiencies identified during the review of safety and effectiveness data in the application.
          The agency may include recommended actions for the applicant to take to obtain marketing approval.</p>

        <p>FDA’s authority to release complete response letters is derived from the Federal Freedom of Information Act (FOIA) at 5 USC 552(a), section 505(l) of the Federal Food,
          Drug, and Cosmetic Act (FDCA) at 21 USC 355(l), and FDA information disclosure regulations at 21 CFR Part 20 and 21 CFR 312.130, 314.430, and 601.51. Complete response
          letters often contain confidential commercial information (CCI) and trade secret information (TSI), that will be redacted prior to public disclosure under the Trade
          Secrets Act 18 U.S.C. 1905 (TSA) and section 301(j) of the FDCA (21 USC 331(j)).</p>

        <p>Proactive disclosure of redacted complete response letters offers important benefits to the public health, including:</p>
        <ul>
          <li>Greater transparency can empower drug developers to avoid blind alleys and common missteps to accelerate development and efficiently bring more cures and meaningful treatments to American patients and their families.</li>
          <li>Improved predictability for drug development and industry stakeholders will advance the development of safe and effective drug products and potentially reduce research and development time and resource needed.</li>
          <li>Information related to the safety and effectiveness (and timeliness) of available treatments is an issue of the utmost importance to American patients and their families, and health care professionals evaluating and recommending care for patients especially where there is an unmet need for which there are no available or adequate treatment options.</li>
          <li>Restoring public trust in the integrity of FDA decision-making is an issue of paramount importance. Such disclosures will help to ensure sponsors provide complete and contextualized information regarding key milestones to investors, shareholders, and the general public.</li>
        </ul>

        <p>FDA current leadership’s efforts to prioritize radical transparency by making CRLs publicly available is consistent with the agency’s broader strategic objectives to
          innovate and modernize the agency and to rebuild public trust in the integrity of the agency’s regulatory decision-making.</p>

        <p>The disclosure of this information is consistent with the Administration’s directive under Executive Order No. 14303, to release “data, analyses, and conclusions associated with scientific and technological information produced or used by the agency that the agency reasonably assesses will have a clear and substantial effect on important public policies or important private sector decisions.” See Executive Order No. 14303, “Restoring Gold Standard Science” (emphasizing the importance of credible and impartial scientific evidence in federal decisions, and the public disclosure of the same).</p>
        <p><a href='https://download.open.fda.gov/approved_CRLs.zip'>Download Approved Complete Response Letters in PDF format</a></p>
        <p><a href='https://download.open.fda.gov/unapproved_CRLs.zip'>Download Unapproved Complete Response Letters in PDF format</a></p>
        <KeyFacts
          noun_name={meta.api_path.split("/")[1]}
          endpoint_name={meta.api_path.split("/")[2]}
          harmonized={false}
          status={meta.status}
        />
      </section>
    )
  }
}

export default IndexRoute


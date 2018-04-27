/* @flow */

import React from 'react'

import Hero from '../../components/Hero'
import Layout from '../../components/Layout'

const Link: ReactClass = require('react-router').Link

type PROPS = {
  route: Object;
};

// homepage
export default ({ route }: PROPS) => (
  <Layout title='Open FDA Homepage'>
    <Hero
      title='OpenFDA updates'
    />
    <section className='container marg-t-2 marg-b-2'>
      <table>
        <tbody style={{fontFamily: "times-new-roman"}}>
          <tr>
            <td><Link to="/update/udi-dataset-updated/">UDI dataset updated to add new data elements such as device product pre-submission numbers and types</Link></td>
            <td>April 20, 2018</td>
          </tr>
          <tr>
            <td><Link to="/other/nsde/">New openFDA Dataset:  NSDE – Medicare Part D Prescription Drug Event Editing & Coverage Gap Discount Program</Link></td>
            <td>December 28, 2017</td>
          </tr>
          <tr>
            <td><Link to="/update/openfda-limit-increased/">OpenFDA Query Result Limit Increased</Link></td>
            <td>August 29, 2017</td>
          </tr>
          <tr>
            <td><Link to="/downloads/">New openFDA web page: a central location for all of the hyperlinks to the downloadable openFDA datasets</Link></td>
            <td>December 23, 2016</td>
          </tr>
          <tr>
            <td><a href="https://blogs.fda.gov/fdavoice/index.php/2016/12/why-fda-is-making-data-extracted-from-reports-of-adverse-events-for-foods-and-cosmetics-available-to-the-public/?source=govdelivery&utm_medium=email&utm_source=govdelivery">Making Available Reports of Adverse Events for Foods and Cosmetics via openFDA</a></td>
            <td>December 6, 2016</td>
          </tr>
          <tr>
            <td><Link to="/api/statistics/">New openFDA API Statistics Graph – Daily Updates</Link></td>
            <td>October 24, 2016</td>
          </tr>
          <tr>
            <td><Link to="/device/udi/">New openFDA Dataset:  Unique Device Identifier</Link></td>
            <td>September 26, 2016</td>
          </tr>
          <tr>
            <td><Link to="/community/">New Webpage with List of openFDA Apps Created by openFDA Community</Link></td>
            <td>September 26, 2016</td>
          </tr>
          <tr>
            <td><a href="https://www.federalregister.gov/documents/2016/06/01/2016-12826/openfda-public-workshop">openFDA Public Workshop Announcement</a></td>
            <td>June 1, 2016</td>
          </tr>
          <tr>
            <td>openFDA Web Platform Updated to Align with US Design Standards</td>
            <td>June 1, 2016</td>
          </tr>
          <tr>
            <td><Link to="/update/openfda-now-allows-direct-downloads-of-data/">OpenFDA Now Allows Direct Downloads of Data</Link></td>
            <td>December 22, 2015</td>
          </tr>
          <tr>
            <td><Link to="/update/openfda-unveils-cache-of-medical-device-data/">OpenFDA Unveils Cache of Medical Device Data</Link></td>
            <td>August 30, 2015</td>
          </tr>
          <tr>
            <td><Link to="/update/new-release-coming-soon/">Mark your calendars: A new release coming soon from openFDA</Link></td>
            <td>August 5, 2015</td>
          </tr>
          <tr>
            <td><Link to="/update/drilling-into-the-details/">OpenFDA: Drilling Into The Details</Link></td>
            <td>July 22, 2015</td>
          </tr>
          <tr>
            <td><Link to="/update/first-year-in-perspective/">OpenFDA: The First Year in Perspective</Link></td>
            <td>July 19, 2015</td>
          </tr>
          <tr>
            <td><Link to="/update/an-open-challenge-to-tap-public-data/">Announcing the OpenFDA Developer Challenge - An open call to tap public data and improve public health</Link></td>
            <td>May 10, 2015</td>
          </tr>
          <tr>
            <td><Link to="/update/providing-easy-access-to-medical-device-reports/">Providing easy access to medical device reports submitted to FDA since the early 1990s</Link></td>
            <td>August 18, 2014</td>
          </tr>
          <tr>
            <td><Link to="/update/drug-product-labeling/">Providing easy public access to prescription drug, over-the-counter drug, and biological product labeling</Link></td>
            <td>August 17, 2014</td>
          </tr>
          <tr>
            <td><Link to="/update/openfda-provides-ready-access-to-recall-data/">OpenFDA provides ready access to recall data</Link></td>
            <td>August 7, 2014</td>
          </tr>
          <tr>
            <td><Link to="/update/introducing-openfda/">Introducing openFDA</Link></td>
            <td>June 2, 2014</td>
          </tr>
          <tr>
            <td><Link to="/update/openfda-innovative-initiative-opens-door-to-wealth-of-fda-publicly-available-data/">OpenFDA: Innovative initiative opens door to wealth of FDA’s publicly available data</Link></td>
            <td>June 1, 2014</td>
          </tr>
          <tr>
            <td><Link to="/update/ten-things-to-know-about-adverse-events/">Ten things to know about drug adverse events</Link></td>
            <td>June 1, 2014</td>
          </tr>
          <tr>
            <td><Link to="/update/fda-path-forward-for-open-data-and-next-generation-sequencing/">FDA’s path forward for open data and Next Generation Sequencing</Link></td>
            <td>March 5, 2014</td>
          </tr>
        </tbody>
      </table>
    </section>
  </Layout>
)

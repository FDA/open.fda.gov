import React from 'react'

import Hero from '../../components/Hero'
import tools from './_apps.yaml'

const aCx: string = 'clr-gray font-size-4 weight-400 t-pad-t-2 t-pad-b-2 block reading-width t-marg-b-2'
const disclaimer: string = 'http://www.fda.gov/AboutFDA/AboutThisWebsite/WebsitePolicies/Disclaimers/default.htm'

export default () => (
    <section>
        <Hero
            label='Community'
            title='openFDA Apps'
            htmlDescription="true"
            description="<b>FDA is not responsible for Section 508 compliance (accessibility) on other federal or private websites. See <a href='http://www.hhs.gov/disclaimer.html' class='clr-white underline' >HHS’s Website Disclaimer</a>.</b><br/><br/><b>FDA is not responsible for the contents of any pages referred from its website. See <a class='clr-white underline' href='http://www.fda.gov/AboutFDA/AboutThisWebsite/WebsitePolicies/#sites'>FDA’s Website Policy</a> and the <a class='clr-white underline' href='https://www.whitehouse.gov/sites/default/files/omb/assets/memoranda_2010/m10-23.pdf'>OMB's Guidance for Agency Use of Third-Party Websites and Applications</a>.</b><br/><br/>App developers may request to have their openFDA-related apps appear on this page by submitting an inquiry to <a href='mailto:open@fda.hhs.gov' class='clr-white underline'>open@fda.hhs.gov</a>."
        />

        <section className='container clearfix marg-t-3 marg-b-3 relative'>

            <div className="flex-box dir-row flex-wrap">
                    {
                        tools.map((tool, i) => (
                            <div className="col d-3 b-t-1 grow-none" key={i}>
                                <div className="flex-box">
                                    <h4><a
                                        className={aCx}
                                        href={tool.url}
                                        target="_blank">{tool.title}</a><a href={disclaimer} target="_blank" className="link-external"></a></h4>
                                </div>
                            </div>
                        ))
                    }
            </div>

        </section>
    </section>
)

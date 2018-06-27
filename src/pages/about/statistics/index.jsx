import React from 'react'

import Hero from '../../../components/Hero/index'
import ApiUsage from '../../../components/ApiUsage'

import content from './_content.yaml'


export default () => (
    <section>
        <Hero
            label='API Usage Statistics'
            title='Statistics'
            htmlDescription="true"
            description="This page provides an overview of the usage of the API endpoints by the community."
        />

        <section className='container clearfix marg-t-3 marg-b-3 relative'>
            <div className="float-r" style={{  maxWidth: '100%',}}>
                <ApiUsage accessSinceLaunch={content.accessSinceLaunch} dynamicDisclaimer={content.dynamicDisclaimer} clickEndpointDisclaimer={content.clickEndpointDisclaimer} />
            </div>


        </section>
    </section>
)

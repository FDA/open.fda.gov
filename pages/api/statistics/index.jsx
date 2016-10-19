import React from 'react'

import Hero from '../../../components/Hero'
import Layout from '../../../components/Layout'
import ApiUsage from '../../../components/ApiUsage'

import content from './_content.yaml'


export default () => (
    <Layout
        crumbs={['openFDA','Usage','statistics']}
        title='openFDA › Usage'>
        <Hero
            label='API Usage Statistics'
            title='Statistics'
            htmlDescription="true"
            description="Provides an overview of various endpoints are used by the community."
        />

        <section className='container clearfix marg-t-3 marg-b-3 relative'>
            <div className="float-r" style={{  maxWidth: '100%',}}>
                <ApiUsage accessSinceLaunch={content.accessSinceLaunch} dynamicDisclaimer={content.dynamicDisclaimer} clickEndpointDisclaimer={content.clickEndpointDisclaimer} />
            </div>


        </section>
    </Layout>
)

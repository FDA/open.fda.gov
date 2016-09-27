import React from 'react'
import Charts from 'react-chartjs'
const Line: ReactClass = Charts.Line


import Hero from '../../../components/Hero'
import Layout from '../../../components/Layout'


const aCx: string = 'clr-gray font-size-4 weight-400 t-pad-t-2 t-pad-b-2 block reading-width t-marg-b-2'
const linkCx: string = 'clr-gray b-b-1 marg-b-1'
const disclaimer: string = 'http://www.fda.gov/AboutFDA/AboutThisWebsite/WebsitePolicies/Disclaimers/default.htm'
const height:int = 500
const width:int = 500
const dataChanged = true
const nextChartData = {
    labels : ["January","February","March","April","May","June"],
    datasets : [
        {
            fillColor : "rgba(172,194,132,0.4)",
            strokeColor : "#ACC26D",
            pointColor : "#fff",
            pointStrokeColor : "#9DB86D",
            data : [200003,8880,99,90909,305,247]
        }
    ]
}
export default () => (
    <Layout
        crumbs={['openFDA','Community','openFDA Apps']}
        title='openFDA › openFDA Apps'>
        <Hero
            label='Community'
            title='openFDA Apps'
            htmlDescription="true"
            description="Part of openFDA's mission is to make public FDA data quickly and easily accessible for use in applications. Members of the openFDA community have responded to that opportunity by creating new apps that further the reach of the available information and extend the benefits of the openFDA database. <br/> <br/> openFDA developers wishing to see their app appear on this page may send a request to <a href='mail-to:open@fda.hhs.gov' class='clr-white underline'>open@fda.hhs.gov</a>."
        />

        <section className='container clearfix marg-t-3 marg-b-3 relative'>


            <Line
                // needed. destroy and redo chart on change
                // this lets us toggle the animation property correctly
                redraw={dataChanged}
                data={nextChartData}
                options={{
                  // charts with large datasets can really chug
                  // but, doesn't really work as needed since
                  // chartjs doesn't let you toggle animation on and off
                  // willy nilly, it just lets you set it initially
                  // which is why we use the redraw prop
                    animation: nextChartData.labels.length < 50,
                }}
                height={height}
                width={width}
            />

        </section>
    </Layout>
)

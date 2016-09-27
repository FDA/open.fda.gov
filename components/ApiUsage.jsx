import React from 'react'
import Charts from 'react-chartjs'
const Line: ReactClass = Charts.Line


const height:int = 500
const width:int = 500
const dataChanged:boolean = true
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

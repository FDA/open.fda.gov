import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { json } from "d3-fetch";
import { scaleSymlog } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleSymlog()
  .domain([0, 7000000])
  .range(["#acd9ff", "#4481b6"]);

const MapChart = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("world");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("region: ", region)
    json(`/${region}_regions.json`).then((data) => {
      console.log("data: ", data.regions)
      setData(data.regions);
    });
  }, [region]);

  return (
    <div>
      <div className='noun-buttons' id='noun-buttons'>
        <div
          className={region === 'world' ? 'selected': 'unselected'}
          id={'noun-button-' + 'world'}
          onClick={() => setRegion('world')}
          title={'world'}>
          World
        </div>
        <div
          className={region === 'us' ? 'selected': 'unselected'}
          id={'noun-button-' + 'us'}
          onClick={() => setRegion('us')}
          title={'us'}>
          United States
        </div>
      </div>
      <ComposableMap
        data-tip=""
        projection={region === 'us' ?  'geoAlbersUsa' : 'geoEqualEarth'}
        projectionConfig={region === 'world' ? {rotate: [-10, 0, 0], scale: 147} : {}}
      >
        {
          region === 'world' &&
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        }
        {
          region === 'world' &&
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        }
        {data.length > 0 && (
          <Geographies
            geography={`/${region}_map.json`}
            stroke="#e6e5e7"
            strokeWidth={0.4}
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                //console.log("geo: ", geo.properties)
                //const d = data.find((s) => s.id === geo.properties.ISO)
                const d = data.find((s) => region === 'world' ? s.id === geo.properties.ISO : s.name === geo.properties.name)
                //console.log("d: ", d)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setHeader(`${name}`)
                      setContent(`${d ? d.hits : 0}`);
                    }}
                    onMouseLeave={() => {
                      setHeader("")
                      setContent("")
                    }}
                    fill={d ? colorScale(d["hits"]) : "#F5F4F6"}
                    style={{
                      hover: {
                        fill: "#efc547",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
      {
        content &&
        <ReactTooltip>
          <h6>{header}</h6>
          <span> Hits: <strong>{content}</strong></span>
        </ReactTooltip>
      }
    </div>
  );
};

export default MapChart;

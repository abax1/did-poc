import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";
import CirclePulse from "./CirclePulse";
import MyAnnotation from "../MyAnnotation/MyAnnotation";

//const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
//const geoUrl = "../../data/uk_map.json";
const geoUrl = "/en_map.json";

// const colorScale = scaleQuantize()
//   .domain([1, 10])
//   .range([
//     "#ffedea",
//     "#ffcec5",
//     "#ffad9f",
//     "#ff8a75",
//     "#ff5533",
//     "#e2492d",
//     "#be3d26",
//     "#9a311f",
//     "#782618"
//   ]);

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#E8F8F5",
    "#D1F2EB",
    "#A3E4D7",
    "#76D7C4",
    "#48C9B0",
    "#1ABC9C",
    "#E8F8F5",
    "#D1F2EB",
    "#A3E4D7"
  ]);

const returnLat = data => {
  if (data) {
    var splitLocation = data.split(", ");
    console.log("splitLocation: ", parseFloat(splitLocation));
    return parseFloat(splitLocation[0]);
  } else {
    return 0.0;
  }
};

const returnLon = data => {
  if (data) {
    var splitLocation = data.split(", ");
    console.log("splitLocation: ", parseFloat(splitLocation));
    return parseFloat(`-${splitLocation[1]}`);
  } else {
    return 0.0;
  }
};

const MapChart = ({ width, locations, annotate, color }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // https://www.bls.gov/lau/
    csv("/unemployment-by-county-2017.csv").then(counties => {
      setData(counties);
    });
  }, []);

  return (
    <div style={{ maxWidth: width ? `${width}` : `auto` }}>
      <ComposableMap
        projection="geoAlbers"
        projectionConfig={{
          center: [2, 52.6],
          rotate: [4.4, 0],
          parallels: [50, 60],
          scale: 5000
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colorScale(Math.floor(Math.random() * Math.floor(9)))}
                stroke="white"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>

        {locations &&
          locations.map((data, i) => (
            <>
              <Marker
                coordinates={[
                  returnLon(data.car_location),
                  returnLat(data.car_location)
                ]}
              >
                <CirclePulse color={color} pulseColor={color} size={2} />
                {annotate && (
                  <MyAnnotation
                    i={i}
                    title={data.car_name}
                    label={`Parking-Space::${data.parking_spot_name} id::${data.id} time::${data.start_time}, Charge::${data.parking_charge}`}
                    color={"red"}
                    wrap={60}
                  />
                )}
              </Marker>
            </>
          ))}
      </ComposableMap>
    </div>
  );
};

// Specifies the default values for props:
MapChart.defaultProps = {
  annotate: true,
  color: "red"
};

export default MapChart;

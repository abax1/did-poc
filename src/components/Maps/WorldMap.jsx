import React, { memo } from "react";
import { connect } from "react-redux";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  Marker,
  Annotation,
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { nodeType } from "../../constants";

import "./NodeMap.css";
import MyAnnotation from "../MyAnnotation/MyAnnotation";
import CirclePulse from "./CirclePulse";

const redRange = [
  "#FDEDEC",
  "#FADBD8",
  "#F5B7B1",
  "#F1948A",
  "#FDEDEC",
  "#FADBD8",
  "#F5B7B1",
  "#F1948A",
  "#FDEDEC",
];

const greenRange = [
  "#E8F8F5",
  "#D1F2EB",
  "#A3E4D7",
  "#76D7C4",
  "#48C9B0",
  "#1ABC9C",
  "#E8F8F5",
  "#D1F2EB",
  "#A3E4D7",
];

const stroke = "#FDEDEC";

const colorScale = scaleQuantize().domain([1, 10]).range(greenRange);

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({ scale, nodeMap, lat, long }) => {
  console.log("lat, long", lat, long)

  const nLat = parseFloat(lat)
  //const nLong = parseFloat(long)
  const nLong = Math.abs(parseFloat(long))
  //const nLong = parseFloat(long)
  console.log("nlat, nlong", nLat, nLong)

  return (
    <div className="map-style">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: scale,
        }}
      >
        <Sphere stroke="#E5E8E8" strokeWidth={0.2} />
        <Graticule stroke="#E5E8E8" strokeWidth={0.2} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colorScale(Math.floor(Math.random() * Math.floor(9)))}
                stroke={stroke}
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>

        <Marker coordinates={[nLong, nLat]}>
          <circle
            r={2}
            fill={nodeMap.annotationColor}
            onMouseEnter={() => {
              console.log("MouseOVER!");
            }}
          />
              <CirclePulse
                color={"green"}
                pulseColor={nodeMap.pulse}
                size={3}
              />
          <circle
            r={3}
            fill="none"
            stroke={nodeMap.annotationColor}
            strokeWidth={0.5}
          />
        </Marker>
      </ComposableMap>
    </div>
  );
};

WorldMap.defaultProps = {
  scale: 147
}

const mapStateToProps = (state) => {
  return {
    nodeMap: state.mainReducer.nodeMap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getTransactions: () => {
    //   getTransactions(dispatch);
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(WorldMap));

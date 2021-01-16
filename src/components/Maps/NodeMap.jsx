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

const colorScale = scaleQuantize().domain([1, 10]).range(redRange);

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const NodeMap = ({ nodeMap }) => {
  return (
    <div className="map-style">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
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
        <Annotation
          subject={[8.6821, 50.1109]}
          dx={30}
          dy={20}
          connectorProps={{
            stroke: nodeMap.annotationColor,
            strokeWidth: 0.5,
            strokeLinecap: "round",
          }}
        >
          <text
            className="map-label"
            x="2"
            textAnchor="beginning"
            alignmentBaseline="middle"
            fill={nodeMap.labelColor}
          >
            OU=DEO2,O=Frankfurt,L=Germany,C=DE
          </text>
        </Annotation>

        <Marker coordinates={[8.6821, 50.1109]}>
          <circle
            r={2}
            fill={nodeMap.annotationColor}
            onMouseEnter={() => {
              console.log("MouseOVER!");
            }}
          />
          <circle
            r={3}
            fill="none"
            stroke={nodeMap.annotationColor}
            strokeWidth={0.5}
          />
        </Marker>

        <Marker coordinates={[0.1278, 51.5074]}>
          {nodeType === "CAR_PARK" ? (
            <>
              <circle r={2} fill={"green"} />
              <CirclePulse
                color={"green"}
                pulseColor={nodeMap.pulse}
                size={3}
              />

              <circle r={3} fill="none" stroke={"green"} strokeWidth={0.5} />
              <MyAnnotation
                title={"You are Here"}
                label={"This is your node, London, Lat: 50.1109, Long: 8.6821"}
                color={nodeMap.annotationColor}
                wrap={60}
              />
            </>
          ) : (
            <>
              <circle
                r={2}
                fill={nodeMap.annotationColor}
                onMouseEnter={() => {
                  console.log("MouseOVER!");
                }}
              />
              <circle
                r={3}
                fill="none"
                stroke={nodeMap.annotationColor}
                strokeWidth={0.5}
              />
            </>
          )}
        </Marker>

        <Annotation
          subject={[0.1278, 51.5074]}
          dx={23}
          dy={-2}
          connectorProps={{
            stroke: nodeMap.annotationColor,
            strokeWidth: 0.5,
            strokeLinecap: "round",
          }}
        >
          <text
            className="map-label"
            x="2"
            textAnchor="beginning"
            alignmentBaseline="middle"
            fill={nodeMap.labelColor}
          >
            {"O=Notary,L=London,C=GB"}
          </text>
        </Annotation>
        <Marker coordinates={[0.1278, 51.5074]}>
          <circle
            r={2}
            fill={nodeMap.annotationColor}
            onMouseEnter={() => {
              console.log("MouseOVER!");
            }}
          />
          <circle
            r={3}
            fill="none"
            stroke={nodeMap.annotationColor}
            strokeWidth={0.5}
          />
        </Marker>

        <Annotation
          subject={[0.1278, 51.5074]}
          dx={10}
          dy={-15}
          connectorProps={{
            stroke: nodeMap.annotationColor,
            strokeWidth: 0.5,
            strokeLinecap: "round",
          }}
        >
          <text
            className="map-label"
            x="2"
            textAnchor="beginning"
            alignmentBaseline="middle"
            fill={nodeMap.labelColor}
          >
            OU=GBRVF,O=Vodafone,L=London,C=GB
          </text>
        </Annotation>
        <Marker coordinates={[8.6821, 50.1109]}>
          {nodeType === "CAR" ? (
            <>
              <circle r={2} fill={"green"} />
              <CirclePulse
                color={"green"}
                pulseColor={nodeMap.pulse}
                size={3}
              />

              <circle r={3} fill="none" stroke={"green"} strokeWidth={0.5} />
              <MyAnnotation
                title={"You are Here"}
                label={
                  "This is your node, Franfurt, Lat: 8.6821, Long: 50.1109"
                }
                color={nodeMap.annotationColor}
                wrap={60}
              />
            </>
          ) : (
            <>
              <circle
                r={2}
                fill={nodeMap.annotationColor}
                onMouseEnter={() => {
                  console.log("MouseOVER!");
                }}
              />
              <circle
                r={3}
                fill="none"
                stroke={nodeMap.annotationColor}
                strokeWidth={0.5}
              />
            </>
          )}
        </Marker>

        <Annotation
          subject={[-79.3832, 43.6532]}
          dx={-23}
          dy={-2}
          connectorProps={{
            stroke: nodeMap.annotationColor,
            strokeWidth: 0.5,
            strokeLinecap: "round",
          }}
        >
          <text
            className="map-label"
            x="2"
            textAnchor="end"
            alignmentBaseline="middle"
            fill={nodeMap.labelColor}
          >
            {"OU=Rogers,O=Rogers,L=Toronto,C=CA"}
          </text>
        </Annotation>
        <Marker coordinates={[-79.3832, 43.6532]}>
          <circle
            r={2}
            fill={nodeMap.annotationColor}
            onMouseEnter={() => {
              console.log("MouseOVER!");
            }}
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(NodeMap));

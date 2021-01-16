import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const TestMap = ({ setTooltipContent }) => {
  const [content, setContent] = useState("");
  return (
    <>
      <ComposableMap
        data-tip=""
        projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none"
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
              />
            ))
          }
        </Geographies>
        <p
          onMouseEnter={() => {
            setContent("Satoshi");
          }}
          onMouseLeave={() => {
            setContent("");
          }}
          data-tip=""
          data-for="test"
        >
          <Marker coordinates={[139.6503, 35.6762]}>
            <circle r={4} fill="#F53" />
          </Marker>
        </p>
        <ReactTooltip id="test">{content}</ReactTooltip>
      </ComposableMap>
    </>
  );
};

export default memo(TestMap);

import React from "react";

import "./CirclePulse.css";

const CirclePulse = ({ color, pulseColor, size }) => {
  return (
    <>
      <g transform="translate(-50, -50)">
        <svg height="100px" width="100px">
          <circle
            style={{ stroke: pulseColor, strokeWidth: `${size*.2}px` }}
            className="circle-pulse"
            cx="50%"
            cy="50%"
            r={`${size}px`}
            fill={color}
          />
          <circle
            style={{ stroke: pulseColor, strokeWidth: "2px" }}
            className="circle-pulse pulse"
            cx="50%"
            cy="50%"
            r={`${size+5}px`}
          />
        </svg>
      </g>
    </>
  );
};

export default CirclePulse;

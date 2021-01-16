import React from "react";

import "./CircleLive.css";

const CircleLive = ({ color, size }) => {
  return (
    <>
      <g transform="translate(-50, -50)">
        <svg height="25px" width="25px">
          <circle
            style={{ fill: color }}
            className="circle-live live"
            cx="50%"
            cy="50%"
            r={`${size}px`}
          />
        </svg>
      </g>
    </>
  );
};

CircleLive.defaultProps = {
  color: "red",
  size: 20
}

export default CircleLive;

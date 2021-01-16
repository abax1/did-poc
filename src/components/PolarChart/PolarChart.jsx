import React, { useState } from "react";
import {
  VictoryChart,
  VictoryStack,
  VictoryPolarAxis,
  VictoryBar,
  VictoryZoomContainer
} from "victory";

const sampleDataPolar = [50, 100, 80, 30, 200, 300, 600, 150, 700, 900];
const sampleDataPolar2 = [1, 2, 3, 4, 5];
const sampleDataPolar3 = [20, 120, 80, 30, 300, 800, 300, 250, 900, 700];

const colorScale1 = ["#5C255C", "#752F75", "#8F398F"];
const colorScale2 = ["#5642A6", "#634DBF", "#7157D9"];
const colorScale3 = ["#1F4B99", "#2458B3", "#2965CC"];
const colorScale4 = ["#008075", "#00998C", "#00B3A4"];
const colorScale5 = ["#728C23", "#87A629", "#9BBF30"];
const colorScale6 = ["#A67908", "#BF8C0A", "#D99E0B"];

function getColorScale(colorScale) {
  switch (colorScale) {
    case 1:
      return colorScale1;
    case 2:
      return colorScale2;
    case 3:
      return colorScale3;
    case 4:
      return colorScale4;
    case 5:
      return colorScale5;
    case 6:
       return colorScale6;
    default:
      return colorScale1;
  }
}

function PolarChart({ colorScale }) {
  const [values, setVaules] = useState({});
  return (
    <div>
      <VictoryChart
        polar
        domain={{ x: [0, 4] }}
        height={400}
        width={400}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryPolarAxis
          dependentAxis
          style={{
            axis: { stroke: "none" },
            tickLabels: { fill: "none" },
            grid: { stroke: "grey", strokeDasharray: "4, 8" }
          }}
        />
        <VictoryPolarAxis tickValues={[0, 1, 2, 3, 4, 5, 6]} />
        <VictoryStack
          animate={{ duration: 500 }}
          colorScale={getColorScale(colorScale)}
          style={{ data: { width: 50 } }}
        >
          <VictoryBar data={sampleDataPolar2} />
          <VictoryBar data={sampleDataPolar2} />
          <VictoryBar data={sampleDataPolar2} />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
}

export default PolarChart;

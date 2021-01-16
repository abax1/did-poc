import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  VictoryChart,
  VictoryArea,
  VictoryStack,
  VictoryTheme,
  VictoryContainer,
  VictoryLabel
} from "victory";
import { H3 } from "@blueprintjs/core";
import { chartTheme, lightChartTheme } from "../../VictoryChartSettings/theme"

const purpleColourScale = [
  "#5642A6",
  "#634DBF",
  "#7157D9",
  "#9179F2",
  "#AD99FF"
];

const roseColourScale = ["#A82255", "#C22762", "#DB2C6F", "#F5498B", "#FF66A1"];

function AreaChart(props) {
  return (
    <div>
      <H3>Transactions / Month</H3>
      <VictoryChart
      theme={props.darkTheme? chartTheme : lightChartTheme}
        height={props.height} width={props.width}
        animate={{ duration: 800 }}
        containerComponent={<VictoryContainer responsive={true} />}
      >
        <VictoryStack colorScale={roseColourScale}>
          <VictoryArea
            data={[
              { x: "Jan", y: 2 },
              { x: "Feb", y: 3 },
              { x: "Mar", y: 5 },
              { x: "Apr", y: 4 },
              { x: "May", y: 6 }
            ]}
            interpolation={"basis"}
          />
          <VictoryArea
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 6 }
            ]}
            interpolation={"basis"}
          />
          <VictoryArea
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 6 }
            ]}
            interpolation={"basis"}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    darkTheme: state.mainReducer.darkTheme
  }
};

const mapDispatchToProps = dispatch => {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AreaChart)
);

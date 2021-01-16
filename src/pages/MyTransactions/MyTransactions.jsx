import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Elevation } from "@blueprintjs/core";
import TxTable from "../../components/TxTable/TxTable";
import "./MyTransactions.css";
import { getMe } from "../../actions/peersActionCreators";
import NodeMap from "../../components/Maps/NodeMap";
import FadeIn from "../../components/Transitions/FadeIn";
import UKMap from "../../components/Maps/UKMap";
import { getTransactions } from "../../actions/actionCreators";


function MyTransactions({ getTransactions }) {
  
  useEffect(() => {
    getTransactions();
  }, []);


  return (
    <FadeIn>
      <div id="peers-container">
        <div className="peers-full-width">
          <TxTable />
        </div>
      </div>
      <UKMap width={"100%"}/>
      <NodeMap />
    </FadeIn>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: () => getTransactions(dispatch)
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MyTransactions)
);

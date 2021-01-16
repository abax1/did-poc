import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Card,
  Elevation,
  Icon,
  Callout,
  Intent,
} from "@blueprintjs/core";
import { getTransactions } from "../../actions/actionCreators";
import TxTable from "../../components/TxTable/TxTable";

import "./Wallet.css";
import AreaChart from "../../components/AreaChart/AreaChart";
import Helpers from "../../components/Helpers/Helpers";
import FadeIn from "../../components/Transitions/FadeIn";

const elevation = Elevation.THREE;

const MARGIN_TOP = "0px";


// eslint-disable-next-line
function Wallet({ getTransactions, transactions }) {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(""); // set this to "bp3-skeleton" to show loading

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <FadeIn>
      <div class="grid-container">
        <div class="grid-item1">
          <Card interactive={false} elevation={elevation}>
            <AreaChart height={343} width={900} />
          </Card>
        </div>
        <div class="grid-item2">
          <Card interactive={false} elevation={elevation}>
            <div className={`${loading} balance-dash-item`}>
              <Icon icon="euro" iconSize={40} />
            </div>
            <h2 className={`${loading} balance-dash-item`}>Balance</h2>
            <h2 className={`${loading} balance-dash-item`}>0</h2>
            <Helpers
              style={{ marginTop: MARGIN_TOP }}
              title="Total Balance"
              intent={Intent.PRIMARY}
            >
              The total balance for the device owner is shown here.
            </Helpers>
          </Card>
          <Card
            style={{ marginTop: "10px" }}
            interactive={false}
            elevation={elevation}
          >
            <Callout title="Wallet Dashboard" intent={Intent.PRIMARY}>
              The wallet dashboard displays all the information relating to a
              device owner's balance, transaction logs,...
            </Callout>
            <Helpers
              style={{ marginTop: "5px" }}
              title="Under Construction"
              intent={Intent.WARNING}
            >
              The wallet dashboard is under development.
            </Helpers>
          </Card>
        </div>
        <div class="grid-item-table">
          <TxTable data={transactions} />
        </div>
      </div>
    </FadeIn>
  );
}

const mapStateToProps = state => {
  return {
    transactions: state.mainReducer.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: () => {
      getTransactions(dispatch);
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wallet)
);

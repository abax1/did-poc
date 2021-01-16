import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Elevation, H4 } from "@blueprintjs/core";

import "./Wallet.css";
import AccountsTable from "../../components/AccountsTable/AccountsTable";
import UKMap from "../../components/Maps/UKMap";

const elevation = Elevation.THREE;

const MARGIN_TOP = "0px";

const data = [
  { x: 1, y: 2, y0: 0 },
  { x: 2, y: 3, y0: 1 },
  { x: 3, y: 5, y0: 1 },
  { x: 4, y: 4, y0: 2 },
  { x: 5, y: 6, y0: 2 }
];

// [
//   { x: 1, y: 50 },
//   { x: 2, y: 10 },
//   { x: 3, y: 34 },
//   { x: 4, y: 100 },
//   { x: 5, y: 90}
// ];

// eslint-disable-next-line
function Accounts({ theme, accounts }) {
  // eslint-disable-next-line
  const [values, setVaules] = useState({});
  const [loading, setLoading] = useState(""); // set this to "bp3-skeleton" to show loading

  return (
    <div class="grid-container">
      <div class="grid-item-table">
        <AccountsTable theme={theme} />
        <UKMap width={"100%"} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    accounts: state.mainReducer.accounts
  };
};

const mapDispatchToProps = dispatch => {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Accounts)
);

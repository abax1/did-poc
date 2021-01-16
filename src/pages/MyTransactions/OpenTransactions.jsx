import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MyTransactions.css";
import { getMe } from "../../actions/peersActionCreators";
import FadeIn from "../../components/Transitions/FadeIn";
import UKMap from "../../components/Maps/UKMap";
import { getOpenTransactions, getAccounts } from "../../actions/actionCreators";
import OpenTxTable from "../../components/TxTable/OpenTxTable";

function OpenTransactions({
  getMe,
  me,
  accounts,
  getAccounts,
  getOpenTransactions,
  locations,
  annotations
}) {
  const [loading, setLoading] = useState(""); // set this to "bp3-skeleton" to show loading
  const [filterByAccountUuid, setFilterByAccountUuid] = useState("");

  useEffect(() => {
    getMe();
    getAccounts();
  }, []);

  useEffect(() => {
    getOpenTransactions(filterByAccountUuid);
  }, [filterByAccountUuid]);

  useEffect(() => {
    me.length === 0 ? setLoading("bp3-skeleton") : setLoading("");
  }, [me.length]);

  return (
    <FadeIn>
      <div id="peers-container">
        <div className="peers-full-width">
          <OpenTxTable accounts={accounts} setAccount={setFilterByAccountUuid}/>
        </div>
      </div>
      <UKMap width={"100%"} locations={locations} annotate={annotations} />
    </FadeIn>
  );
}

const mapStateToProps = state => {
  return {
    me: state.peersReducer.me,
    locations: state.mainReducer.openSessions,
    annotations: state.mainReducer.mapAnnotations,
    accounts: state.mainReducer.accounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => getMe(dispatch),
    getOpenTransactions: uuid => getOpenTransactions(dispatch, uuid),
    getAccounts: () => getAccounts(dispatch)
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpenTransactions)
);

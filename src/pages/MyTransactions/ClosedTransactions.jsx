import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MyTransactions.css";
import { getMe } from "../../actions/peersActionCreators";
import FadeIn from "../../components/Transitions/FadeIn";
import UKMap from "../../components/Maps/UKMap";
import { getClosedTransactions, getAccounts } from "../../actions/actionCreators";
import ClosedTxTable from "../../components/TxTable/ClosedTxTable";

function ClosedTransactions({ accounts, getMe, me, getClosedTransactions, locations, annotations }) {
  const [loading, setLoading] = useState(""); // set this to "bp3-skeleton" to show loading
  const [filterByAccountUuid, setFilterByAccountUuid] = useState("");

  useEffect(() => {
    getMe();
    getAccounts();
  }, []);

  useEffect(() => {
    getClosedTransactions(filterByAccountUuid);
  }, [filterByAccountUuid]);


  useEffect(() => {
    me.length === 0 ? setLoading("bp3-skeleton") : setLoading("");
  }, [me.length]);

  return (
    <FadeIn>
      <div id="peers-container">
        <div className="peers-full-width">
          <ClosedTxTable accounts={accounts} setAccount={setFilterByAccountUuid}/>
        </div>
      </div>
      <UKMap width={"100%"} locations={locations} annotate={annotations}/>
    </FadeIn>
  );
}

const mapStateToProps = state => {
  return {
    me: state.peersReducer.me,
    locations: state.mainReducer.closedSessions,
    annotations: state.mainReducer.mapAnnotations,
    accounts: state.mainReducer.accounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => getMe(dispatch),
    getClosedTransactions: (uuid) => getClosedTransactions(dispatch, uuid),
    getAccounts: () => getAccounts(dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClosedTransactions)
);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Card, Elevation, Icon } from "@blueprintjs/core";
import { getClosedTransactions, getOpenTransactions } from "../../actions/actionCreators";
import { getMe } from "../../actions/peersActionCreators";
import FadeIn from "../../components/Transitions/FadeIn";
import "./Dashboard.css";
import PolarChart from "../../components/PolarChart/PolarChart";
import UKMap from "../../components/Maps/UKMap";
import CircleLive from "../../components/Maps/CircleLive";

const elevation = Elevation.TWO;

function Dashboard({
  getMe,
  locations,
  isLoading,
  closedSessions,
  openSessions,
  getClosedTransactions,
  getOpenTransactions
}) {
  // eslint-disable-next-line
  const loadingEffect = isLoading ? "bp3-skeleton" : "";

  useEffect(() => {
    getMe();
    getClosedTransactions();
    getOpenTransactions("");
  }, [getMe, getClosedTransactions, getOpenTransactions]);

  return (
    <>
      <FadeIn>
        <div id="container">
          <div className="col-1">
            <Card interactive={false} elevation={elevation}>
            <div className={`${loadingEffect} dash-item`}>
                <CircleLive color={"red"} size={12}/>
              </div>
              <h2 className={`${loadingEffect} dash-item`}>
                Total In Progress Parking Sessions
              </h2>
              <h2 className={`${loadingEffect} dash-item`}>
                {openSessions &&
                  openSessions.length}
              </h2>
            </Card>
          </div>
          <div className="col-2">
            <Card interactive={false} elevation={elevation}>
              <div className={`${loadingEffect} dash-item`}>
                <Icon icon="known-vehicle" iconSize={24} color="lightgreen"/>
              </div>
              <h2 className={`${loadingEffect} dash-item`}>
                Total Completed Parking Sessions
              </h2>
              <h2 className={`${loadingEffect} dash-item`}>
                {closedSessions &&
                  closedSessions.length}
              </h2>
            </Card>
          </div>
        </div>
        <div id="container">
          <div className="row-2-col-1">
            <Card interactive={false} elevation={elevation}>
            <h2>In Progress Parking Sessions Map</h2>
              <h5>Transactions heatmap: EN</h5>

              <UKMap locations={openSessions} annotate={false} color={"red"}/>
            </Card>
          </div>
          <div className="row-2-col-2">
            <Card interactive={false} elevation={elevation}>
              <h2>Completed Parking Sessions Map</h2>
              <h5>Transactions heatmap: EN</h5>

              <UKMap locations={closedSessions} annotate={false} color={"green"}/>
            </Card>
          </div>
        </div>
      </FadeIn>
    </>
  );
}

const mapStateToProps = state => {
  // Check if we need to show a loading effect
  let isLoading = true;
  if (/*state.peersReducer.me.balance*/true) {
    isLoading = false;
  }

  return {
    isLoading,
    closedSessions: state.mainReducer.closedSessions,
    openSessions: state.mainReducer.openSessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => {
      getMe(dispatch);
    },
    getClosedTransactions: () => {
      getClosedTransactions(dispatch);
    },
    getOpenTransactions: (uuid) => {
      getOpenTransactions(dispatch, uuid);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Elevation, Icon, Code, Intent, Text } from "@blueprintjs/core";
import TxTable from "../../components/TxTable/TxTable";
import "./Peers.css";
import PeersTable from "../../components/PeersTable/PeersTable";
import { getMe } from "../../actions/peersActionCreators";
import Helpers from "../../components/Helpers/Helpers";
import NodeMap from "../../components/Maps/NodeMap";
import CircleLive from "../../components/Maps/CircleLive";
import FadeIn from "../../components/Transitions/FadeIn";

const elevation = Elevation.THREE;

function Peers({ getMe, me }) {
  const [loading, setLoading] = useState(""); // set this to "bp3-skeleton" to show loading

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    me.length === 0 ? setLoading("bp3-skeleton") : setLoading("");
  }, [me.length]);

  return (
    <FadeIn>
      <div id="peers-container">
        <div className="peers-col-1">
          <FadeIn>
            <Card interactive={false} elevation={elevation}>
              <div className={`${loading} peers-dash-item`}>
                <Icon icon="id-number" iconSize={40} />
              </div>
              <h2 className={`${loading} peers-dash-item`}>Who Am I?</h2>
              <p className={`${loading} peers-dash-item`}>{me.host.name}</p>
              <p className={`${loading} peers-dash-item`}>
                Registered: {me.host.registered}
              </p>
              <p className={`${loading} peers-dash-item`}>
                <Text ellipsize>Key: {me.host.key}</Text>
              </p>
              <p className={`${loading} peers-dash-item`}>
                <Text ellipsize>
                  Status: Active{" "}
                  <span>
                    <CircleLive size={7} color={"green"} />
                  </span>
                </Text>
              </p>
              <Helpers
                style={{
                  marginBottom: "5px",
                  marginTop: "10px"
                }}
                title="Transaction Table"
                intent={Intent.PRIMARY}
              >
                This card displays information about your <Code>node</Code>.
              </Helpers>
            </Card>
          </FadeIn>
        </div>
        <div className="peers-col-2">
          <PeersTable />
        </div>
      </div>
      <FadeIn>
        <NodeMap />
      </FadeIn>
    </FadeIn>
  );
}

const mapStateToProps = state => {
  return {
    me: state.peersReducer.me
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => getMe(dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Peers));

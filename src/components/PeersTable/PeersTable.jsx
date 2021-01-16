// eslint-disable-next-line
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Elevation, Icon, Intent, Code, H5 } from "@blueprintjs/core";
import { openPopup } from "../../actions/popupActionCreators";
import { getPeers } from "../../actions/peersActionCreators";
import Helpers from "../Helpers/Helpers";
import "../../App.css";
import FadeIn from "../Transitions/FadeIn";
import "./Peers.css";

function PeersTable({ message, peers, network, getPeers, openPopup }) {

  useEffect(() => {
    getPeers();
  }, [getPeers]);

  return (
    <FadeIn>
      <Card
        style={{ minHeight: "262px" }}
        interactive={false}
        elevation={Elevation.THREE}
      >
        <H5>{message}</H5>

        <div className="peers-container">
          <div className="peers-left-col">
            <h2>
              Peers
              <span
                className="help-icon"
                onClick={() => {
                  openPopup(
                    <div>
                      <h3>Peers</h3>
                      <p>
                        The <Code>Peers Table</Code> shows all the
                        available/visible Corda Nodes on the network.
                      </p>
                    </div>
                  );
                }}
              >
                <sup>
                  <Icon icon="help" iconSize={10} intent={Intent.PRIMARY} />
                </sup>
              </span>
            </h2>
            {peers && (
              <table className="bp3-html-table bp3-html-table-condensed bp3-html-table-striped">
                <thead>
                  <tr>
                    <th>Host Name</th>
                  </tr>
                </thead>
                <tbody>
                  {peers.map(i => (
                    <tr>
                      <td>{i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="peers-right-col">
            <h2>
              Network
              <span
                className="help-icon"
                onClick={() => {
                  openPopup(
                    <div>
                      <h3>Network</h3>
                      <p>
                        The <Code>Network Table</Code> shows all the
                        available/visible Corda Nodes on the network.
                      </p>
                    </div>
                  );
                }}
              >
                <sup>
                  <Icon icon="help" iconSize={10} intent={Intent.PRIMARY} />
                </sup>
              </span>
            </h2>
            {network && (
              <table class="bp3-html-table bp3-html-table-condensed bp3-html-table-striped">
                <thead>
                  <tr>
                    <th>Host Name</th>
                  </tr>
                </thead>
                <tbody>
                  {network.map(i => (
                    <tr>
                      <td>{i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <Helpers
          style={{ marginBottom: "5px", marginTop: "10px", maxWidth: "30rem" }}
          title="Peers Table"
          intent={Intent.PRIMARY}
        >
          This table displays all of the available peer <Code>Node</Code>s on
          the network.
        </Helpers>
      </Card>
    </FadeIn>
  );
}

const mapStateToProps = state => {
  console.log("PEERS: ", state.peersReducer.peers);

  return {
    peers: state.peersReducer.peers.peers,
    network: state.peersReducer.peers.network,
    message: state.peersReducer.peers.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPeers: () => getPeers(dispatch),
    openPopup: payload => dispatch(openPopup(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PeersTable);

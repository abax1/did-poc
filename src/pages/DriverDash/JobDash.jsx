import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Card,
  FormGroup,
  InputGroup,
  Popover,
  Position,
  Button,
  Menu,
  Classes,
  H2,
  H5,
  NumericInput,
  Spinner,
  HTMLTable,
} from "@blueprintjs/core";
import "./DriverDash.css";
import {
  getAvailableConsignments,
  sendConsignment,
  getConsolidatedCollections,
  sendDriverCollection,
  createWallet,
} from "../../actions/actionCreators";
import {
  counterParty,
  oilType,
  ghgType,
  certType,
  driverList,
  restaurantList,
  jobIdList,
  driverLat,
  driverLong,
} from "../../constants";
import { AppToaster } from "../../components/AppToaster/AppToaster";
import FadeIn from "../../components/Transitions/FadeIn";
import sig from "../../sig.png";

const displayToaster = (intent, message) => {
  AppToaster.show({
    icon: intent === "danger" ? "error" : "info-sign",
    message: message,
    intent: intent,
  });
};

const TraderMenu = ({ setName }) => {
  return (
    <Menu>
      <Menu.Item text={counterParty} onClick={() => setName(counterParty)} />
    </Menu>
  );
};

const handleKeyDown = (e) => {
  console.log("keydown", e.keyCode);
  if (e.keyCode == 69 || e.keyCode == 189 /* '-' key */) {
    // ignore the keystroke
    e.preventDefault();
  }
};

const getAvailableQuantity = (items, id) => {
  var quantity = 0;
  if (items.length !== 0) {
    let found = items.find((item) => item.Consignment_id === id);
    //console.log("FOUND: ", found)
    if (found) {
      quantity = parseInt(found.Quantity);
    }
  }
  //console.log("Avail Q: ", quantity)
  return quantity;
};

const doNothing = () => {};

function JobDash({
  sendDriverCollection,
  consolidatedCollections,
  getConsolidatedCollections,
  history,
  match,
  createWallet
}) {
  let { id } = match.params;
  //console.log("ID: ", id);
  const [to, setTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [litres, setLitres] = useState(0);
  const [consignmentId, setConsignmentId] = useState("");
  const [feedstock, setFeedstock] = useState("UCO");
  const [ghg, setGhg] = useState(ghgType[0]);
  const [cert, setCert] = useState(certType[0]);
  const [country, setCountry] = useState("UK");
  const [sendParams, setSendParams] = useState({
    consignmentId,
    address,
    to,
    litres,
    feedstock,
    ghg,
    cert,
    country,
  });

  useEffect(() => {
    getConsolidatedCollections(doNothing, doNothing, id);
  }, [id]);

  const submit = () => {
    setSendParams({
      consignmentId,
      address,
      to,
      litres,
      feedstock,
      ghg,
      cert,
      country,
    });
  };

  const ConsignmentMenu = ({ items, setName }) => {
    return (
      <Menu>
        {items.map((item) => {
          return (
            <Menu.Item
              text={item.Consignment_id}
              onClick={() => setName(item.Consignment_id)}
            />
          );
        })}
      </Menu>
    );
  };

  const ConstantsMenu = ({ items, setName }) => {
    return (
      <Menu>
        {items.map((item) => {
          return <Menu.Item text={item} onClick={() => setName(item)} />;
        })}
      </Menu>
    );
  };

  //useEffect(() => {
  //  getAvailableConsignments(doNothing, doNothing, feedstock);
  //}, [feedstock]);

  return (
    <FadeIn>
      <div className="mobile-container">
        {isLoading === false ? (
          <>
            <div className="mobile-title">
              <H2>Collector A Bioledger</H2>
            </div>
            <div className={Classes.DRAWER_BODY}>
              <div className={Classes.DIALOG_BODY}>
                <HTMLTable
                  striped
                  condensed
                  style={{ minWidth: "100%", maxWidth: "100vw" }}
                >
                  <thead>
                    <tr>
                      <th>Oil Type</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>UCO</td>
                      <td>
                        {"UCO" in consolidatedCollections
                          ? consolidatedCollections.UCO
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td>UCO VEG</td>
                      <td>
                        {"UCO_VEG" in consolidatedCollections
                          ? consolidatedCollections.UCO_VEG
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td>UCO MIX</td>
                      <td>
                        {"UCO_MIX" in consolidatedCollections
                          ? consolidatedCollections.UCO_MIX
                          : 0}
                      </td>
                    </tr>
                    <tr>
                      <td>Foodwaste</td>
                      <td>
                        {"Foodwaste" in consolidatedCollections
                          ? consolidatedCollections.Foodwaste
                          : 0}
                      </td>
                    </tr>
                  </tbody>
                </HTMLTable>
                <hr />
                <H5>Total: {consolidatedCollections.totalCollection}</H5>



                <div className={Classes.DRAWER_FOOTER}>
                  <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <button
                      className="bio-button"
                      style={{ margin: "2px" }}
                      onClick={() => history.push("/driver-dash")}
                    >
                      Go Back
                    </button>
                    <button
                      className="bio-button"
                      style={{ margin: "2px" }}
                      onClick={() =>{
                        setIsLoading(true)
                        createWallet(()=>{
                          setIsLoading(false)
                        },
                        displayToaster,
                        id,
                        driverLat,
                        driverLong,
                        "UK")
                      }}
                    >
                      Submit Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Spinner className="mobile-spinner" size={200} />
        )}
      </div>
    </FadeIn>
  );
}

const mapStateToProps = (state) => {
  return {
    availableConsignments: state.mainReducer.availableConsignments,
    consolidatedCollections: state.mainReducer.consolidatedCollections,
    jobs: state.mainReducer.jobs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableConsignments: (callback, displayToast, walletType) =>
      getAvailableConsignments(callback, displayToast, walletType, dispatch),
    getConsolidatedCollections: (callback, displayToast, jobId) =>
      getConsolidatedCollections(callback, displayToast, jobId, dispatch),
    createWallet: (callback, displayToast, jobId, lat, long, country) =>
      createWallet(callback, displayToast, jobId, lat, long, country),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JobDash)
);

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
  NumericInput,
  Spinner,
  TextArea,
  Intent,
} from "@blueprintjs/core";
import "./DriverDash.css";
import {
  getAvailableConsignments,
  sendConsignment,
  getConsolidatedCollections,
  sendDriverCollection,
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
import sigLogo from "../../sig.png";
import emptySig from "../../empty_sig.png";

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

function DriverDash({
  availableConsignments,
  getAvailableConsignments,
  consolidatedCollections,
  getConsolidatedCollections,
  sendDriverCollection,
  history,
}) {
  const [jobId, setJobId] = useState("");
  const [driver, setDriver] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [oilCat, setOilCat] = useState("");
  const [volume, setVolume] = useState(0);
  const [to, setTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [consignment, setConsignment] = useState("");
  const [litres, setLitres] = useState(0);
  const [consignmentId, setConsignmentId] = useState("");
  const [feedstock, setFeedstock] = useState("UCO");
  const [ghg, setGhg] = useState(ghgType[0]);
  const [cert, setCert] = useState(certType[0]);
  const [country, setCountry] = useState("UK");
  const [sig, setSig] = useState(false);
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
                <FormGroup label="Driver ID" labelInfo="(required)">
                  <InputGroup
                    disabled={isLoading}
                    placeholder="Select driver id..."
                    value={driver}
                    readOnly
                    rightElement={
                      <Popover
                        position={Position.LEFT_BOTTOM}
                        content={
                          <ConstantsMenu
                            items={driverList}
                            setName={setDriver}
                          />
                        }
                      >
                        <Button text="Select" />
                      </Popover>
                    }
                  />
                </FormGroup>
                <FormGroup label="Restaurant ID" labelInfo="(required)">
                  <InputGroup
                    disabled={isLoading}
                    placeholder="Select restaurant id..."
                    value={restaurant}
                    readOnly
                    rightElement={
                      <Popover
                        position={Position.LEFT_BOTTOM}
                        content={
                          <ConstantsMenu
                            items={restaurantList}
                            setName={setRestaurant}
                          />
                        }
                      >
                        <Button text="Select" />
                      </Popover>
                    }
                  />
                </FormGroup>
                <FormGroup label="Job ID" labelInfo="(required)">
                  <InputGroup
                    disabled={isLoading}
                    placeholder="Select job id..."
                    value={jobId}
                    onChange={(e)=>{
                      setJobId(e.target.value)
                    }}
                  />
                </FormGroup>
                <FormGroup label="Oil Type" labelInfo="(required)">
                  <InputGroup
                    disabled={isLoading}
                    placeholder="Select oil type..."
                    value={oilCat}
                    readOnly
                    rightElement={
                      <Popover
                        position={Position.LEFT_BOTTOM}
                        content={
                          <ConstantsMenu items={oilType} setName={setOilCat} />
                        }
                      >
                        <Button text="Select" />
                      </Popover>
                    }
                  />
                </FormGroup>
                <FormGroup label="Volume Collected" labelInfo="(required)">
                  <NumericInput
                    min={0}
                    minorStepSize={0.5}
                    allowNumericCharactersOnly
                    stepSize={1}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Enter collected volume..."
                    value={volume}
                    onValueChange={setVolume}
                  />
                </FormGroup>

                <Card>
                  <img
                    //className="pointer"
                    onClick={() => {
                      //props.history.push("/");
                      setSig(!sig)
                    }}
                    src={sig === true ? sigLogo : emptySig}
                    alt="signature"
                    height="50"
                    width="150"
                  />
                </Card>
                <Button
                  style={{ margin: "2px" }}
                  minimal
                  intent="success"
                  icon="camera"
                >
                  Take Photo
                </Button>
                <div>
                <TextArea
                  style={{width: "100%"}}
                  growVertically={true}
                  large={true}
                  intent={Intent.PRIMARY}
                  value="Notes here..."
                />
                </div>
                <div className={Classes.DRAWER_FOOTER}>
                  <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <button
                      className="my-button"
                      style={{ width: "100%" }}
                      onClick={() => {
                        sendDriverCollection(
                          () => {
                            setIsLoading(false);
                            history.push(`/job-dash/${jobId}`);
                          },
                          displayToaster,
                          driver,
                          restaurant,
                          jobId,
                          driverLat,
                          driverLong,
                          volume,
                          oilCat
                        );
                        setIsLoading(true);
                      }}
                    >
                      Submit
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableConsignments: (callback, displayToast, walletType) =>
      getAvailableConsignments(callback, displayToast, walletType, dispatch),
    getConsolidatedCollections: (callback, displayToast, jobId) =>
      getConsolidatedCollections(callback, displayToast, jobId, dispatch),
    sendDriverCollection: (
      callback,
      displayToast,
      driverId,
      restaurantId,
      jobId,
      lat,
      long,
      volume,
      oilCat
    ) =>
      sendDriverCollection(
        callback,
        displayToast,
        driverId,
        restaurantId,
        jobId,
        lat,
        long,
        volume,
        oilCat
      ),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DriverDash)
);

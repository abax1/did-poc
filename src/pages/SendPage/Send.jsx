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
} from "@blueprintjs/core";
import "./Send.css";
import {
  getAvailableConsignments,
  sendConsignment,
} from "../../actions/actionCreators";
import { counterParty, oilType, ghgType, certType } from "../../constants";
import { AppToaster } from "../../components/AppToaster/AppToaster";
import FadeIn from "../../components/Transitions/FadeIn";

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
  var quantity = 0
  if( items.length !== 0 ){
    let found = items.find(item => item.Consignment_id === id)
    //console.log("FOUND: ", found)
    if(found){
      quantity = parseInt(found.Quantity)
    }
  }
  //console.log("Avail Q: ", quantity)
  return quantity
}

const doNothing = () => {};

function Send({ availableConsignments, getAvailableConsignments }) {
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

  useEffect(() => {
    getAvailableConsignments(doNothing, doNothing, feedstock);
  }, [feedstock]);

  return (
    <FadeIn>
      <Card className="send-container" elevation={2}>
        {isLoading === false ? (
          <>
            <H2>Send Consignment</H2>
            <FormGroup label="Recipient" labelInfo="(required)">
              <InputGroup
                disabled={isLoading}
                placeholder="Select receipient name..."
                value={to}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={<TraderMenu setName={setTo} />}
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup label="Address" labelInfo="(required)">
              <InputGroup
                disabled={isLoading}
                placeholder="Enter address..."
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  //setValidation({ ...validation, name: e.target.value != "" });
                }}
              />
            </FormGroup>
            <FormGroup label="Feedstock" labelInfo="(required)">
              <InputGroup
                disabled={isLoading}
                placeholder="Select feedstock..."
                value={feedstock}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={
                      <ConstantsMenu items={oilType} setName={setFeedstock} />
                    }
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup label="Consignment ID" labelInfo="(required)">
              <InputGroup
                disabled={isLoading}
                placeholder="Select consignment ID..."
                value={consignmentId}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={
                      <ConsignmentMenu
                        items={availableConsignments}
                        setName={setConsignmentId}
                      />
                    }
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup label="GHG" labelInfo="(required)">
              <InputGroup
                disabled={isLoading}
                placeholder="Select GHG..."
                value={ghg}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={<ConstantsMenu items={ghgType} setName={setGhg} />}
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup label="Certification" labelInfo="(required)">
              <InputGroup
                disabled={isLoading}
                placeholder="Select certification..."
                value={cert}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={
                      <ConstantsMenu items={certType} setName={setCert} />
                    }
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup label="Country" labelInfo="(required)">
              <InputGroup
                disabled={isLoading}
                placeholder="Enter country..."
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  //setValidation({ ...validation, name: e.target.value != "" });
                }}
              />
            </FormGroup>
            <FormGroup 
            label="Litres" 
            labelInfo="(required)"
            helperText={`Available quantity ${
              getAvailableQuantity(availableConsignments, consignmentId)
            }`}
            >
              <NumericInput
                min={0}
                max={getAvailableQuantity(availableConsignments, consignmentId)}
                disabled={isLoading}
                allowNumericCharactersOnly={true}
                onKeyDown={handleKeyDown}
                value={litres}
                onValueChange={(val, strVal) => {
                  console.log(val, strVal, litres);
                  setLitres(isNaN(strVal) ? 0 : val);
                }}
              />
            </FormGroup>

            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <button
                className="my-button"
                style={{ width: "100%" }}
                onClick={() => {
                  sendConsignment(()=>{
                    getAvailableConsignments(doNothing, doNothing, feedstock)
                    setIsLoading(false)
                  }, 
                  displayToaster, {
                    consignmentId,
                    address,
                    to,
                    litres,
                    feedstock,
                    ghg,
                    cert,
                    country,
                  });
                  setIsLoading(true)
                }}
              >
                Send Consignment
              </button>
            </div>
          </>
        ) : (
          <Spinner className="send-spinner" size={200}/>
        )}
      </Card>
    </FadeIn>
  );
}

const mapStateToProps = (state) => {
  return {
    availableConsignments: state.mainReducer.availableConsignments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableConsignments: (callback, displayToast, walletType) =>
      getAvailableConsignments(callback, displayToast, walletType, dispatch),
    sendConsignment: (callback, displayToast, sendParams) =>
      sendConsignment(callback, displayToast, sendParams, dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Send));

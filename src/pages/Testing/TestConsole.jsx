import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Card,
  Menu,
  Popover,
  Button,
  Position,
  InputGroup,
  Label,
  H4,
  H5,
  FormGroup,
  Icon,
  RadioGroup,
  Radio,
  Spinner,
  NumericInput
} from "@blueprintjs/core";
import FadeIn from "../../components/Transitions/FadeIn";
import { nodeType } from "../../constants";
import "./TestConsole.css";
import {
  getAccounts,
  sendStartSession,
  sendEndSession
} from "../../actions/actionCreators";
import { getMe, getPeers } from "../../actions/peersActionCreators";

const AccountsMenu = ({ accounts, setValues }) => {
  return (
    <Menu>
      {accounts &&
        accounts.map(i => (
          <Menu.Item
            text={`${i.name}`}
            onClick={e => {
              setValues(state => ({
                ...state,
                sourceAccountName: i.name,
                sourceUUID: i.uuid
              }));
            }}
          />
        ))}
    </Menu>
  );
};

const PeersMenu = ({ peers, setValues }) => {
  return (
    <Menu>
      {peers &&
        peers.peers.map((item, key) => (
          <Menu.Item
            text={`${item}`}
            onClick={e => {
              console.log("target host", item);
              setValues(state => ({ ...state, targetHostName: item }));
            }}
          />
        ))}
    </Menu>
  );
};

const StartSession = ({
  loading,
  setLoading,
  testType,
  setTestType,
  accounts,
  peers,
  values,
  setValues,
  testValidation,
  startSession
}) => {
  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <H4>
        Start Test Parking Session
        <span>
          <Icon
            style={{ float: "right" }}
            icon="dashboard"
            iconSize={30}
            intent="primary"
          />
        </span>
      </H4>

      <FormGroup
        helperText="Select the car park account..."
        label="Car Park Account"
        labelInfo="(required)"
      >
        <InputGroup
          disabled={false}
          placeholder="Select car park account..."
          value={values.sourceAccountName}
          rightElement={
            <Popover
              position={Position.LEFT_BOTTOM}
              content={
                <AccountsMenu accounts={accounts} setValues={setValues} />
              }
            >
              <Button>Select account</Button>
            </Popover>
          }
          onChange={e => {
            setValues(state => ({
              ...state,
              sourceAccountName: e.target.value
            }));
          }}
        />
      </FormGroup>
      <FormGroup
        helperText="Select the remote peer node e.g. CarFleet..."
        label="Car Host"
        labelInfo="(required)"
      >
        <InputGroup
          disabled={false}
          placeholder="Select car host..."
          value={values.targetHostName}
          rightElement={
            <Popover
              position={Position.LEFT_BOTTOM}
              content={<PeersMenu peers={peers} setValues={setValues} />}
            >
              <Button>Select host</Button>
            </Popover>
          }
          onChange={e => {
            setValues(state => ({ ...state, targetHostName: e.target.value }));
          }}
        />
      </FormGroup>
      <FormGroup
        helperText="Enter car account UUID..."
        label="Car Account UUID"
        labelInfo="(required)"
        labelFor="target-uuid"
      >
        <InputGroup
          id="target-uuid"
          type={"text"}
          disabled={false}
          placeholder="Enter car account uuid..."
          value={values.targetUUID}
          onChange={e => {
            setValues(state => ({ ...state, targetUUID: e.target.value }));
          }}
        />
      </FormGroup>

      <RadioGroup
        label="Test Type"
        inline={true}
        onChange={e => setTestType(e.target.value)}
        selectedValue={testType}
      >
        <Radio large={true} label="Happy Path" value="happy" />
        <Radio large={true} label="GPS Proximity Fail" value="fail" />
      </RadioGroup>

      <Button
        loading={loading}
        disabled={testValidation()}
        fill
        intent="success"
        icon="play"
        onClick={() => {
          setLoading(true);
          startSession(values, testType);
        }}
      >
        Run
      </Button>
    </div>
  );
};

const StartResults = ({ loading, data }) => {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        paddingLeft: "20px",
        paddingRight: "20px"
      }}
    >
      <H4>
        Results{" "}
        <span>
          <Icon
            style={{ float: "right" }}
            icon="form"
            iconSize={30}
            intent="success"
          />
        </span>
      </H4>
      {loading === true ? (
        <div style={{ transform: "translateY(8rem)" }}>
          <Spinner size={100} intent="danger" />
        </div>
      ) : (
        data && (
          <>
            <table
              width="100%"
              className="bp3-html-table bp3-html-table-striped"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  <th width="25%">Item</th>
                  <th>Result</th>
                  <th style={{ textAlign: "center" }} width="25%">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HTTP Status</td>
                  <td>{data && data.status}</td>
                  <td style={{ textAlign: "center" }}>
                    <Icon
                      intent={
                        data && data.status === 201 ? "success" : "danger"
                      }
                      icon={
                        data && data.status === 201 ? "tick-circle" : "error"
                      }
                      size={20}
                    />
                  </td>
                </tr>
                {data.transaction_details && (
                  <>
                    <tr>
                      <td>Session ID</td>
                      <td>{data && data.transaction_details.linear_id}</td>
                      <td style={{ textAlign: "center" }}>
                        <Icon
                          intent={
                            data && data.transaction_details.linear_id !== null
                              ? "success"
                              : "danger"
                          }
                          icon={
                            data && data.transaction_details.linear_id !== null
                              ? "tick-circle"
                              : "error"
                          }
                          size={20}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>TX ID</td>
                      <td style={{ wordBreak: "break-all" }}>
                        {data && data.transaction_details.tx_id}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Icon
                          intent={
                            data && data.transaction_details.tx_id !== null
                              ? "success"
                              : "danger"
                          }
                          icon={
                            data && data.transaction_details.tx_id !== null
                              ? "tick-circle"
                              : "error"
                          }
                          size={20}
                        />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
            <div
              style={{
                borderRadius: "5px",
                marginTop: "1rem",
                padding: "1rem",
                backgroundColor: "#C9FDC5"
              }}
            >
              <H5 style={{ color: "black" }}>Message</H5>
              <p style={{ textAlign: "center", color: "black", wordBreak: "break-all" }}>
                {data && data.message}
              </p>
            </div>
          </>
        )
      )}
    </div>
  );
};

const EndSession = ({
  loading,
  setLoading,
  testType,
  setTestType,
  accounts,
  peers,
  values,
  setValues,
  testValidation,
  testDurationMins,
  setTestDurationMins,
  endSession,
  linearId,
  setLinearId
}) => {
  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <H4>
        End Test Parking Session
        <span>
          <Icon
            style={{ float: "right" }}
            icon="dashboard"
            iconSize={30}
            intent="primary"
          />
        </span>
      </H4>

      <FormGroup
        helperText="Select the car account..."
        label="Car Account"
        labelInfo="(required)"
      >
        <InputGroup
          disabled={false}
          placeholder="Select car account..."
          value={values.sourceAccountName}
          rightElement={
            <Popover
              position={Position.LEFT_BOTTOM}
              content={
                <AccountsMenu accounts={accounts} setValues={setValues} />
              }
            >
              <Button>Select account</Button>
            </Popover>
          }
          onChange={e => {
            setValues(state => ({
              ...state,
              sourceAccountName: e.target.value
            }));
          }}
        />
      </FormGroup>
      <FormGroup
        helperText="Select the remote peer node e.g. CarPark..."
        label="Car Park Host"
        labelInfo="(required)"
      >
        <InputGroup
          disabled={false}
          placeholder="Select car park host..."
          value={values.targetHostName}
          rightElement={
            <Popover
              position={Position.LEFT_BOTTOM}
              content={<PeersMenu peers={peers} setValues={setValues} />}
            >
              <Button>Select host</Button>
            </Popover>
          }
          onChange={e => {
            setValues(state => ({ ...state, targetHostName: e.target.value }));
          }}
        />
      </FormGroup>
      <FormGroup
        helperText="Enter car park account UUID..."
        label="Car Park Account UUID"
        labelInfo="(required)"
        labelFor="target-uuid"
      >
        <InputGroup
          id="target-uuid"
          type={"text"}
          disabled={false}
          placeholder="Enter car park account uuid..."
          value={values.targetUUID}
          onChange={e => {
            setValues(state => ({ ...state, targetUUID: e.target.value }));
          }}
        />
      </FormGroup>

      <FormGroup
        helperText="Enter the parking linear ID..."
        label="Parking Session ID"
        labelInfo="(required)"
        labelFor="linear-id"
      >
        <InputGroup
          id="linear-id"
          type={"text"}
          disabled={false}
          placeholder="Enter the parking linear ID..."
          value={linearId}
          onChange={e => {
            setLinearId(e.target.value);
          }}
        />
      </FormGroup>

      <FormGroup
        helperText="Enter test duration in minutes..."
        label="Parking Duration"
        labelInfo="(required)"
        labelFor="target-uuid"
      >
        <NumericInput
          id="parking-duration"
          disabled={false}
          min={0}
          placeholder="Enter parking duration in minutes..."
          value={testDurationMins}
          onValueChange={value => {
            setTestDurationMins(value);
          }}
        />
      </FormGroup>

      <RadioGroup
        label="Test Type"
        inline={true}
        onChange={e => setTestType(e.target.value)}
        selectedValue={testType}
      >
        <Radio large={true} label="Happy Path" value="happy" />
        <Radio large={true} label="Fail - Still parked" value="fail" />
      </RadioGroup>

      <Button
        loading={loading}
        disabled={testValidation()}
        fill
        intent="success"
        icon="play"
        onClick={() => {
          setLoading(true);
          endSession(values, testType, linearId, testDurationMins);
        }}
      >
        Run
      </Button>
    </div>
  );
};

function TestConsole({
  getAccounts,
  getMe,
  me,
  getPeers,
  peers,
  accounts,
  startSession,
  endSession,
  testResponse
}) {
  const [values, setValues] = useState({
    sourceAccountName: "",
    sourceUUID: "",
    targetHostName: "",
    targetUUID: ""
  });
  const [loading, setLoading] = useState(false);
  const [testType, setTestType] = useState("happy");
  const [testDurationMins, setTestDurationMins] = useState(0);
  const [linearId, setLinearId] = useState("");

  const checkStartTest = () => {
    if (Object.values(values).indexOf("") > -1) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getAccounts();
    getMe();
    getPeers();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [testResponse]);

  return (
    <FadeIn>
      <Card className="test-form" elevation={2}>
        <div className="test-container">
          <div className="test-left-col">
            {nodeType === "CAR_PARK" ? (
              <StartSession
                loading={loading}
                setLoading={setLoading}
                testType={testType}
                setTestType={setTestType}
                accounts={accounts}
                peers={peers}
                values={values}
                setValues={setValues}
                testValidation={checkStartTest}
                startSession={startSession}
              />
            ) : (
              <EndSession
                loading={loading}
                setLoading={setLoading}
                testType={testType}
                setTestType={setTestType}
                accounts={accounts}
                peers={peers}
                values={values}
                setValues={setValues}
                testValidation={checkStartTest}
                testDurationMins={testDurationMins}
                setTestDurationMins={setTestDurationMins}
                linearId={linearId}
                setLinearId={setLinearId}
                endSession={endSession}
              />
            )}
          </div>
          <div className="test-right-col">
            <StartResults loading={loading} data={testResponse} />
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}

const mapStateToProps = state => {
  return {
    accounts: state.mainReducer.accounts,
    me: state.peersReducer.me,
    peers: state.peersReducer.peers,
    testResponse: state.mainReducer.testResponseData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccounts: () => getAccounts(dispatch),
    getMe: () => getMe(dispatch),
    getPeers: () => getPeers(dispatch),
    startSession: (data, gpsScenario) =>
      sendStartSession(dispatch, data, gpsScenario),
    endSession: (endSessionData, gpsOption, linearId, duration) =>
      sendEndSession(dispatch, endSessionData, gpsOption, linearId, duration)
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TestConsole)
);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  HTMLTable,
  Card,
  Tag,
  Button,
  Alert,
  Intent,
  Tab,
  Tabs,
  Icon,
  H1,
  H5,
  Spinner,
  Drawer,
  Position,
  Classes,
  Code,
  Dialog,
  Tooltip,
  AnchorButton,
} from "@blueprintjs/core";
import "./ViewBA.css";
import { getMe } from "../../actions/peersActionCreators";
import {
  getDraftAgreements,
  getProposalAgreements,
  submitAgreement,
  getApprovedAgreements,
  submitApproval,
} from "../../actions/actionCreators";
import FadeIn from "../../components/Transitions/FadeIn";
import { AppToaster } from "../../components/AppToaster/AppToaster";
import CreateBA from "./CreateBA";

const INTENTS = [
  Intent.PRIMARY,
  Intent.SUCCESS,
  Intent.DANGER,
  Intent.WARNING,
  Intent.NONE,
];

const displayToaster = (intent, message) => {
  AppToaster.show({
    icon: intent === "danger" ? "error" : "info-sign",
    message: message,
    intent: intent,
  });
};

const testData = [
  {
    linear_id: "51918858-90b7-4999-8de3-d70d0a6f1698",
    status: "DRAFT",
    created_by: "O=VFOpCoA, L=London, C=GB",
    timezone: "Europe/Belfast",
    vpmn: "GBRO2",
    hpmn: "GBRVF",
    service_name: "NB-IoT",
  },
  {
    linear_id: "51918858-90b7-4999-8de3-d70d0a6f1698",
    status: "DRAFT",
    created_by: "O=VFOpCoA, L=London, C=GB",
    timezone: "Europe/Belfast",
    vpmn: "GBRO2",
    hpmn: "GBRVF",
    service_name: "NB-IoT",
  },
];

function AllAgreements({
  history,
  theme,
  myIdentity,
  getMe,
  getDraftAgreements,
  draftAgreements,
  getProposalAgreements,
  getApprovedAgreements,
  proposalAgreements,
  approvedAgreements,
  submitAgreement,
}) {
  const [tabId, setTabId] = useState("draft");

  const createAgreement = () => {
    history.push("/create");
  };

  const getAllAgreements = () => {
    getDraftAgreements();
    getProposalAgreements();
    getApprovedAgreements();
  };

  useEffect(() => {
    getMe();
    getAllAgreements();
  }, []);

  return (
    <FadeIn>
      <div className="ba-tabs">
        <Tabs
          id="TabsExample"
          onChange={(selectedTab) => setTabId(selectedTab)}
          selectedTabId={tabId}
          vertical
          animate
        >
          <Tab
            id="draft"
            title={`Draft Agreements (${draftAgreements.length})`}
            panel={
              <ViewBA
                title={"Draft Agreements"}
                theme={theme}
                myIdentity={myIdentity}
                data={draftAgreements}
                onCreate={createAgreement}
                submitAgreement={submitAgreement}
                getData={getAllAgreements}
              />
            }
          >
            <Icon
              className="ba-alert-icon"
              icon="notifications"
              iconSize={20}
              style={{
                visibility: draftAgreements.length > 0 ? "visible" : "hidden",
              }}
            />
          </Tab>
          <Tab
            id="proposal"
            title={`Proposed Agreements (${proposalAgreements.length})`}
            panel={
              <ViewBA
                title={"Proposed Agreements"}
                theme={theme}
                myIdentity={myIdentity}
                data={proposalAgreements}
                onCreate={createAgreement}
                submitAgreement={submitAgreement}
                getData={getAllAgreements}
              />
            }
            panelClassName="ember-panel"
          >
            <Icon
              className="ba-alert-icon"
              icon="notifications"
              iconSize={20}
              style={{
                visibility:
                  proposalAgreements.length > 0 ? "visible" : "hidden",
              }}
            />
          </Tab>
          <Tab
            id="approved"
            title={`Approved Agreements (${approvedAgreements.length})`}
            panel={
              <ViewBA
                title={"Approved Agreements"}
                theme={theme}
                myIdentity={myIdentity}
                data={approvedAgreements}
                onCreate={createAgreement}
                submitAgreement={submitAgreement}
                getData={getAllAgreements}
              />
            }
            panelClassName="ember-panel"
          ></Tab>
          <Tabs.Expander />
          <input
            className="bp3-input"
            disabled
            type="text"
            placeholder="Search..."
          />
        </Tabs>
      </div>
    </FadeIn>
  );
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.peersReducer.me,
    draftAgreements: state.mainReducer.draftBilateralAgreements,
    proposalAgreements: state.mainReducer.proposalBilateralAgreements,
    approvedAgreements: state.mainReducer.approvedBilateralAgreements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => getMe(dispatch),
    getDraftAgreements: () => getDraftAgreements(dispatch),
    getProposalAgreements: () => getProposalAgreements(dispatch),
    getApprovedAgreements: () => getApprovedAgreements(dispatch),
    submitAgreement: (callback, displayToast, uuid) =>
      submitAgreement(callback, displayToast, uuid),
    submitApproval: (callback, displayToast, uuid) =>
      submitApproval(callback, displayToast, uuid),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllAgreements)
);

/**
 * This component reders a table for bilateral agreements.
 */
function ViewBA({
  theme,
  myIdentity,
  data,
  title,
  onCreate,
  submitAgreement,
  getData,
}) {
  const [openAlert, setOpenAlert] = useState({
    linear_id: null,
    isOpen: false,
    isLoading: false,
  });

  const [openApproval, setOpenApproval] = useState({
    linear_id: null,
    isOpen: false,
    isLoading: false,
  });

  const [openEdit, setOpenEdit] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
    isLoading: false,
    data: null,
  });

  const [drawerState, setDrawerState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    position: Position.RIGHT,
    size: "500px",
    usePortal: true,
    title: "Bilateral Agreement Details",
    data: {},
  });

  const submitCallback = (data) => {
    console.log("callback: ", data);
    setOpenAlert({ ...openAlert, isLoading: data.isLoading, isOpen: false });
    getData();
  };

  const approvalCallback = (data) => {
    console.log("callback: ", data);
    setOpenApproval({
      ...openApproval,
      isLoading: data.isLoading,
      isOpen: false,
    });
    getData();
  };

  const statusColour = (status) => {
    switch (status) {
      case "PROPOSAL":
        return "warning";
      case "REJECTED":
        return "danger";
      case "APPROVED":
        return "success";
      default:
        return "primary";
    }
  };

  const returnActionButton = (myId, status, uuid, createdBy, data) => {
    console.log("BUTTONSSSS", myId, createdBy);

    if (status === "DRAFT") {
      return (
        <Button
          disabled={createdBy !== myId.host.name}
          small
          intent="success"
          onClick={() => {
            setDrawerState({ ...drawerState, isOpen: false });
            setOpenAlert({
              linear_id: uuid,
              isOpen: true,
            });
          }}
        >
          Submit
        </Button>
      );
    } else if (status === "PROPOSAL") {
      return (
        <Button
          disabled={createdBy === myId.host.name}
          small
          intent="danger"
          onClick={() => {
            //setDrawerState({ ...drawerState, isOpen: false });
            setOpenApproval({
              linear_id: uuid,
              isOpen: true,
            });
          }}
        >
          Approve
        </Button>
      );
    } else if (status === "APPROVED") {
      return (
        <Button
          disabled={createdBy !== myId.host.name}
          small
          intent="danger"
          onClick={() => {
            //setDrawerState({ ...drawerState, isOpen: false });
            setOpenEdit({ ...openEdit, isOpen: true, data: { ...data } });
          }}
        >
          Edit
        </Button>
      );
    }
  };

  return (
    <>
      <Card className="ba-table" elevation={2}>
        <H1>{title}</H1>
        <p>
          Your identity:{" "}
          <Tag intent="danger">{myIdentity && myIdentity.host.name}</Tag>
        </p>
        <>
          {data.length === 0 ? (
            <H5>There are no bilateral agreements in this state</H5>
          ) : (
            <HTMLTable
              className={
                openAlert.isLoading === true || openApproval.isLoading === true
                  ? "bp3-skeleton"
                  : ""
              }
              interactive
              striped
              condensed
              bordered
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th align="center">Valid From</th>
                  <th align="center">Valid To</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Timezone</th>
                  <th>Operator TADIGs</th>
                  <th>Partner TADIGs</th>
                  <th>Service Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="ba-data-records">
                {data.map((ba, index) => (
                  <tr
                    onClick={() => {
                      console.log("Click row...", ba);
                      setDrawerState({
                        ...drawerState,
                        isOpen: true,
                        data: { ...ba },
                      });
                    }}
                  >
                    <td>{ba.valid_from.split("T")[0]}</td>
                    <td>{ba.valid_to.split("T")[0]}</td>
                    <td>{ba.name}</td>
                    <td>
                      <Tag intent={statusColour(ba.status)}>{ba.status}</Tag>
                    </td>
                    <td>{ba.created_by}</td>
                    <td>{ba.timezone}</td>
                    <td>
                      {ba.my_operator_tadig_group &&
                        ba.my_operator_tadig_group.map((tadig, index) => {
                          return (
                            <Tag
                              key={index}
                              intent={INTENTS[index % INTENTS.length]}
                              style={{
                                margin: "2px",
                              }}
                            >
                              {tadig}
                            </Tag>
                          );
                        })}
                    </td>
                    <td>
                      {ba.my_partner_tadig_group &&
                        ba.my_partner_tadig_group.map((tadig, index) => {
                          return (
                            <Tag
                              key={index}
                              intent={INTENTS[index % INTENTS.length]}
                              style={{
                                margin: "2px",
                              }}
                            >
                              {tadig}
                            </Tag>
                          );
                        })}
                    </td>
                    <td>{ba.service_name}</td>
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {myIdentity &&
                        returnActionButton(
                          myIdentity,
                          ba.status,
                          ba.linear_id,
                          ba.created_by,
                          ba
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </HTMLTable>
          )}
        </>
        <div className="ba-create-button-container">
          <Button
            className="ba-create-button"
            onClick={onCreate}
            intent="danger"
            icon="plus"
          >
            Create Agreement
          </Button>
        </div>
      </Card>
      <Alert
        className={theme}
        cancelButtonText="Cancel"
        confirmButtonText="Submit for approval"
        icon="error"
        intent={Intent.DANGER}
        isOpen={openAlert.isOpen}
        onCancel={() => setOpenAlert({ ...openAlert, isOpen: false })}
        onConfirm={() => {
          setOpenAlert({ ...openAlert, isOpen: false, isLoading: true });
          submitAgreement(submitCallback, displayToaster, openAlert.linear_id);
        }}
      >
        <p>
          Are you sure you want to submit the agreement for <b>approval</b>?
          <br />
          <br />
          When the agreement has been submitted, the counter party will then
          have the opportunity to approve or reject the aggreement.
        </p>
      </Alert>
      <Alert
        className={theme}
        cancelButtonText="Cancel"
        confirmButtonText="APPROVE"
        icon="error"
        intent={Intent.DANGER}
        isOpen={openApproval.isOpen}
        onCancel={() => setOpenApproval({ ...openApproval, isOpen: false })}
        onConfirm={() => {
          setOpenApproval({ ...openApproval, isOpen: false, isLoading: true });
          submitApproval(
            approvalCallback,
            displayToaster,
            openApproval.linear_id
          );
        }}
      >
        <p>
          Are you sure you want to <b>APPROVE</b> the agreement?{" "}
          <b>This cannot be undone!</b>
          <br />
          <br />
          Approving the agreement will activate it.
        </p>
      </Alert>
      <Drawer
        className={theme}
        {...drawerState}
        onClose={() => setDrawerState({ ...drawerState, isOpen: false })}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <p>
              <b>Name: </b> {drawerState.data.name}
            </p>
            <p>
              <b>Status:</b>{" "}
              <Tag intent={statusColour(drawerState.data.status)}>
                {drawerState.data.status}
              </Tag>
            </p>
            <p>
              <b>Linear ID: </b> <Code>{drawerState.data.linear_id}</Code>
              <br />
              <small>This is the unique blockchain reference identifier.</small>
            </p>
            <p>
              <b>Timezone: </b> {drawerState.data.timezone}
            </p>
            <p>
              <b>Created By: </b> {drawerState.data.created_by}
              <br />
              <small>This is the blockchain node name of the creator.</small>
            </p>
            <p>
              <b>Partner Identity: </b> {drawerState.data.served_party}
              <br />
              <small>
                This is the blockchain node name of the counter party (partner
                operator).
              </small>
            </p>
            <p>
              <b>My TADIGS: </b>{" "}
              {drawerState.data.my_operator_tadig_group &&
                drawerState.data.my_operator_tadig_group.map((tadig, index) => {
                  return (
                    <Tag
                      intent={INTENTS[index % INTENTS.length]}
                      style={{ marginLeft: "2px" }}
                    >
                      {tadig}
                    </Tag>
                  );
                })}
              <br />
              <small>My operator's TADIG code(s).</small>
            </p>
            <p>
              <b>My Partner's TADIGS: </b>{" "}
              {drawerState.data.my_partner_tadig_group &&
                drawerState.data.my_partner_tadig_group.map((tadig, index) => {
                  return (
                    <Tag
                      intent={INTENTS[index % INTENTS.length]}
                      style={{ marginLeft: "2px" }}
                    >
                      {tadig}
                    </Tag>
                  );
                })}
              <br />
              <small>My partners's TADIG code(s).</small>
            </p>
            <p>
              <b>Service Name: </b> {drawerState.data.service_name}
            </p>
            <p>
              <b>Service Group: </b> {drawerState.data.service_group}
            </p>
            <p>
              <b>Aggregation Time Period: </b>{" "}
              {drawerState.data.aggregation_time_period}
            </p>
            <p>
              <b>Invoice Period: </b> {drawerState.data.invoice_period}
            </p>
            <p>
              <b>Valid From: </b> {drawerState.data.valid_from}
            </p>
            <p>
              <b>Valid To: </b> {drawerState.data.valid_to}
            </p>
            <p>
              <b>Tolerance: </b> {drawerState.data.tolerance} %
            </p>
            <p>
              <b>Usage Amber Threshold: </b>{" "}
              {drawerState.data.usage_amber_threshold * 100} %
              <br/>
              <small>
                The usage amber threshold, if the usage between each party
                breaks this threshold then an <Tag intent="warning">AMBER</Tag>{" "}
                alert is set.
              </small>
            </p>
            <p>
              <b>Usage Red Threshold: </b>{" "}
              {drawerState.data.usage_red_threshold * 100} %
              <br/>
              <small>
                The usage red threshold, if the usage between each party
                breaks this threshold then an <Tag intent="danger">RED</Tag>{" "}
                alert is set.
              </small>
            </p>
            <p>
              <b>Access Rate: </b> {drawerState.data.access_rate}
            </p>
            <p>
              <b>Usage Rate Threshold: </b>{" "}
              {drawerState.data.usage_rate_threshold}
            </p>
            <p>
              <b>Usage Rate: </b> {drawerState.data.usage_rate}
              <br />
              <small>
                The usage rate that will be applied below the{" "}
                <Code>Usage Rate Threshold</Code>
              </small>
            </p>
            <p>
              <b>Usage Rate Above: </b>{" "}
              {drawerState.data.usage_rate_above_threshold}
              <br />
              <small>
                The usage rate that will be applied above and including the{" "}
                <Code>Usage Rate Threshold</Code>
              </small>
            </p>
            <p>
              <b>Reconciliation Frequency Hours: </b>{" "}
              {drawerState.data.reconciliation_frequency_hours} hrs
            </p>
            <p>
              <b>IoT Currency: </b> {drawerState.data.iot_currency}
            </p>
            <p>
              <b>UDR Reconciliation Mechanism: </b>{" "}
              {drawerState.data.udr_reconciliation_mechanism}
              <br />
              <small>
                "HOME_UDR" = the home network data will always be used in a
                dispute.
              </small>
            </p>
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <div style={{ float: "right" }}>
            {myIdentity &&
              returnActionButton(
                myIdentity,
                drawerState.data.status,
                drawerState.data.linear_id,
                drawerState.data.created_by,
                drawerState.data
              )}
          </div>
        </div>
      </Drawer>
      <Dialog
        className={theme}
        style={{ minWidth: "80vw" }}
        icon="edit"
        onClose={() => {
          setOpenEdit({ ...openEdit, isOpen: false });
        }}
        title="Edit Bilateral Agreement"
        {...openEdit}
      >
        <div className={Classes.DIALOG_BODY}>
          <CreateBA
            showTitle={false}
            data={openEdit.data}
            updateCallback={getData}
          />
        </div>
      </Dialog>
    </>
  );
}

/*
    "linear_id" : "ecd70e17-cf44-44a6-a2ba-e008f220b574",
    "status" : "APPROVED",
    "serving_party" : "O=VFOpCoA, L=London, C=GB",
    "served_party" : "O=VFPartnerA, L=Frankfurt, C=DE",
    "created_by" : "O=VFOpCoA, L=London, C=GB",
    "timezone" : "Europe/Belfast",
    "vpmn" : "GBRO2",
    "hpmn" : "GBRVF",
    "service_name" : "NB-IoT",
    "service_group" : "Data - Volume",
    "aggregation_time_period" : "TEN_MONTHS",
    "invoice_period" : "TWELVE_MONTHS",
    "valid_from" : "2020-10-01T08:25:24Z",
    "valid_to" : "2022-10-01T08:25:24Z",
    "tolerance" : 0.02,
    "access_rate" : 1.0E-4,
    "usage_rate" : 2.0E-4,
    "reconciliation_frequency_hours" : 672,
    "iot_currency" : "EUR",
    "udr_reconciliation_mechanism" : "HOME_UDR"

*/

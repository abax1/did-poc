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
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
} from "@blueprintjs/core";
import "./ViewReconcile.css";
import { getMe } from "../../actions/peersActionCreators";
import {
  getDraftAgreements,
  getProposalAgreements,
  submitAgreement,
  getApprovedAgreements,
  submitApproval,
  getUdrs,
  getDdrs,
  downloadDdr,
  downloadUdr,
  getReconcile,
} from "../../actions/actionCreators";
import FadeIn from "../../components/Transitions/FadeIn";
import { AppToaster } from "../../components/AppToaster/AppToaster";

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

function AllReconcile({
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
  getUdrs,
  getDdrs,
  udrs,
  ddrs,
  downloadDdr,
  downloadUdr,
  getReconcile,
  reconcileData,
}) {
  const [tabId, setTabId] = useState("reconcile");
  const [query, setQuery] = useState("");

  const createAgreement = () => {
    history.push("/create");
  };

  const getAllAgreements = () => {
    getDraftAgreements();
    getProposalAgreements();
    getApprovedAgreements();
    getUdrs();
    getDdrs();
    getReconcile();
  };

  useEffect(() => {
    getMe();
    getAllAgreements();
  }, []);

  //console.log("udrs: ", udrs);
  const ddr_data = ddrs.indexOf(query.toLowerCase());
  console.log("ddr_data: ", ddr_data);
  console.log("ddrs: ", ddrs);

  return (
    <FadeIn>
      <div className="udr-tabs">
        <Tabs
          id="TabsExample"
          onChange={(selectedTab) => setTabId(selectedTab)}
          selectedTabId={tabId}
          vertical
          animate
        >
          <Tab
            id="reconcile"
            title={`Reconcile Reports (${reconcileData.length})`}
            panel={
              <ViewReconcileStates
                title={"Reconcile Reports"}
                theme={theme}
                myIdentity={myIdentity}
                data={reconcileData}
                onCreate={createAgreement}
                submitAgreement={submitAgreement}
                getData={getAllAgreements}
                downloadUdr={downloadUdr}
              />
            }
          >
            <Icon
              className="udr-alert-icon"
              icon="notifications"
              iconSize={20}
              style={{
                visibility: reconcileData.length > 0 ? "visible" : "hidden",
              }}
            />
          </Tab>
          <Tabs.Expander />
          <input
            className="bp3-input"
            disabled={tabId === "reconcile"}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
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
    udrs: state.mainReducer.udrs,
    ddrs: state.mainReducer.ddrs,
    reconcileData: state.mainReducer.reconcile,
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
    getUdrs: () => getUdrs(dispatch),
    getDdrs: () => getDdrs(dispatch),
    getReconcile: () => getReconcile(dispatch),
    downloadDdr: (filename) => downloadDdr(dispatch, filename),
    downloadUdr: (filename) => downloadUdr(dispatch, filename),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllReconcile)
);

/**
 * This component reders a table for UDRs.
 */
function ViewReconcileStates({
  theme,
  myIdentity,
  data,
  title,
  onCreate,
  submitAgreement,
  getData,
  downloadUdr,
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
    title: "Reconcile Record Details",
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

  const breachColour = (status) => {
    switch (status) {
      case "AMBER":
        return "warning";
      case "RED":
        return "danger";
      default:
        return "success";
    }
  };

  const returnActionButton = (myId, status, uuid, createdBy) => {
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
    }
  };

  return (
    <>
      <Card className="udr-table" elevation={2}>
        <H1>{title}</H1>
        <p>
          Your identity:{" "}
          <Tag intent="danger">{myIdentity && myIdentity.host.name}</Tag>
        </p>
        {openAlert.isLoading === true || openApproval.isLoading === true ? (
          <Spinner />
        ) : (
          <>
            {data.length === 0 ? (
              <H5>There are no reconcile records</H5>
            ) : (
              <HTMLTable
                interactive
                striped
                condensed
                bordered
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th align="center">Created By</th>
                    <th>Usage Breach Level</th>
                    <th>Time Period</th>
                    <th>Usage Unit</th>
                    <th>My Usage</th>
                    <th>Partner Usage</th>
                  </tr>
                </thead>
                <tbody className="udr-data-records">
                  {data.map((item, index) => (
                    <tr
                      onClick={() => {
                        console.log("Click row...", item);
                        setDrawerState({
                          ...drawerState,
                          isOpen: true,
                          data: { ...item },
                        });
                      }}
                    >
                      <td>{item.created_by}</td>
                      <td>
                        <Tag intent={breachColour(item.usage_breach_level)}>
                          {item.usage_breach_level}
                        </Tag>
                      </td>
                      <td>{item.time_period}</td>
                      <td>{item.usage_unit}</td>
                      <td>{item.my_usage}</td>
                      <td>{item.partner_usage}</td>
                    </tr>
                  ))}
                </tbody>
              </HTMLTable>
            )}
          </>
        )}
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
              <b>Usage Breach Level:</b>{" "}
              <Tag intent={breachColour(drawerState.data.usage_breach_level)}>
                {drawerState.data.usage_breach_level}
              </Tag>
            </p>
            <p>
              <b>Usage Breach Delta: </b> {drawerState.data.usage_breach_delta}
              <br />
              <small>The measured delta that triggered the breach level.</small>
            </p>

            <p>
              <b>Created By: </b>{" "}
              {drawerState.data.created_by}
              <br />
              <small>
                Blockchain node initiator of the reconciliation state.
              </small>
            </p>
            <p>
              <b>Access Breach Level:</b>{" "}
              <Tag intent={breachColour(drawerState.data.access_breach_level)}>
                {drawerState.data.access_breach_level}
              </Tag>
            </p>
            <p>
              <b>Access Breach Delta: </b> {drawerState.data.access_breach_delta}
              <br />
              <small>The measured delta.</small>
            </p>
            <p>
              <b>My Access Count: </b> {drawerState.data.my_access_count}
              <br />
              <small>The access count for you.</small>
            </p>
            <p>
              <b>My Usage: </b> {drawerState.data.my_usage}
              <br />
              <small>The usage count for you.</small>
            </p>
            <p>
              <b>Partner Usage: </b> {drawerState.data.partner_usage}
              <br />
              <small>The usage count for your partner.</small>
            </p>
            <p>
              <b>Usage Unit: </b> {drawerState.data.usage_unit}
              <br />
              <small>Units can be megabyte (MB), bytes (B)</small>
            </p>
            <p>
              <b>Linear ID: </b> <Code>{drawerState.data.linear_id}</Code>
              <br />
              <small>
                A unique blockchain reference number of each reconcile state.
              </small>
            </p>
            <p>
              <b>Bilateral Agreement ID: </b>{" "}
              <Code>{drawerState.data.bilateral_agreement_id}</Code>
              <br />
              <small>
                Blockchain unique ID reference for the related bilateral
                agreement.
              </small>
            </p>
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
            disabled={true}
              intent="success"
              onClick={() => {
                downloadUdr(drawerState.data.udr_filename);
              }}
            >
              Download
            </Button>
            <Button
            disabled={true}
              intent="warning"
              onClick={() => {
                downloadUdr(drawerState.data.udr_filename);
              }}
            >
              Drilldown
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

/**
 * This component reders a table for DDRs.
 */
function ViewDdr({
  theme,
  myIdentity,
  data,
  title,
  query,
  onCreate,
  submitAgreement,
  getData,
  downloadDdr,
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
    title: "DDR Record Details",
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

  const returnActionButton = (myId, status, uuid, createdBy) => {
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
    }
  };

  const filterDdr = (query, ddr) => {
    return `${ddr.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
  };

  return (
    <>
      <Card className="udr-table" elevation={2}>
        <H1>{title}</H1>
        {openAlert.isLoading === true || openApproval.isLoading === true ? (
          <Spinner />
        ) : (
          <>
            {data.length === 0 ? (
              <H5>There are no DDR records</H5>
            ) : (
              <HTMLTable
                interactive
                striped
                condensed
                bordered
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th align="center">Filename</th>
                  </tr>
                </thead>
                <tbody className="udr-data-records">
                  {data.map((ddr, index) => {
                    if (filterDdr(query, ddr)) {
                      return (
                        <tr>
                          <Popover
                            autoFocus={false}
                            content={
                              <Menu>
                                <MenuItem
                                  icon="download"
                                  text="Download"
                                  disabled={false}
                                  onClick={() => {
                                    console.log(ddr);
                                    downloadDdr(ddr);
                                  }}
                                />
                                <MenuItem
                                  icon="eye-open"
                                  text="View"
                                  disabled={true}
                                />
                              </Menu>
                            }
                            position={Position.RIGHT_TOP}
                          >
                            <td>{ddr}</td>
                          </Popover>
                        </tr>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                </tbody>
              </HTMLTable>
            )}
          </>
        )}
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
              <b>Filename:</b> {drawerState.data}
            </p>
          </div>
        </div>
      </Drawer>
    </>
  );
}

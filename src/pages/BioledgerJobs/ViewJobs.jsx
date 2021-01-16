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
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import "./ViewJobs.css";
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
  getJobById,
  getSentConsignmentHistory,
  getReceivedConsignmentHistory,
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

function AllJobs({
  history,
  theme,
  myIdentity,
  getMe,
  getDraftAgreements,
  getProposalAgreements,
  getApprovedAgreements,
  submitAgreement,
  getUdrs,
  getDdrs,
  downloadUdr,
  getJobs,
  jobs,
  getSentConsignmentHistory,
  consignmentHistory,
  getReceivedConsignmentHistory,
  receivedConsignmentHistory,
}) {
  const { innerWidth: width, innerHeight: height } = window;
  const [tabId, setTabId] = useState("sentConsignments");
  const [query, setQuery] = useState("");

  const createAgreement = () => {
    history.push("/create");
  };

  const getAllAgreements = () => {
  };

  useEffect(() => {
    getSentConsignmentHistory(
      () => console.log("consignment callback"),
      () => {}
    );
    getReceivedConsignmentHistory(
      () => console.log("consignment callback"),
      () => {}
    );
  }, []);

  //console.log("udrs: ", udrs);
  const consignmentHistoryData = consignmentHistory.indexOf(
    query.toLowerCase()
  );
  console.log("consignmentHistoryData", consignmentHistoryData);

  const isDesktop = width > 600 ? true : false;
  console.log("width", width);

  return (
    <FadeIn>
      <div className="report-tabs">
        <Tabs
          id="TabsExample"
          onChange={(selectedTab) => setTabId(selectedTab)}
          selectedTabId={tabId}
          vertical={isDesktop}
          animate
        >
          <Tab
            id="sentConsignments"
            title={`Sent Consignment History (${consignmentHistory.length})`}
            panel={
              <ViewConsignment
                title={"Sent Consignment History"}
                theme={theme}
                myIdentity={myIdentity}
                data={consignmentHistory}
                onCreate={createAgreement}
                submitAgreement={submitAgreement}
                getData={getAllAgreements}
                downloadUdr={downloadUdr}
                query={query}
                isDesktop={isDesktop}
              />
            }
          >
            <Icon
              className="report-alert-icon"
              icon="notifications"
              iconSize={20}
              style={{
                visibility:
                  consignmentHistory.length > 0 ? "visible" : "hidden",
              }}
            />
          </Tab>
          <Tab
            id="receivedConcignments"
            title={`Received Consignment History (${receivedConsignmentHistory.length})`}
            panel={
              <ViewConsignment
                title={"Received Consignment History"}
                theme={theme}
                myIdentity={myIdentity}
                data={receivedConsignmentHistory}
                onCreate={createAgreement}
                submitAgreement={submitAgreement}
                getData={getAllAgreements}
                downloadUdr={downloadUdr}
                query={query}
                isDesktop={isDesktop}
              />
            }
          >
            <Icon
              className="report-alert-icon"
              icon="notifications"
              iconSize={20}
              style={{
                visibility:
                  consignmentHistory.length > 0 ? "visible" : "hidden",
              }}
            />
          </Tab>
          <Tab
            id="jobHistory"
            title={`Transaction History By Job ID (${jobs.length})`}
            panel={
              <ViewJob
                title={"Job History"}
                theme={theme}
                myIdentity={myIdentity}
                data={jobs}
                onCreate={createAgreement}
                submitAgreement={submitAgreement}
                getData={getJobs}
                downloadUdr={downloadUdr}
                query={query}
                isDesktop={isDesktop}
              />
            }
          >
            <Icon
              className="report-alert-icon"
              icon="notifications"
              iconSize={20}
              style={{
                visibility: jobs.length > 0 ? "visible" : "hidden",
              }}
            />
          </Tab>

          {isDesktop && (
            <>
              <Tabs.Expander />
              <input
                className="bp3-input"
                disabled={false}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </>
          )}
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
    jobs: state.mainReducer.jobs,
    consignmentHistory: state.mainReducer.consignmentHistory,
    receivedConsignmentHistory: state.mainReducer.receivedConsignmentHistory,
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
    getJobs: (callback, jobId) => getJobById(callback, jobId, dispatch),
    getSentConsignmentHistory: (callback, displayToast) =>
      getSentConsignmentHistory(callback, displayToast, dispatch),
    getReceivedConsignmentHistory: (callback, displayToast) =>
      getReceivedConsignmentHistory(callback, displayToast, dispatch),
    downloadDdr: (filename) => downloadDdr(dispatch, filename),
    downloadUdr: (filename) => downloadUdr(dispatch, filename),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllJobs)
);

/**
 * This component renders a table for UDRs.
 */
function ViewConsignment({
  theme,
  myIdentity,
  data,
  title,
  onCreate,
  submitAgreement,
  getData,
  downloadUdr,
  query,
  isDesktop,
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
    title: "Record Details",
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

  const filterItem = (query, item) => {
    return `${item.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
  };

  return (
    <>
      <Card className="report-table" elevation={2}>
        <H1>{title}</H1>
        <button className="bio-button" style={{ float: "right" }}>
          Download
        </button>
        {openAlert.isLoading === true || openApproval.isLoading === true ? (
          <Spinner />
        ) : (
          <>
            {data.length === 0 ? (
              <H5>There are no history records</H5>
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
                    <th align="center">From</th>
                    <th>To</th>
                    <th>Litres</th>
                    <th>Feedstock</th>
                    <th>Country of origin</th>
                    <th>Certification</th>
                    <th>GHG</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="report-data-records">
                  {data && data.map((item, index) => {
                    if (
                      filterItem(
                        query,
                        `${item.Feedstock} ${item.Cert} ${item.Quantity} ${item.Datetime}`
                      )
                    ) {
                      return (
                        <tr
                          onClick={() => {
                            console.log("Click row...", item);
                            setDrawerState({
                              ...drawerState,
                              size: isDesktop ? "500px" : "100vw",
                              isOpen: true,
                              data: { ...item },
                            });
                          }}
                        >
                          <td>{item.Owner}</td>
                          <td>{item.Trader_To}</td>
                          <td>{item.Quantity}</td>
                          <td>{item.Feedstock}</td>
                          <td>{item.Trader_To_Country}</td>
                          <td>{item.Cert}</td>
                          <td>{item.GHG}</td>
                          <td>{item.Datetime}</td>
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
              <b>Transaction ID:</b> {drawerState.data.Transaction_id}
              <br />
              <small>A unique blockchain reference number.</small>
            </p>
            <p>
              <b>Owner:</b> {drawerState.data.Owner}
            </p>
            <p>
              <b>Trader To: </b> {drawerState.data.Trader_To}
              <br />
            </p>
            <p>
              <b>Trader Address: </b> {drawerState.data.Trader_To_Address}
              <br />
            </p>
            <p>
              <b>Consignment ID: </b> {drawerState.data.Consignment_id}
              <br />
              <small>A unique blockchain ID for the consignment.</small>
            </p>
            <p>
              <b>Quantity: </b> {drawerState.data.Quantity}
              <br />
              <small>The quantity in litres.</small>
            </p>
            <p>
              <b>GHG: </b> {drawerState.data.GHG}
              <br />
            </p>
            <p>
              <b>Trader Country: </b> {drawerState.data.Trader_To_Country}
              <br />
            </p>
            <p>
              <b>Certification: </b> {drawerState.data.Cert}
              <br />
            </p>
            <p>
              <b>Date: </b> {drawerState.data.Datetime}
            </p>
            <p>
              <b>Status: </b> {drawerState.data.Status}
            </p>
            <p>
              <b>Asset Type: </b> {drawerState.data.AssetType}
            </p>
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button disabled intent="success" onClick={() => {}}>
              Download
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

function ViewJob({
  theme,
  myIdentity,
  data,
  title,
  onCreate,
  submitAgreement,
  getData,
  downloadUdr,
  query,
  isDesktop,
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
    title: "Job Details",
    data: {},
  });

  const [jobId, setJobId] = useState("");

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

  const filterItem = (query, item) => {
    return `${item.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
  };

  return (
    <>
      <Card className="report-table" elevation={2}>
        <H1>{title}</H1>
        <FormGroup style={{ maxWidth: "300px" }}>
          <InputGroup
            disabled={false}
            placeholder="Job ID..."
            value={jobId}
            onChange={(e) => {
              setJobId(e.target.value);
            }}
            rightElement={
              <Button
                text="Update"
                onClick={() => {
                  getData(()=>{}, jobId);
                }}
              />
            }
          />
        </FormGroup>
        {data.length !== 0 ? (
          <>
            <button className="bio-button" style={{ float: "right" }}>
              Download
            </button>
          </>
        ) : (
          <></>
        )}
        {openAlert.isLoading === true || openApproval.isLoading === true ? (
          <Spinner />
        ) : (
          <>
            {data.length === 0 ? (
              <H5>There are no records for that job ID.</H5>
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
                    <th align="center">Driver ID</th>
                    <th>Job ID</th>
                    <th>Collection Assigned</th>
                    <th>Collection Completed</th>
                    <th>Measurement Unit</th>
                    <th>Job Date</th>
                    <th>Job Sign</th>
                    <th>Job Sign Date</th>
                    <th>Job Status</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody className="report-data-records">
                  {Array.isArray(data) && data.map((item, index) => {
                    if (
                      filterItem(
                        query,
                        `${item.assigneddriverid} ${item.collection_assigned} ${item.job_collection_target} ${item.job_date}`
                      )
                    ) {
                      return (
                        <tr
                          onClick={() => {
                            console.log("Click row...", item);
                            //setDrawerState({
                            //  ...drawerState,
                            //  size: isDesktop ? "500px" : "100vw",
                            //  isOpen: true,
                            //  data: { ...item },
                            //});
                          }}
                        >
                          <td>{item.assigneddriverid}</td>
                          <td>{item.job_id}</td>
                          <td>{item.collection_assigned}</td>
                          <td>{item.collection_completed}</td>
                          <td>{item.job_measurement_unit}</td>
                          <td>{item.job_date}</td>
                          <td>{item.job_sign}</td>
                          <td>{item.job_sign_date}</td>
                          <td>{item.job_status}</td>
                          <td>{item.job_collection_target}</td>
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
              <b>Transaction ID:</b> {drawerState.data.Transaction_id}
              <br />
              <small>A unique blockchain reference number.</small>
            </p>
            <p>
              <b>Owner:</b> {drawerState.data.Owner}
            </p>
            <p>
              <b>Trader To: </b> {drawerState.data.Trader_To}
              <br />
            </p>
            <p>
              <b>Trader Address: </b> {drawerState.data.Trader_To_Address}
              <br />
            </p>
            <p>
              <b>Consignment ID: </b> {drawerState.data.Consignment_id}
              <br />
              <small>A unique blockchain ID for the consignment.</small>
            </p>
            <p>
              <b>Quantity: </b> {drawerState.data.Quantity}
              <br />
              <small>The quantity in litres.</small>
            </p>
            <p>
              <b>GHG: </b> {drawerState.data.GHG}
              <br />
            </p>
            <p>
              <b>Trader Country: </b> {drawerState.data.Trader_To_Country}
              <br />
            </p>
            <p>
              <b>Certification: </b> {drawerState.data.Cert}
              <br />
            </p>
            <p>
              <b>Date: </b> {drawerState.data.Datetime}
            </p>
            <p>
              <b>Status: </b> {drawerState.data.Status}
            </p>
            <p>
              <b>Asset Type: </b> {drawerState.data.AssetType}
            </p>
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button disabled intent="success" onClick={() => {}}>
              Download
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
      <Card className="report-table" elevation={2}>
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
                <tbody className="report-data-records">
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

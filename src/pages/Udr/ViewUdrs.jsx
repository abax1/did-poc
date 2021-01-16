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
import "./ViewUdrs.css";
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

function AllUdrs({
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
  downloadUdr
}) {
  const [tabId, setTabId] = useState("udr");
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
            id="udr"
            title={`My UDR Records (${udrs.length})`}
            panel={
              <ViewUdr
                title={"UDR Records"}
                theme={theme}
                myIdentity={myIdentity}
                data={udrs}
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
                visibility: udrs.length > 0 ? "visible" : "hidden",
              }}
            />
          </Tab>
          <Tab
            id="ddr"
            title={`My DDR Records (${ddrs.length})`}
            panel={
              <ViewDdr
                title={"DDR Records"}
                theme={theme}
                myIdentity={myIdentity}
                data={ddrs}
                query={query}
                onCreate={createAgreement}
                submitAgreement={submitAgreement}
                getData={getAllAgreements}
                downloadDdr={downloadDdr}
              />
            }
          >
            <Icon
              className="udr-alert-icon"
              icon="notifications"
              iconSize={20}
              style={{
                visibility: udrs.length > 0 ? "visible" : "hidden",
              }}
            />
          </Tab>
          <Tabs.Expander />
          <input
            className="bp3-input"
            disabled={tabId === "udr"}
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
    downloadDdr: (filename) => downloadDdr(dispatch, filename),
    downloadUdr: (filename) => downloadUdr(dispatch, filename),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllUdrs)
);

/**
 * This component reders a table for UDRs.
 */
function ViewUdr({
  theme,
  myIdentity,
  data,
  title,
  onCreate,
  submitAgreement,
  getData,
  downloadUdr
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
    title: "UDR Record Details",
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
              <H5>There are no udr records</H5>
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
                    <th align="center">UDR Record Type</th>
                    <th>Created By</th>
                    <th>Counter Party</th>
                    <th>File Sequence Number</th>
                    <th>Usage Unit</th>
                    <th>Usage</th>
                    <th>Earliest Report Date</th>
                    <th>Latest Report Date</th>
                    <th>Report Creation Date</th>
                  </tr>
                </thead>
                <tbody className="udr-data-records">
                  {data.map((udr, index) => (
                    <tr
                      onClick={() => {
                        console.log("Click row...", udr);
                        setDrawerState({
                          ...drawerState,
                          isOpen: true,
                          data: { ...udr },
                        });
                      }}
                    >
                      <td>{udr.udr_record_type}</td>
                      <td>{udr.created_by}</td>
                      <td>{udr.counter_party}</td>
                      <td>{udr.file_sequence_number}</td>
                      <td>{udr.usage_unit}</td>
                      <td>{udr.total_usage}</td>
                      <td>{udr.earliest_report_date}</td>
                      <td>{udr.latest_report_date}</td>
                      <td>{udr.report_creation_timestamp}</td>
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
              <b>Serving Party:</b>{" "}
              <Tag intent={statusColour(drawerState.data.serving_party)}>
                {drawerState.data.serving_party}
              </Tag>
            </p>
            <p>
              <b>Served Party:</b>{" "}
              <Tag intent={statusColour(drawerState.data.served_party)}>
                {drawerState.data.served_party}
              </Tag>
            </p>
            <p>
              <b>File Sequence Number: </b>{" "}
              <Code>{drawerState.data.file_sequence_number}</Code>
              <br />
              <small>A unique reference number of each created file.</small>
            </p>
            <p>
              <b>Number of Records: </b> {drawerState.data.number_of_records}
              <br />
              <small>
                The total number of records excluding Header and Trailer.
              </small>
            </p>
            <p>
              <b>Total Charge Amount: </b>{" "}
              {drawerState.data.total_charge_amount}
              <br />
              <small>
                The total value of all Charge Amounts populated in the Charge
                field in the Service Data section of the UDR or BSR.
              </small>
            </p>
            <p>
              <b>Total Usage: </b>{" "}
              {drawerState.data.total_usage}
              <br />
              <small>
                The total usage calculated in the UDR.
              </small>
            </p>
            <p>
              <b>Usage Unit: </b>{" "}
              {drawerState.data.usage_unit}
              <br />
              <small>
                Units can be megabyte (MB), bytes (B)
              </small>
            </p>
            <p>
              <b>Earliest Report Date: </b>{" "}
              {drawerState.data.earliest_report_date}
              <br />
              <small>The start of the period covered by this report.</small>
            </p>
            <p>
              <b>Latest Report Date: </b> {drawerState.data.latest_report_date}
              <br />
              <small>The end of the period covered by this report.</small>
            </p>
            <p>
              <b>Report Creation Date: </b>{" "}
              {drawerState.data.report_creation_timestamp}
            </p>
            <p>
              <b>Bilateral Agreement Identifier: </b>{" "}
              {drawerState.data.ba_id}
            </p>
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent="success" onClick={()=>{
              downloadUdr(drawerState.data.udr_filename)
            }}>Download</Button>
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

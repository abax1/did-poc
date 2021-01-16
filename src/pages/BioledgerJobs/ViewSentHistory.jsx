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

function ViewSentHistory({
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
              <ViewConsignment
                title={"Sent Consignment History"}
                theme={theme}
                myIdentity={myIdentity}
                data={consignmentHistory}
                query={query}
                isDesktop={isDesktop}
              />
      </div>
    </FadeIn>
  );
}

const mapStateToProps = (state) => {
  return {
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
    getJobs: (jobId) => getJobById(jobId, dispatch),
    getSentConsignmentHistory: (callback, displayToast) =>
      getSentConsignmentHistory(callback, displayToast, dispatch),
    getReceivedConsignmentHistory: (callback, displayToast) =>
      getReceivedConsignmentHistory(callback, displayToast, dispatch),
    downloadDdr: (filename) => downloadDdr(dispatch, filename),
    downloadUdr: (filename) => downloadUdr(dispatch, filename),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewSentHistory)
);

/**
 * This component renders a table for UDRs.
 */
function ViewConsignment({
  data,
  title,
  query,
  isDesktop,
}) {

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
                  {data.map((item, index) => {
                    if (
                      filterItem(
                        query,
                        `${item.Feedstock} ${item.Cert} ${item.Quantity} ${item.Datetime}`
                      )
                    ) {
                      return (
                        <tr
                          onClick={() => {
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
    </>
  );
}


import React, { useState } from "react";
import { Tab, Tabs, Code } from "@blueprintjs/core";
import { MOBILE_WIDTH } from "../../constants";
import FadeIn from "../../components/Transitions/FadeIn";
import MyTransactions from "./MyTransactions";
import OpenTransactions from "./OpenTransactions";
import ClosedTransactions from "./ClosedTransactions";

function TXMenu({ theme }) {
  const [tabState, setTabState] = useState({
    selectedTabId: "op"
  });
  return (
    <FadeIn>
      <div style={{ paddingTop: "10px", paddingLeft: "10px", width: "100%" }}>
        <Tabs
          id="TabsExample"
          onChange={tabId => {
            setTabState({ selectedTabId: tabId });
          }}
          selectedTabId={tabState.selectedTabId}
          vertical={window.innerWidth < MOBILE_WIDTH ? false : true}
          renderActiveTabPanelOnly
        >
          <Tab
            disabled
            id="ng"
            title="All Transactions"
            panel={<MyTransactions theme={theme} />}
          />
          <Tab
            id="op"
            title="Open Parking Sessions"
            panel={
              <div>
                <h1>Open Parking Sessions</h1>
                <h3>
                  The table below contains all the parking sessions that are
                  still in progress. The <Code>End Time</Code> and{" "}
                  <Code>Parking Charge</Code> are in progress while these sessions
                  are active.
                </h3>
                <h3>
                  The <Code>Parking Consensus</Code> = <Code>Valid</Code> denotes that the car was indeed parked at the location of the car park space (within 6 metres).
                </h3>
                <OpenTransactions theme={theme} />
              </div>
            }
          />
          <Tab
            id="cp"
            title="Closed Parking Sessions"
            panel={
              <div>
                <h1>Closed/Completed Parking Sessions</h1>
                <h3>
                  The table below contains all the parking sessions that are
                  completed.
                </h3>
                <ClosedTransactions theme={theme} />
              </div>
            }
          />

          <Tabs.Expander />
        </Tabs>
      </div>
    </FadeIn>
  );
}

export default TXMenu;

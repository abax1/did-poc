import React, { useState } from "react";
import Wallet from "./Wallet";
import { Tab, Tabs } from "@blueprintjs/core";
import { MOBILE_WIDTH } from "../../constants";
import Account from "./Account";

function MenuWallet() {
  const [tabState, setTabState] = useState({
    selectedTab: "ng"
  });
  return (
    <div style={{ paddingTop: "10px", paddingLeft: "10px", width:"100%" }}>
      <Tabs
        id="TabsExample"
        onChange={tabId => {
          setTabState({ selectedTabId: tabId });
        }}
        selectedTabId={tabState.selectedTabId}
        vertical={window.innerWidth < MOBILE_WIDTH ? false : true}
        renderActiveTabPanelOnly
      >
          <Tab id="ng" title="Information" panel={<Wallet />} />
          <Tab
            id="mb"
            title="Account"
            disabled={false}
            panel={<Account/>}
            panelClassName="ember-panel"
          />
          <Tabs.Expander />
      </Tabs>
    </div>
  );
}

export default MenuWallet;

import React, { useState } from "react";
import Accounts from "./Accounts";
import { Tab, Tabs } from "@blueprintjs/core";
import { MOBILE_WIDTH } from "../../constants";
import Account from "./Account";
import FadeIn from "../../components/Transitions/FadeIn";

function MenuAssets({ theme }) {
  const [tabState, setTabState] = useState({
    selectedTab: "ng"
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
          <Tab id="ng" title="Accounts" panel={<Accounts theme={theme} />} />
          
          <Tabs.Expander />
        </Tabs>
      </div>
    </FadeIn>
  );
}

export default MenuAssets;

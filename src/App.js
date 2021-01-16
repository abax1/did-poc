import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
//import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
//import "@blueprintjs/select/lib/css/blueprint-select.css";

//import "./App.css";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Popup from "./components/Popup/Popup";
import Peers from "./pages/Peers/Peers";
import { showToast, toggleTheme } from "./actions/actionCreators";
import Footer from "./components/Footer/Footer";
import MenuAssets from "./pages/Assets/MenuAssets";
import AddTokensPopup from "./components/Tokens/AddTokensPopup";
import TXMenu from "./pages/MyTransactions/TXMenu";
import SplashPage from "./pages/SplashPage/SplashPage";
import TestConsole from "./pages/Testing/TestConsole";
import CreateBA from "./pages/BilateralAgreement/CreateBA";
import AllAgreements from "./pages/BilateralAgreement/ViewBA";
import AllUdrs from "./pages/Udr/ViewUdrs";
import AllReconcile from "./pages/Reconcile/ViewReconcile";
import AllJobs from "./pages/BioledgerJobs/ViewJobs";
import LoginPage from "./pages/LoginPage/LoginPage";
import { getMe } from "./actions/peersActionCreators";
import Send from "./pages/SendPage/Send";
import WalletList from "./pages/WalletsPage/WalletList";
import ReceivedConsignments from "./pages/ReceivedConsignments/ReceivedConsignments";
import DriverDash from "./pages/DriverDash/DriverDash";
import Consignments from "./pages/Consignments/Consignments";
import JobDash from "./pages/DriverDash/JobDash";

function App(props) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    // code to run on component mount
    //props.getMe();
  }, []);

  const changeTheme = () => {
    if (theme === "bp3-dark") {
      setTheme("");
      document.body.style.background = "#ffff";
    } else {
      setTheme("bp3-dark");
      document.body.style.background = "#2b3a43";
    }

    props.toggleTheme();
  };

  // const showToast = () => {
  //   // create toasts in response to interactions.
  //   // in most cases, it's enough to simply create and forget (thanks to timeout).
  //   AppToaster.show({ message: "Toasted.", intent: Intent.DANGER });
  // };
  const HeaderFooter = ({ children }) => {
    return (
      <>
        <Header className={`${theme}`} changeTheme={changeTheme} />
        {children}
        <Footer />
      </>
    );
  };

  return (
    <>
      <div className={`${theme} App`}>
        <div style={{ paddingBottom: "60px" }}>
          <Route path="/" exact render={() => <SplashPage theme={theme} />} />
          <Route
            path="/login"
            exact
            render={() => (
              <>
                <LoginPage />
              </>
            )}
          />

          <Route
            path="/history"
            exact
            render={() => (
              <>
                <HeaderFooter>
                  <AllJobs theme={theme} />
                </HeaderFooter>
              </>
            )}
          />
          <Route
            path="/driver-dash"
            exact
            render={() => (
              <>
                <DriverDash theme={theme} />
              </>
            )}
          />
          <Route
            path="/job-dash/:id"
            exact
            render={() => (
              <>
                <JobDash theme={theme} />
              </>
            )}
          />

          <Route
            path="/depot-dash"
            exact
            render={() => (
              <>
                <HeaderFooter>
                  <AllJobs theme={theme} />
                </HeaderFooter>
              </>
            )}
          />
          <Route
            path="/send"
            exact
            render={() => (
              <>
                <HeaderFooter>
                  <Send theme={theme} />
                </HeaderFooter>
              </>
            )}
          />
          <Route
            path="/received-consignments"
            exact
            render={() => (
              <>
                <HeaderFooter>
                  <ReceivedConsignments theme={theme} />
                </HeaderFooter>
              </>
            )}
          />
          <Route
            path="/wallets"
            exact
            render={() => (
              <>
                <HeaderFooter>
                  <WalletList theme={theme} />
                </HeaderFooter>
              </>
            )}
          />
          <Route
            path="/consignments"
            exact
            render={() => (
              <>
                <HeaderFooter>
                  <Consignments theme={theme} />
                </HeaderFooter>
              </>
            )}
          />
        </div>
      </div>
      <Popup className={`${theme}`} />
      <AddTokensPopup className={`${theme}`} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    showToast: () => dispatch(showToast()),
    toggleTheme: () => dispatch(toggleTheme()),
    getMe: () => getMe(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

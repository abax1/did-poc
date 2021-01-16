import classNames from "classnames";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import logo from "../../apple-touch-icon.png";
import logo from "../../icon.png";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
//import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
//import "@blueprintjs/select/lib/css/blueprint-select.css";
import "../../App.css";

import {
  Button,
  Navbar,
  Alignment,
  InputGroup,
  Classes,
  Code,
  Overlay,
  H3,
  H4,
  Intent,
  Tooltip,
  Position,
  Colors,
  Icon,
  Drawer,
  Switch,
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
} from "@blueprintjs/core";
import { TimezoneDisplayFormat, TimezonePicker } from "@blueprintjs/timezone";
import "./Header.css";
import { toggleHelpers, toggleAnnotations } from "../../actions/actionCreators";
import { MOBILE_WIDTH, traderType, COLLECTOR } from "../../constants";

function MobileBurger() {
  const [drawerState, setDrawerState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    position: Position.RIGHT,
    size: Drawer.SIZE_LARGE,
    usePortal: true,
  });
  return (
    <>
      <Button
        className="bp3-minimal"
        onClick={() => {
          setDrawerState({ ...drawerState, isOpen: true });
        }}
      >
        <Icon icon="menu" intent={Intent.PRIMARY} />
      </Button>
      <Drawer
        icon="menu"
        onClose={() => {
          setDrawerState({ ...drawerState, isOpen: false });
        }}
        title="Menu"
        {...drawerState}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <Button>Test</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

function DrawerElements(props) {
  const [timezoneState, setTimezoneState] = useState({
    disabled: false,
    showCustomTarget: false,
    showLocalTimezone: true,
    targetDisplayFormat: TimezoneDisplayFormat.OFFSET,
    timezone: "",
  });

  return (
    <>
      <Navbar.Divider />
      {window.innerWidth >= MOBILE_WIDTH
        ? () => {
            return (
              <>
                <InputGroup
                  className={Classes.ROUND}
                  leftIcon="search"
                  placeholder="Search..."
                />
                <Tooltip content="Select Timezone" position={Position.LEFT}>
                  <TimezonePicker
                    value={timezoneState.timezone}
                    onChange={(timezone) => {
                      setTimezoneState({ ...timezoneState, timezone });
                    }}
                    valueDisplayFormat={timezoneState.targetDisplayFormat}
                    popoverProps={{ position: Position.TOP }}
                    showLocalTimezone={timezoneState.showLocalTimezone}
                    disabled={timezoneState.disabled}
                  />
                </Tooltip>
              </>
            );
          }
        : ""}

      <Tooltip content="Change theme" position={Position.LEFT}>
        <Button
          onClick={props.changeTheme}
          className="bp3-minimal"
          icon="lightbulb"
        />
      </Tooltip>
    </>
  );
}

function Header(props) {
  //console.log('props', props);

  const [overlayState, setOverlayState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    usePortal: true,
    useTallContent: false,
  });

  const classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    props.className,
    "hdr-overlay"
  );

  const { pathname } = props.location;

  return (
    <>
      <Navbar fixedToTop={true}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <img
              className="pointer"
              onClick={() => {
                props.history.push("/");
              }}
              src={logo}
              alt="BCE"
              height="30"
              width="30"
            />
          </Navbar.Heading>
          <Navbar.Heading style={{ color: "#848484" }}>
            <H4 style={{ color: "#848484", paddingTop: "7px" }}>
              BioLedger<sub style={{ fontSize: "5pt" }}>ALPHA</sub>
            </H4>
          </Navbar.Heading>

          <Navbar.Divider />
          <Button
            minimal
            outlined={true}
            active={pathname === "/depot-dash" || pathname === "/driver-dash"}
            onClick={() => {
              props.history.push("/depot-dash");
            }}
            icon="chart"
            text={window.innerWidth < MOBILE_WIDTH ? "" : "History"}
          />
          {traderType === COLLECTOR && (
            <Button
              minimal
              outlined={true}
              active={pathname === "/wallets"}
              onClick={() => {
                props.history.push("/wallets");
              }}
              icon="briefcase"
              text={window.innerWidth < MOBILE_WIDTH ? "" : "Wallets"}
            />
          )}
          <Button
            minimal
            outlined={true}
            active={pathname === "/received-consignments"}
            onClick={() => {
              props.history.push("/received-consignments");
            }}
            icon="inbox"
            text={window.innerWidth < MOBILE_WIDTH ? "" : "Received"}
          />

          {traderType === COLLECTOR && (
            <Button
              minimal
              outlined={true}
              active={pathname === "/consignments"}
              onClick={() => {
                props.history.push("/consignments");
              }}
              icon="box"
              text={window.innerWidth < MOBILE_WIDTH ? "" : "Consignments"}
            />
          )}
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {window.innerWidth < MOBILE_WIDTH ? (
            <MobileBurger />
          ) : (
            <DrawerElements
              changeTheme={props.changeTheme}
              toggleHelpers={props.toggleHelpers}
              annotations={props.annotations}
              toggleAnnotations={props.toggleAnnotations}
              history={props.history}
            />
          )}
        </Navbar.Group>
      </Navbar>
      <Overlay
        onClose={() => {
          setOverlayState({
            ...overlayState,
            isOpen: false,
            useTallContent: false,
          });
        }}
        {...overlayState}
      >
        <div className={classes}>
          <H3>Welcome!</H3>
          <p>
            This is a simple container with some inline styles to position it on
            the screen. Its CSS transitions are customized for this example only
            to demonstrate how easily custom transitions can be implemented.
          </p>
          <p>
            Click the "Focus button" below to transfer focus to the "Show
            overlay" trigger button outside of this overlay. If persistent focus
            is enabled, focus will be constrained to the overlay. Use the{" "}
            <Code>tab</Code> key to move to the next focusable element to
            illustrate this effect.
          </p>
          <p>
            Click the "Make me scroll" button below to make this overlay's
            content really tall, which will make the overlay's container (but
            not the page) scrollable
          </p>
          <br />
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.DANGER}
              onClick={() => {
                setOverlayState({
                  ...overlayState,
                  isOpen: false,
                  useTallContent: false,
                });
              }}
              style={{ margin: "" }}
            >
              Close
            </Button>
          </div>
        </div>
      </Overlay>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    annotations: state.mainReducer.mapAnnotations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHelpers: () => dispatch(toggleHelpers()),
    toggleAnnotations: () => dispatch(toggleAnnotations()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

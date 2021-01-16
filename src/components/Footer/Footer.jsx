import classNames from "classnames";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
//import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
//import "@blueprintjs/select/lib/css/blueprint-select.css";

import { Navbar, Alignment, Classes, Text } from "@blueprintjs/core";
import "./Footer.css";
import { toggleHelpers } from "../../actions/actionCreators";
import { getMe } from "../../actions/peersActionCreators";
import CircleLive from "../Maps/CircleLive";
import { REL_VERSION, nodeName } from "../../constants";

//const MOBILE_WIDTH = 768;

function Footer({ getMe, me, isLoading }) {
  useEffect(() => {
    getMe();
  }, []);

  const loadingEffect = isLoading ? "bp3-skeleton" : "";

  return (
    <>
      <Navbar className="footer">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading />
          <Text style={{ marginLeft: "4px" }}>{" Node status:"}</Text>
          <Text>&nbsp;&nbsp;Active</Text>
          <CircleLive color={"green"} size={7} />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Text>{nodeName}</Text>
          <Navbar.Divider />
          <Text>{REL_VERSION}</Text>
        </Navbar.Group>
      </Navbar>
    </>
  );
}

const mapStateToProps = state => {
  let isLoading = true;
  if (state.peersReducer.me.balance) {
    isLoading = false;
  }
  return {
    balance: state.peersReducer.me.balance,
    me: state.peersReducer.me,
    isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleHelpers: () => dispatch(toggleHelpers()),
    getMe: () => {
      getMe(dispatch);
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));

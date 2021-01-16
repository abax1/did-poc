import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Callout } from "@blueprintjs/core";

function Helpers({ style, children, intent, title, showHelpers }) {
  return (
    <>
      {showHelpers && (
        <Callout style={style} title={title} intent={intent}>
          {children}
        </Callout>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    showHelpers: state.mainReducer.showHelpers
  };
};

const mapDispatchToProps = dispatch => {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Helpers)
);

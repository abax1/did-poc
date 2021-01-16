import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
//import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
//import "@blueprintjs/select/lib/css/blueprint-select.css";

import {
  Button,
  Classes,
  Overlay,
  Intent
} from "@blueprintjs/core";
import { closePopup } from "../../actions/popupActionCreators";

function Popup({popupPayload, overlayState, closePopup, className}) {
  

  const classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    className,
    "hdr-overlay"
  );

  console.log('popupPayload', popupPayload);
  

  return (
    <div>
      <Overlay
        onClose={() => {
          closePopup();
        }}
        {...overlayState}
      >
        <div className={classes}>
          {popupPayload}
          <br />
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.DANGER}
              onClick={() => {
                closePopup();
              }}
              style={{ margin: "" }}
            >
              Close
            </Button>
            
          </div>
        </div>
      </Overlay>
    </div>
  );
}

const mapStateToProps = state => {
    return{
        overlayState: state.popupReducer.overlayState,
        popupPayload: state.popupReducer.payload
    }
};

const mapDispatchToProps = dispatch => {
    return{
        //openPopup: (payload) => dispatch(openPopup(payload)),
        closePopup: () => dispatch(closePopup())
    }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Popup)
);

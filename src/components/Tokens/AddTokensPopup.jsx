import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from "classnames";
import { closeAddTokensPopup } from '../../actions/popupActionCreators'
import { Overlay, Button, Classes, Intent } from '@blueprintjs/core'
import "./AddTokensPopup.css"
import AddTokensForm from '../AddTokensForm/AddTokensForm';

function AddTokensPopup({closePopup, overlayState, data, uuid, className}) {
  const classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    className,
    "hdr-overlay",
    "add-tokens"
  );

  const [values, setVaules] = useState({})

  return(
    <div>
      <Overlay
        onClose={() => {
          closePopup();
        }}
        {...overlayState}
      >
        <div className={classes} >
          <AddTokensForm data={data}/>
        </div>
      </Overlay>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    overlayState: state.popupReducer.addTokensOverlayState,
    uuid: state.popupReducer.uuid,
    data: state.popupReducer.data
}
}

const mapDispatchToProps = (dispatch) => {
  return{
    //openPopup: (payload) => dispatch(openPopup(payload)),
    closePopup: () => dispatch(closeAddTokensPopup())
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTokensPopup));
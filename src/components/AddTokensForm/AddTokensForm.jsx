import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  FormGroup,
  Intent,
  Classes,
  Button,
  Icon,
  NumericInput
} from "@blueprintjs/core";
import {
  postAddTokens,
  getAccounts
} from "../../actions/actionCreators";

import { AppToaster } from "../AppToaster/AppToaster";

const displayToaster = (intent, message) => {
  AppToaster.show({ icon: "globe", message: message, intent: intent });
};

function AddTokensForm({ data, getAccounts }) {
  const [tokenCount, setTokenCount] = useState(0);
  const [callbackData, setCallbackData] = useState({
    data: null,
    status: 200,
    isLoading: false
  });

  useEffect(() => {
    getAccounts();
  }, [callbackData.isLoading, getAccounts]);

  return (
    <div style={{ maxWidth: "30rem" }}>
      <Icon
        style={{ float: "right", color: "#7157D9" }}
        icon="new-object"
        iconSize={30}
      />
      <h2>Add Tokens to {data.name}</h2>
      <h4>UUID: {data.uuid}</h4>
      <FormGroup
        helperText="Enter a token amount to add to the account."
        label="Amount"
        labelFor="account-input"
        labelInfo="(required)"
      >
        <NumericInput
          intent={"primary"}
          onValueChange={value => {
            setTokenCount(value);
          }}
          value={tokenCount}
        />
      </FormGroup>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button
          intent={Intent.SUCCESS}
          loading={callbackData.isLoading}
          disabled={(callbackData.status === 201) | (tokenCount == 0)}
          onClick={() => {
            setCallbackData({
              data: null,
              status: 200,
              isLoading: true
            });
            postAddTokens(
              setCallbackData,
              displayToaster,
              tokenCount,
              data.uuid
            );
          }}
          style={{ margin: "" }}
        >
          {callbackData.status === 201 ? "Success" : "Submit"}
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.popupReducer.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postAddTokens: (setCallbackData, displayToaster, tokenCount, uuid) =>
      postAddTokens(setCallbackData, displayToaster, tokenCount, uuid),
    getAccounts: () => getAccounts(dispatch)
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddTokensForm)
);

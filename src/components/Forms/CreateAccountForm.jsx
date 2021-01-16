import React, { useState, useEffect } from "react";
import {
  FormGroup,
  InputGroup,
  Intent,
  Classes,
  Button,
  Icon
} from "@blueprintjs/core";
import { postCreateAccount } from "../../actions/actionCreators";

import { AppToaster } from "../AppToaster/AppToaster";

const displayToaster = (intent, message) => {
  AppToaster.show({ icon: "globe", message: message, intent: intent });
}

function CreateAccountForm( {getAccounts, closePopup} ) {
  const [accountName, setAccountName] = useState("");
  const [contactEndpoint, setContactEndpoint] = useState("");
  const [callbackData, setCallbackData] = useState({
    data: null,
    status: 200,
    isLoading: false,
    close: false
  });

  useEffect(() => {
    getAccounts()

  }, [callbackData.isLoading])

  useEffect(() => {
    if(callbackData.close){
      closePopup()
    }
  })

  return (
    <div style={{ maxWidth: "30rem" }}>
      <Icon style={{float: "right", color: "grey"}} icon="book" iconSize={30} />
      <h2>Create Account</h2>
      <FormGroup
        helperText="Specify a string name for your account."
        label="Account Name"
        labelFor="account-input"
        labelInfo="(required)"
      >
        <InputGroup
          id="account-input"
          placeholder="My Car"
          onChange={e => {
            setAccountName(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup
        helperText="Specify an http request endpoint."
        label="Device Communication Endpoint"
        labelFor="device-endpoint"
        labelInfo="(required)"
      >
        <InputGroup
          id="device-endpoint"
          placeholder="http://mydevice-endpoint-url"
          onChange={e => {
            //console.log("enpoint input: ", e.target.value)
            setContactEndpoint(e.target.value);
          }}
        />
      </FormGroup>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button
          intent={Intent.SUCCESS}
          loading={callbackData.isLoading}
          disabled={callbackData.status === 201 | accountName === ""}
          onClick={() => {
            setCallbackData({
              data: null,
              status: 200,
              isLoading: true,
              close: false
            })
            postCreateAccount(
              setCallbackData,
              displayToaster,
              null,
              accountName,
              contactEndpoint
            );
          }}
          style={{ margin: "" }}
        >
          {callbackData.status === 201? "Success" : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default CreateAccountForm;

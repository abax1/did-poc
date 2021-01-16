import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Card,
  Classes,
  Tooltip,
  AnchorButton,
  Elevation,
  Label,
  Intent,
  Button,
  Dialog,
  Slider,
  NumericInput
} from "@blueprintjs/core";
import { getTransactions } from "../../actions/actionCreators";

import "./Wallet.css";
import QRCode from "qrcode.react";

const elevation = Elevation.THREE;

const MARGIN_TOP = "0px";

// eslint-disable-next-line
function Wallet({ getTransactions, transactions }) {
  // eslint-disable-next-line
  const [openDialog, setOpenDialog] = useState(false);
  const [tokenValue, setTokenValue] = useState(0);

  const getChangeHandler = value => {
    console.log("value", value);

    setTokenValue(value);
  };

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="items-center">
      <Card interactive={false} elevation={elevation}>
        <h2>Your Wallet Account Information</h2>
        <p>
          To add tokens to your wallet, you can do so by sending them to the
          address below.
        </p>
        <br />
        <QRCode value="http://localhost:3000" />
        <br />
        <br />
        <p>Your wallet address is:</p>
        <p>0xdefa07dada8aaa909adff987ead634da43d6329f8fa</p>
        <br />
        <hr />
        <Button
          intent="primary"
          className="bp3-fill"
          large
          icon="add"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Add Tokens
        </Button>
      </Card>
      <Dialog
        icon="add"
        onClose={() => {
          setOpenDialog(false);
        }}
        title="Add Tokens"
        autoFocus={true}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        enforceFocus={true}
        isOpen={openDialog}
        usePortal={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <div>
            <Slider
              min={0}
              max={10}
              stepSize={1}
              labelStepSize={2}
              onChange={e => {
                getChangeHandler(e);
              }}
              value={tokenValue > 10 ? 10 : tokenValue}
              vertical={false}
            />
          </div>
          <div style={{marginTop:"20px"}}>
          <Label className={Classes.INLINE} style={{textAlign: "left"}}>
            Enter Token Amount
            <span>
              <NumericInput
              allowNumericCharactersOnly={true}
              buttonPosition={"right"}
              disabled={false}
              fill={true}
              intent={Intent.PRIMARY}
              large={false}
              majorStepSize={10}
              max={100}
              min={0}
              minorStepSize={1}
              selectAllOnFocus={false}
              selectAllOnIncrement={false}
              stepSize={1}
              value={tokenValue}
              placeholder="Enter a tokens..."
              onValueChange={setTokenValue}
            />
            </span>
            </Label>
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="This button is hooked up to close the dialog.">
              <Button>Close</Button>
            </Tooltip>
            <AnchorButton
              intent={Intent.PRIMARY}
              href="https://www.palantir.com/palantir-foundry/"
              target="_blank"
            >
              Visit the Foundry website
            </AnchorButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    transactions: state.mainReducer.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: () => {
      getTransactions(dispatch);
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wallet)
);

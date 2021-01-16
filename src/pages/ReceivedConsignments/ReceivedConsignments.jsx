import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { counterParty, ghgType, certType } from "../../constants";
import {
  getReceivedConsignments,
  sendSyncConsignment,
} from "../../actions/actionCreators";
import FadeIn from "../../components/Transitions/FadeIn";
import { AppToaster, AppToasterBottomLeft } from "../../components/AppToaster/AppToaster";
import {
  Card,
  H2,
  HTMLTable,
  InputGroup,
  Checkbox,
  ButtonGroup,
  Button,
  Classes,
  Dialog,
  FormGroup,
  Popover,
  Position,
  Menu,
  Slider,
  H5,
  Tooltip
} from "@blueprintjs/core";

const displayToaster = (intent, message) => {
  AppToaster.show({
    icon: intent === "danger" ? "error" : "info-sign",
    message: message,
    intent: intent,
  });
};

const displayToasterBl = (intent, message) => {
  AppToasterBottomLeft.show({
    icon: intent === "danger" ? "error" : "info-sign",
    message: message,
    intent: intent,
    timeout: 6000
  });
};


const doNothing = () => {};

const filterItem = (query, item) => {
  return `${item.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
};

function ReceivedConsignments({
  getReceivedConsignments,
  receivedConsignments,
  theme
}) {
  const [query, setQuery] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendParams, setSendParams] = useState({
    consignmentId: null,
    address: null,
    to: null,
    litres: 0,
    feedstock: null,
    ghg: null,
    cert: null,
    country: null,
  });

  const [createWindowState, setCreateWindowState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
    data: [],
  });

  useEffect(() => {
    getReceivedConsignments(doNothing, doNothing);
  }, []);

  const refreshConsignments = () => {
    getReceivedConsignments(doNothing, doNothing);
  };

  const getOilBalance = (wallets) => {
    let balance = 0;

    wallets.forEach((item) => {
      console.log(item);
      balance = balance + (isNaN(item.Quantity) ? 0 : parseInt(item.Quantity));
    });

    console.log("BALANCE: ", balance)
    return balance;
  };

  const getTotalToSend = (wallets) => {
    let balance = 0;

    wallets.forEach((item) => {
      balance = balance + item.amountToSend;
    });

    return balance;
  };

  const TraderMenu = ({ setName }) => {
    return (
      <Menu>
        <Menu.Item text={counterParty} onClick={() => setName(counterParty)} />
      </Menu>
    );
  };

  const ConstantsMenu = ({ items, setName }) => {
    return (
      <Menu>
        {items.map((item) => {
          return <Menu.Item text={item} onClick={() => setName(item)} />;
        })}
      </Menu>
    );
  };

  function recursiveDownloadChain(items) {
    const item = items.shift();
  
    if (item) {
      return sendSyncConsignment(
        () => {
          //  getWallets(
          //    doNothing,
          //    doNothing,
          //    createWindowState.data[0].Oil_type
          //  );
          setCreateWindowState({
            ...createWindowState,
            isOpen: false,
          });
        },
        doNothing,
        sendParams,
        item.Feedstock,
        item.Consignment_id,
        item.amountToSend
      ).then((data) => {
        console.log("callback data: ", data)
        if( data.data.returnCode === "Failure"){
          console.log("DISPLAY TOASTER")
          //displayToaster("danger", `Failed to send consignment. ${data.data.info.peerErrors[0].errMsg}`)
        }
        recursiveDownloadChain(items)
      });
    } else {
      return Promise.resolve();
    }
  }
  

  return (
    <FadeIn>
      <Card className="table-card" elevation={2}>
        <H2>Received Consignments (Balance: {getOilBalance(receivedConsignments)})</H2>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <InputGroup
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            style={{ minWidth: "400px" }}
            leftIcon="search"
            type="search"
            placeholder="Search..."
          />
          <Button
            disabled={disableButton}
            onClick={() => {
              //createConsignment(doNothing, doNothing, item.Oil_type, [item.Wallet_id], "10")
              setCreateWindowState({
                ...setCreateWindowState,
                isOpen: true,
                data: [
                  ...receivedConsignments.filter((i) => i.checked === true),
                ],
              });
            }}
            icon="plus"
            intent="success"
          >
            Create Consignment
          </Button>
        </div>
        {receivedConsignments.length !== 0 ? (
          <HTMLTable
            className="html-table"
            interactive
            striped
            condensed
            bordered
            style={{ minWidth: "100%", maxWidth: "100vw", width: "95vw" }}
          >
            <thead>
              <tr>
                <th></th>
                <th align="center">Transaction ID</th>
                <th>From</th>
                <th>To</th>
                <th>To Address</th>
                <th>To Country</th>
                <th>Consignment ID</th>
                <th>Quantity</th>
                <th>Feedstock</th>
                <th>GHG</th>
                <th>Certification</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody className="report-data-records">
              {receivedConsignments.map((item) => {
                if (
                  filterItem(
                    query,
                    `
                    ${item.Transaction_id} 
                    ${item.Owner} 
                    ${item.Trader_To} 
                    ${item.Trader_To_Address}
                    ${item.Trader_To_Country}
                    ${item.Consignment_id}
                    ${item.Quantity}
                    ${item.Feedstock}
                    ${item.GHG}
                    ${item.Cert}
                    ${item.Datetime}
                    `
                  )
                ) {
                  return (
                    <tr
                      onClick={() => {
                        console.log("Click row...", item);
                        //setDrawerState({
                        //  ...drawerState,
                        //  size: isDesktop ? "90vh" : "100vh",
                        //  isOpen: true,
                        //  data: { ...item },
                        //});
                      }}
                    >
                      <td>
                        {" "}
                        <Checkbox
                          large
                          onChange={() => {
                            item.checked = !item.checked;
                            console.log(item);
                            setDisableButton(false);
                          }}
                        />
                      </td>
                      <td>{item.Transaction_id}</td>
                      <td>{item.Owner}</td>
                      <td>{item.Trader_To}</td>
                      <td>{item.Trader_To_Address}</td>
                      <td>{item.Trader_To_Country}</td>
                      <td>{item.Consignment_id}</td>
                      <td>{item.Quantity}</td>
                      <td>{item.Feedstock}</td>
                      <td>{item.GHG}</td>
                      <td>{item.Cert}</td>
                      <td>{item.Datetime}</td>
                    </tr>
                  );
                } else {
                  return <></>;
                }
              })}
            </tbody>
          </HTMLTable>
        ) : (
          <></>
        )}
      </Card>
      <Dialog
        className={`${Classes.OVERLAY_SCROLL_CONTAINER} ${theme}`}
        {...createWindowState}
        onClose={() => {
          setCreateWindowState({ ...setCreateWindowState, isOpen: false });
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Recipient" labelInfo="(required)">
            <InputGroup
              disabled={isLoading}
              placeholder="Select receipient name..."
              value={sendParams.to}
              readOnly
              rightElement={
                <Popover
                  position={Position.LEFT_BOTTOM}
                  content={
                    <TraderMenu
                      setName={(val) => {
                        setSendParams({ ...sendParams, to: val });
                      }}
                    />
                  }
                >
                  <Button text="Select" />
                </Popover>
              }
            />
          </FormGroup>
          <FormGroup label="Address" labelInfo="(required)">
            <InputGroup
              disabled={isLoading}
              placeholder="Enter address..."
              value={sendParams.Address}
              onChange={(e) => {
                setSendParams({ ...sendParams, address: e.target.value });
                //setValidation({ ...validation, name: e.target.value != "" });
              }}
            />
          </FormGroup>
          <FormGroup label="GHG" labelInfo="(required)">
            <InputGroup
              disabled={isLoading}
              placeholder="Select GHG..."
              value={sendParams.ghg}
              readOnly
              rightElement={
                <Popover
                  position={Position.LEFT_BOTTOM}
                  content={
                    <ConstantsMenu
                      items={ghgType}
                      setName={(val) => {
                        setSendParams({ ...sendParams, ghg: val });
                      }}
                    />
                  }
                >
                  <Button text="Select" />
                </Popover>
              }
            />
          </FormGroup>
          <FormGroup label="Certification" labelInfo="(required)">
            <InputGroup
              disabled={isLoading}
              placeholder="Select certification..."
              value={sendParams.cert}
              readOnly
              rightElement={
                <Popover
                  position={Position.LEFT_BOTTOM}
                  content={
                    <ConstantsMenu
                      items={certType}
                      setName={(val) => {
                        setSendParams({ ...sendParams, cert: val });
                      }}
                    />
                  }
                >
                  <Button text="Select" />
                </Popover>
              }
            />
          </FormGroup>
          <FormGroup label="Country" labelInfo="(required)">
            <InputGroup
              disabled={isLoading}
              placeholder="Enter country..."
              value={sendParams.country}
              onChange={(e) => {
                setSendParams({ ...sendParams, country: e.target.value });
                //setValidation({ ...validation, name: e.target.value != "" });
              }}
            />
          </FormGroup>

          <HTMLTable>
            <thead>
              <tr>
                <th>Consignment ID</th>
                <th>Remaining Balance</th>
                <th>Amount to transfer</th>
              </tr>
            </thead>
            <tbody>
              {createWindowState.data &&
                createWindowState.data.map((item, i) => {
                  return (
                    <tr>
                      <td>{item.Consignment_id}</td>
                      <td>{parseInt(item.Quantity) - item.amountToSend}</td>
                      <td>
                        {item && (
                          <Slider
                            id={i}
                            min={0}
                            max={parseInt(item.Quantity)}
                            //max={10}
                            stepSize={1}
                            labelStepSize={25}
                            onChange={(val) => {
                              console.log(val);
                              let myData = [...createWindowState.data];
                              myData[i].amountToSend = val;
                              setCreateWindowState({
                                ...createWindowState,
                                data: [...myData],
                              });
                            }}
                            value={item.amountToSend}
                            vertical={false}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </HTMLTable>
          <H5>
            Total to send:{" "}
            {createWindowState.data && getTotalToSend(createWindowState.data)}
          </H5>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="This button will close the dialog and cancel.">
              <Button
                onClick={() => {
                  setCreateWindowState({ ...createWindowState, isOpen: false });
                }}
              >
                Close
              </Button>
            </Tooltip>
            <Button
              disabled={
                createWindowState.data && createWindowState.data.length === 0
              }
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);

                recursiveDownloadChain([...createWindowState.data]).then(() => {
                  setIsLoading(false);
                  refreshConsignments();
                  displayToasterBl("primary", "All Consignments finished processing.");
                  setCreateWindowState({ ...createWindowState, isOpen: false });
                });

                // createWindowState.data.forEach( (item) => {
                //      sendSyncConsignment(
                //       () => {
                //         //  getWallets(
                //         //    doNothing,
                //         //    doNothing,
                //         //    createWindowState.data[0].Oil_type
                //         //  );
                //         setCreateWindowState({
                //           ...createWindowState,
                //           isOpen: false,
                //         });
                //       },
                //       displayToaster,
                //       sendParams,
                //       item.Oil_type,
                //       item.Consignment_id,
                //       item.amountToSend
                //     );
                // });
              }}
              intent="success"
            >
              Send
            </Button>
          </div>
        </div>
      </Dialog>
    </FadeIn>
  );
}

const mapStateToProps = (state) => {
  const myList = state.mainReducer.receivedConsignments.map((item) => {
    return { ...item, checked: false, amountToSend: parseInt(item.Quantity) };
  });

  return {
    receivedConsignments: myList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReceivedConsignments: (callback, displayToast) =>
      getReceivedConsignments(callback, displayToast, dispatch),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReceivedConsignments)
);

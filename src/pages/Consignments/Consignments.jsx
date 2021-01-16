import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  HTMLTable,
  Card,
  Tag,
  Button,
  Alert,
  Intent,
  Tab,
  Tabs,
  Icon,
  H1,
  H5,
  Spinner,
  Drawer,
  Position,
  Classes,
  Code,
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  FormGroup,
  InputGroup,
  ButtonGroup,
  H2,
  ContextMenuTarget,
  Overlay,
  Dialog,
  Tooltip,
  AnchorButton,
  Checkbox,
  NumericInput,
  Slider,
  H4,
} from "@blueprintjs/core";
import {
  getUcoWallets,
  getUcoVegWallets,
  getCollections,
  getJobById,
  getWallets,
  getAvailableConsignments,
  sendConsignment,
  sendSyncConsignment,
  getWallet
} from "../../actions/actionCreators";
import "./Consignments.css";
import FadeIn from "../../components/Transitions/FadeIn";
import { AppToaster } from "../../components/AppToaster/AppToaster";
import WorldMap from "../../components/Maps/WorldMap";
import { counterParty, ghgType, certType, driverLat } from "../../constants";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const displayToaster = (intent, message) => {
  AppToaster.show({
    icon: intent === "danger" ? "error" : "info-sign",
    message: message,
    intent: intent,
  });
};

const doNothing = () => {};

const Consignments = ({
  theme,
  getUcoWallets,
  getUcoVegWallets,
  ucoWallets,
  ucoVegWallets,
  getCollections,
  collections,
  getJob,
  job,
  wallets,
  wallet,
  getWallets,
  getWallet,
  availableConsignments,
  getAvailableConsignments,
}) => {
  const [walletType, setWalletType] = useState("UCO");
  const [disableSend, setDisableSend] = useState(true);
  const [createWindowIsOpen, setCreateWindowIsOpen] = useState(false);
  const [drawerState, setDrawerState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    position: Position.BOTTOM,
    size: "90vh",
    usePortal: true,
    title: "Dump Location",
    data: {},
  });

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

  const [collectionsDrawerState, setCollectionsDrawerState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    position: Position.RIGHT,
    size: "90vw",
    usePortal: true,
    title: "Collection",
    data: {},
  });

  const [walletDrawerState, setWalletDrawerState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    position: Position.RIGHT,
    size: "90vw",
    usePortal: true,
    title: "Wallet",
    data: {},
  });

  const [jobDrawerState, setJobDrawerState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    position: Position.RIGHT,
    size: "30vw",
    usePortal: true,
    title: "Job",
    data: {},
  });

  const [collectionIsLoading, setCollectionIsLoading] = useState(false);
  const [jobIsLoading, setJobIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disableSendConsignment, setDisableSendConsignment] = useState(true);

  const [createWindowState, setCreateWindowState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
    data: [],
  });

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
        displayToaster,
        sendParams,
        item.Oil_type,
        item.Consignment_id,
        item.amountToSend
      ).then((_) => recursiveDownloadChain(items));
    } else {
      return Promise.resolve();
    }
  }

  const refreshConsignments = () => {
    getAvailableConsignments(doNothing, doNothing, "UCO");
    getAvailableConsignments(doNothing, doNothing, "UCO_VEG");
  };

  useEffect(() => {
    getWallets(doNothing, doNothing, walletType);
    getAvailableConsignments(doNothing, doNothing, walletType);
  }, [walletType]);

  useEffect(() => {
    getUcoWallets(doNothing, doNothing);
  }, []);

  useEffect(() => {
    getUcoVegWallets(doNothing, doNothing);
  }, []);

  const { innerWidth: width, innerHeight: height } = window;
  const isDesktop = width > 600 ? true : false;

  console.log("WALLETS: ", ucoWallets, ucoVegWallets);

  //const wallets = ucoWallets.concat(ucoVegWallets);

  const getOilBalance = (wallets) => {
    let balance = 0;

    wallets.forEach((item) => {
      console.log(item);
      balance = balance + parseInt(item.Quantity);
    });

    return balance;
  };

  const getTotalToSend = (wallets) => {
    let balance = 0;

    wallets.forEach((item) => {
      balance = balance + item.amountToSend;
    });

    return balance;
  };

  const handleKeyDown = (e) => {
    console.log("keydown", e.keyCode);
    if (e.keyCode == 69 || e.keyCode == 189 /* '-' key */) {
      // ignore the keystroke
      e.preventDefault();
    }
  };

  return (
    <>
      <FadeIn>
        <Card className="wallet-card" elevation={2}>
          <H2>Available Consignments</H2>

          <ButtonGroup>
            <Button
              active={walletType === "UCO"}
              intent="success"
              onClick={() => setWalletType("UCO")}
            >
              UCO
            </Button>
            <Button
              active={walletType === "UCO_VEG"}
              intent="success"
              onClick={() => setWalletType("UCO_VEG")}
            >
              UCO VEG
            </Button>
          </ButtonGroup>
          <H4>
            {walletType} Balance: {getOilBalance(availableConsignments)}
          </H4>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
            disabled={disableSendConsignment}
              onClick={() => {
                //createConsignment(doNothing, doNothing, item.Oil_type, [item.Wallet_id], "10")
                setCreateWindowState({
                  ...setCreateWindowState,
                  isOpen: true,
                  data: [
                    ...availableConsignments.filter((i) => i.checked === true),
                  ],
                });
              }}
              icon="send-to"
              intent="success"
            >
              Send Consignment(s)
            </Button>
          </div>
          <hr />

          {availableConsignments && availableConsignments.length !== 0 ? (
            <HTMLTable
              interactive
              striped
              condensed
              bordered
              style={{ minWidth: "100%" }}
            >
              <thead>
                <tr>
                  <th></th>
                  <th align="center">Consignment ID</th>
                  <th>Owner</th>
                  <th>Oil Type</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Wallets</th>
                </tr>
              </thead>
              <tbody className="report-data-records">
                {availableConsignments &&
                  availableConsignments.map((item) => {
                    return (
                      <tr
                      // onClick={() => {
                      //   console.log("Click row...", item);
                      //   setDrawerState({
                      //     ...drawerState,
                      //     size: isDesktop ? "90vh" : "100vh",
                      //     isOpen: true,
                      //     data: { ...item },
                      //   });
                      // }}
                      >
                        <td>
                          <Checkbox
                            large
                            onChange={() => {
                              item.checked = !item.checked;
                              console.log(item);
                              console.log(availableConsignments);
                              setDisableSendConsignment(false)
                            }}
                          />
                        </td>
                        <td>{item.Consignment_id}</td>
                        <td>{item.Owner}</td>
                        <td>{item.Oil_type}</td>
                        <td>{parseInt(item.Quantity)}</td>
                        <td>{item.Datetime}</td>
                        <td>
                          {item.Wallets.map((wallet) => {
                            return (
                              <Button
                                onClick={() => {
                                  console.log("wallet: ", item, wallet);
                                  setCollectionIsLoading(true);
                                  getWallet(
                                    () => {
                                      setCollectionIsLoading(false);
                                    },
                                    doNothing,
                                    wallet
                                  );
                                  setWalletDrawerState({
                                    ...walletDrawerState,
                                    size: isDesktop ? "40vw" : "100vw",
                                    isOpen: true,
                                    data: { ...item },
                                  });
                                }}
                                minimal
                                intent="success"
                                style={{ margin: "2px" }}
                              >
                                {wallet}
                              </Button>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </HTMLTable>
          ) : (
            <></>
          )}
        </Card>
      </FadeIn>
      <Drawer
        className={theme}
        {...drawerState}
        onClose={() => setDrawerState({ ...drawerState, isOpen: false })}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <WorldMap
              lat={drawerState.data.Dump_lattitude}
              long={drawerState.data.Dump_longitude}
            />
          </div>
        </div>
      </Drawer>
      <Drawer
        className={theme}
        {...walletDrawerState}
        onClose={() =>
          setWalletDrawerState({
            ...walletDrawerState,
            isOpen: false,
          })
        }
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <div>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Wallet Id: </b>
                {wallet.Wallet_id}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Oil Quantity: </b>
                {wallet.Quantity}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Measurement Unit: </b>
                {wallet.Measurement_unit}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Oil Type: </b>
                {wallet.Oil_type}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Owner: </b>
                {wallet.Owner}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Asset Type: </b>
                {wallet.AssetType}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Dump Location: </b>
                {wallet.Dump_longitude} {wallet.Dump_lattitude}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Timestamp: </b>
                {wallet.Datetime}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Collections: </b>
                {Array.isArray(wallet.Driver_collections) && wallet.Driver_collections.map((item)=>{
                  return <Button 
                  onClick={() => {
                    setCollectionIsLoading(true);
                    getCollections(
                      () => {
                        setCollectionIsLoading(false);
                      },
                      doNothing,
                      item
                    );
                    setCollectionsDrawerState({
                      ...collectionsDrawerState,
                      size: isDesktop ? "60vw" : "100vw",
                      isOpen: true,
                      data: { ...item },
                      collectionId: item
                    });
                  }}
                  style={{margin: "2px"}} minimal intent="success">{item}</Button>
                })}
              </p>
            </div>
          </div>
        </div>
      </Drawer>
      <Drawer
        className={theme}
        {...collectionsDrawerState}
        onClose={() =>
          setCollectionsDrawerState({
            ...collectionsDrawerState,
            isOpen: false,
          })
        }
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <div>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Collection Id: </b>
                {collections.Collection_id}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Driver Id: </b>
                {collections.Driver_id}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Restaurant Id: </b>
                {collections.Restaurant_id}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Oil Collected: </b>
                {collections.Oil_collected}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Measurement Unit: </b>
                {collections.Measurement_unit}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Oil Type: </b>
                {collections.Oil_type}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Owner: </b>
                {collections.Owner}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Asset Type: </b>
                {collections.AssetType}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Driver Location: </b>
                {collections.Driver_longitude} {collections.Driver_lattitude}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job ID: </b>
                <Button
                  onClick={() => {
                    setJobDrawerState({ ...jobDrawerState, isOpen: true });
                    setJobIsLoading(true);
                    getJob(() => {
                      setJobIsLoading(false);
                    }, collections.Job_id);
                  }}
                  minimal
                  intent="success"
                >
                  {collections.Job_id}
                </Button>
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Timestamp: </b>
                {collections.Datetime}
              </p>
            </div>
          </div>
        </div>
      </Drawer>
      <Drawer
        className={theme}
        {...jobDrawerState}
        onClose={() =>
          setJobDrawerState({
            ...jobDrawerState,
            isOpen: false,
          })
        }
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <div>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Id: </b>
                {job.job_id}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Driver Id: </b>
                {job.assigneddriverid}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Assigned: </b>
                {job.collection_assigned}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Collected: </b>
                {job.collection_completed}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Measurement Unit: </b>
                {job.job_measurement_unit}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Date: </b>
                {job.job_date}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Sign: </b>
                {job.job_sign}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Status: </b>
                {job.job_status}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Sign Date: </b>
                {job.job_sign_date}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Collection Target: </b>
                {job.job_collection_target}
              </p>
            </div>
          </div>
        </div>
      </Drawer>
      <Dialog
        className={`${Classes.OVERLAY_SCROLL_CONTAINER} ${theme}`}
        {...createWindowState}
        onClose={() => {
          setCreateWindowState({ ...setCreateWindowState, isOpen: false });
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <H2>Send Consignments</H2>
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
                        setDisableSend(false)
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
          <H5>Total to send: {createWindowState.data && getTotalToSend(createWindowState.data)}</H5>
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
            disabled={createWindowState.data && createWindowState.data.length === 0 || disableSend}
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);

                recursiveDownloadChain([...createWindowState.data]).then(() => {
                  setIsLoading(false);
                  refreshConsignments();
                  displayToaster("success", "Consignments sent successfully.");
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
    </>
  );
};

const mapStateToProps = (state) => {
  const myConsignments = state.mainReducer.availableConsignments.map((item) => {
    return { ...item, checked: false, amountToSend: parseInt(item.Quantity) };
  });
  console.log("myConsignments", myConsignments);
  return {
    ucoWallets: state.mainReducer.ucoWallets,
    ucoVegWallets: state.mainReducer.ucoVegWallets,
    collections: state.mainReducer.collections,
    job: state.mainReducer.jobs,
    wallets: state.mainReducer.wallets,
    availableConsignments: myConsignments,
    wallet: state.mainReducer.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableConsignments: (callback, displayToast, walletType) =>
      getAvailableConsignments(callback, displayToast, walletType, dispatch),
    getUcoWallets: (callback, displayToast) =>
      getUcoWallets(callback, displayToast, dispatch),
    getUcoVegWallets: (callback, displayToast) =>
      getUcoVegWallets(callback, displayToast, dispatch),
    getWallets: (callback, displayToast, walletType) =>
      getWallets(callback, displayToast, walletType, dispatch),
    getCollections: (callback, displayToast, collectionsList) =>
      getCollections(callback, displayToast, collectionsList, dispatch),
      getWallet: (callback, displayToast, walletId) =>
      getWallet(callback, displayToast, walletId, dispatch),
    getJob: (callback, jobId) => getJobById(callback, jobId, dispatch),
    sendConsignment: (
      callback,
      displayToast,
      sendParams,
      feedstock,
      consignmentId,
      amountToSend
    ) =>
      sendConsignment(
        callback,
        displayToast,
        sendParams,
        feedstock,
        consignmentId,
        amountToSend,
        dispatch
      ),
    sendSyncConsignment: (
      callback,
      displayToast,
      sendParams,
      feedstock,
      consignmentId,
      amountToSend
    ) =>
      sendSyncConsignment(
        callback,
        displayToast,
        sendParams,
        feedstock,
        consignmentId,
        amountToSend,
        dispatch
      ),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Consignments)
);

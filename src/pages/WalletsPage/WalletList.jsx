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
  NumericInput,
  Checkbox,
} from "@blueprintjs/core";
import {
  getUcoWallets,
  getUcoVegWallets,
  getCollections,
  getJobById,
  getWallets,
  createConsignment,
} from "../../actions/actionCreators";
import "./WalletList.css";
import FadeIn from "../../components/Transitions/FadeIn";
import { AppToaster } from "../../components/AppToaster/AppToaster";
import WorldMap from "../../components/Maps/WorldMap";
import CollectionsDrawer from "../../components/CollectionsDrawer/CollectionsDrawer";

const displayToaster = (intent, message) => {
  AppToaster.show({
    icon: intent === "danger" ? "error" : "info-sign",
    message: message,
    intent: intent,
  });
};

const handleKeyDown = (e) => {
  console.log("keydown", e.keyCode);
  if (e.keyCode == 69 || e.keyCode == 189 /* '-' key */) {
    // ignore the keystroke
    e.preventDefault();
  }
};

const doNothing = () => {};

const WalletList = ({
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
  getWallets,
  createConsignment,
}) => {
  const [walletType, setWalletType] = useState("UCO");
  const [litres, setLitres] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [createWindowState, setCreateWindowState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
    data: [],
  });
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
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    getWallets(doNothing, doNothing, walletType);
  }, [walletType]);

  useEffect(() => {
    getUcoWallets(doNothing, doNothing);
  }, []);

  useEffect(() => {
    getUcoVegWallets(doNothing, doNothing);
  }, []);

  useEffect(() => {
    console.log("JOB: ", job);
  }, [job]);

  const { innerWidth: width, innerHeight: height } = window;
  const isDesktop = width > 600 ? true : false;

  console.log("WALLETS: ", ucoWallets, ucoVegWallets);

  //const wallets = ucoWallets.concat(ucoVegWallets);

  const getOilBalance = (wallets) => {
    let balance = 0;

    wallets.forEach((item) => {
      balance = balance + (isNaN(item.Quantity) ? 0 : parseInt(item.Quantity));
    });

    return balance;
  };

  return (
    <>
      <FadeIn>
        <Card className="wallet-card" elevation={2}>
          <H2>Wallets</H2>
          <HTMLTable interactive striped condensed bordered>
            <thead>
              <tr>
                <th align="center">Oil Type</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={() => {
                  setWalletType("UCO");
                }}
              >
                <td>UCO</td>
                <td>{getOilBalance(ucoWallets)}</td>
              </tr>
              <tr
                onClick={() => {
                  setWalletType("UCO_VEG");
                }}
              >
                <td>UCO VEG</td>
                <td>{getOilBalance(ucoVegWallets)}</td>
              </tr>
            </tbody>
          </HTMLTable>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              disabled={disableButton}
              onClick={() => {
                //createConsignment(doNothing, doNothing, item.Oil_type, [item.Wallet_id], "10")
                setCreateWindowState({
                  ...setCreateWindowState,
                  isOpen: true,
                  data: [...wallets.filter((i) => i.checked === true)],
                });
              }}
              icon="plus"
              intent="success"
            >
              Create Consignment
            </Button>
          </div>
          <hr />

          {wallets.length !== 0 ? (
            <HTMLTable
              interactive
              striped
              condensed
              bordered
              style={{ minWidth: "100%" }}
            >
              <thead>
                <tr>
                  <th align="center"></th>
                  <th align="center">Wallet ID</th>
                  <th>Owner</th>
                  <th>Oil Type</th>
                  <th>Quantity</th>
                  <th>Measurement Unit</th>
                  <th>Date</th>
                  <th>Dump Location</th>
                  <th>Address</th>
                  <th>Collections</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="report-data-records">
                {wallets.map((item) => {
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
                      <td align="center">
                        <Checkbox
                          large
                          onChange={() => {
                            item.checked = !item.checked;
                            console.log(item);
                            console.log(wallets);
                            setDisableButton(false);
                          }}
                        />
                      </td>
                      <td>{item.Wallet_id}</td>
                      <td>{item.Owner}</td>
                      <td>{item.Oil_type}</td>
                      <td>{item.Quantity}</td>
                      <td>{item.Measurement_unit}</td>
                      <td>{item.Datetime}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setDrawerState({
                              ...drawerState,
                              size: isDesktop ? "90vh" : "100vh",
                              isOpen: true,
                              data: { ...item },
                            });
                          }}
                          minimal
                          intent="success"
                          style={{ margin: "2px" }}
                        >{`${item.Dump_lattitude} ${item.Dump_longitude}`}</Button>
                      </td>
                      <td>{item.Address}</td>
                      <td>
                        {item.Driver_collections.map((collection) => {
                          return (
                            <Button
                              onClick={() => {
                                console.log("collection: ", item, collection);
                                setCollectionIsLoading(true);
                                getCollections(
                                  () => {
                                    setCollectionIsLoading(false);
                                  },
                                  doNothing,
                                  collection
                                );
                                setCollectionsDrawerState({
                                  ...collectionsDrawerState,
                                  size: isDesktop ? "60vw" : "100vw",
                                  isOpen: true,
                                  data: { ...item },
                                  collectionId: collection
                                });
                              }}
                              minimal
                              intent="success"
                              style={{ margin: "2px" }}
                            >
                              {collection}
                            </Button>
                          );
                        })}
                      </td>
                      <td></td>
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
      <CollectionsDrawer
        theme={theme}
        setCollectionsDrawerState={setCollectionsDrawerState}
        collectionsDrawerState={collectionsDrawerState}
        collectionIsLoading={collectionIsLoading}
      />
      <Dialog
        className={`${Classes.OVERLAY_SCROLL_CONTAINER} ${theme}`}
        {...createWindowState}
        onClose={() => {
          setCreateWindowState({ ...setCreateWindowState, isOpen: false });
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <H2>Create Consignment</H2>
          <p>
            <strong>Create Consignment for the following wallets</strong>
          </p>
          <HTMLTable>
            <thead>
              <tr>
                <th>Wallet ID</th>
                <th>Wallet amount</th>
              </tr>
            </thead>
            <tbody>
              {createWindowState.data.map((item) => {
                return (
                  <tr>
                    <td>{item.Wallet_id}</td>
                    <td>{item.Quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </HTMLTable>
          <H5>Total: {getOilBalance(createWindowState.data)}</H5>
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
              disabled={createWindowState.data.length === 0}
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                createConsignment(
                  () => {
                    setIsLoading(false);
                    getWallets(
                      doNothing,
                      doNothing,
                      createWindowState.data[0].Oil_type
                    );
                    setCreateWindowState({
                      ...createWindowState,
                      isOpen: false,
                    });
                  },
                  displayToaster,
                  createWindowState.data[0].Oil_type,
                  createWindowState.data.map((item) => item.Wallet_id),
                  `${getOilBalance(createWindowState.data)}`
                );
              }}
              intent="success"
            >
              Create Consignment
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  const myWallets = state.mainReducer.wallets.map((item) => {
    return { ...item, checked: false };
  });
  console.log("MyWallets", myWallets);
  return {
    ucoWallets: state.mainReducer.ucoWallets,
    ucoVegWallets: state.mainReducer.ucoVegWallets,
    collections: state.mainReducer.collections,
    job: state.mainReducer.jobs,
    wallets: myWallets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUcoWallets: (callback, displayToast) =>
      getUcoWallets(callback, displayToast, dispatch),
    getUcoVegWallets: (callback, displayToast) =>
      getUcoVegWallets(callback, displayToast, dispatch),
    getWallets: (callback, displayToast, walletType) =>
      getWallets(callback, displayToast, walletType, dispatch),
    getCollections: (callback, displayToast, collectionsList) =>
      getCollections(callback, displayToast, collectionsList, dispatch),
    getJob: (callback, jobId) => getJobById(callback, jobId, dispatch),
    createConsignment: (callback, displayToast, oilType, walletList, amount) =>
      createConsignment(
        callback,
        displayToast,
        oilType,
        walletList,
        amount,
        dispatch
      ),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WalletList)
);

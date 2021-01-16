// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Cell, Column, Table, TableLoadingOption, CopyCellsMenuItem } from "@blueprintjs/table";
import {
  Card,
  Elevation,
  Icon,
  Intent,
  Code,
  Callout,
  Button,
  Overlay,
  Classes,
  Popover,
  Menu,
  PopoverPosition,
  H4
} from "@blueprintjs/core";
import {
  openPopup,
  openAddTokensPopup
} from "../../actions/popupActionCreators";
import Helpers from "../Helpers/Helpers";
import "../../App.css";
import "./Accounts.css";
import CreateAccountForm from "../Forms/CreateAccountForm";
import classNames from "classnames";
import { getAccounts } from "../../actions/actionCreators";

const colMap = {
  0: "name",
  1: "uuid",
  2: "host",
  3: "balance",
  4: "total_tx_value",
  5: "timestamp"
};

const classes = classNames(
  Classes.CARD,
  Classes.ELEVATION_4,
  "account-overlay"
);

const myProps = {
  modifiers: {
    arrow: { enabled: true },
    flip: { enabled: true },
    keepTogether: { enabled: true },
    preventOverflow: { enabled: false }
  }
};

function AccountMenu({ openAddTokens, uuid, data }) {



  return (
    <Menu>
      <Menu.Item
        icon="new-object"
        text="Add Tokens"
        onClick={() => openAddTokens(uuid, data)}
      />
      <Menu.Item disabled icon="locate" text="Locate Asset" />
    </Menu>
  );
}

function AccountsTable({ data, openPopup, theme, getAccounts, openAddTokens }) {
  //const [values, setVaules] = useState({});
  const [isOpenCreateAccount, setIsOpenCreateAccount] = useState(false);

  useEffect(() => {
    getAccounts();
  }, []);

  const getCellData = (rowIndex, columnIndex, _data) => {
    return _data[rowIndex][colMap[columnIndex]];
  };

  const renderBodyContextMenu = context => {
    //console.log("Context: ", context);
    return (
      <Menu>
        <CopyCellsMenuItem
          context={context}
          getCellData={(rowIndex, columnIndex) =>
            getCellData(rowIndex, columnIndex, data)
          }
          text="Copy"
        />
      </Menu>
    );
  };

  return (
    <>
      <Card interactive={false} elevation={Elevation.THREE}>
        <h2>
          Accounts Table
          <span
            className="help-icon"
            onClick={() => {
              openPopup(
                <Callout title="Accounts Table" intent={Intent.PRIMARY}>
                  Accounts can be viewed and managed here.
                </Callout>
              );
            }}
          >
            <sup>
              <Icon icon="help" iconSize={10} intent={Intent.PRIMARY} />
            </sup>
          </span>
        </h2>
        <p>
          To add tokens to the account, click on the <Code>Account Name</Code>{" "}
          or <Code>UUID</Code> and select <Code>Add Tokens</Code>
        </p>
        <Helpers
          style={{ marginBottom: "10px", marginTop: "5px", maxWidth: "30rem" }}
          title="Accounts Table"
          intent={Intent.PRIMARY}
        >
          This table displays all of the accounts on the <Code>Node</Code>
        </Helpers>
        {data.length > 0 ? (
          <Table
            numRows={!data.length ? 3 : data.length}
            columnWidths={[180, 250, 200, 100, 100, 200]}
            loadingOptions={data.length === 0 ? [TableLoadingOption.CELLS] : []}
            bodyContextMenuRenderer={renderBodyContextMenu}
          >
            <Column
              name="Account Name"
              cellRenderer={i =>
                data[i] ? (
                  <Cell>
                    <Popover
                      fill={true}
                      inheritDarkTheme
                      content={
                        <AccountMenu
                          uuid={data[i].uuid}
                          data={data[i]}
                          openAddTokens={openAddTokens}
                        />
                      }
                    >
                      <>{data[i].name}</>
                    </Popover>
                  </Cell>
                ) : (
                  <Cell />
                )
              }
            />
            <Column
              name="UUID"
              cellRenderer={i =>
                data[i] ? (
                  <Cell>
                    <Popover
                      {...myProps}
                      position={PopoverPosition.BOTTOM}
                      usePortal={true}
                      fill={true}
                      inheritDarkTheme
                      content={
                        <AccountMenu
                          uuid={data[i].uuid}
                          data={data[i]}
                          openAddTokens={openAddTokens}
                        />
                      }
                    >
                      <>{data[i].uuid}</>
                    </Popover>
                  </Cell>
                ) : (
                  <Cell />
                )
              }
            />
            <Column
              name="Host Name"
              cellRenderer={i =>
                data[i] ? <Cell>{data[i].host}</Cell> : <Cell />
              }
            />
            <Column
              name="Balance"
              cellRenderer={i =>
                data[i] ? <Cell>{data[i].balance}</Cell> : <Cell />
              }
            />
            <Column
              name="Total TX Value"
              cellRenderer={i =>
                data[i] ? <Cell>{data[i].total_tx_value}</Cell> : <Cell />
              }
            />
            <Column
              name="Timestamp"
              cellRenderer={i =>
                data[i] ? (
                  <Cell>
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit"
                    }).format(data[i].timestamp)}{" "}
                    GMT
                  </Cell>
                ) : (
                  <Cell />
                )
              }
            />
          </Table>
        ) : (
          <H4>
            You do not heave any accounts yet, click the create account button
            to create one.
          </H4>
        )}

        <Button
          intent={Intent.PRIMARY}
          icon="add"
          style={{ marginTop: "1rem", marginLeft: "auto", display: "block" }}
          onClick={() => {
            setIsOpenCreateAccount(true);
          }}
        >
          Create Account
        </Button>
      </Card>
      <Overlay
        className={`${theme}`}
        usePortal={true}
        isOpen={isOpenCreateAccount}
        onClose={() => {
          setIsOpenCreateAccount(false);
        }}
      >
        <div className={classes}>
          <CreateAccountForm
            closePopup={() => setIsOpenCreateAccount(false)}
            getAccounts={getAccounts}
          />
        </div>
      </Overlay>
    </>
  );
}

const mapStateToProps = state => {
  return {
    data: state.mainReducer.accounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPopup: payload => dispatch(openPopup(payload)),
    openAddTokens: (uuid, data) => dispatch(openAddTokensPopup(uuid, data)),
    getAccounts: () => getAccounts(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsTable);

// eslint-disable-next-line
import React from "react";
import { connect } from "react-redux";
import {
  Cell,
  Column,
  Table,
  TableLoadingOption,
  CopyCellsMenuItem
} from "@blueprintjs/table";
import {
  Card,
  Elevation,
  Icon,
  Intent,
  Code,
  Callout,
  Menu,
  Popover,
  Position,
  Button
} from "@blueprintjs/core";
import { openPopup } from "../../actions/popupActionCreators";
import Helpers from "../Helpers/Helpers";
import "../../App.css";
import "./CellFormat.css";

const getDuration = (start, end) => {
  var d1 = new Date(start);
  var d2 = new Date(end);

  var diff = (d2.getTime() - d1.getTime()) / 1000;
  diff /= 60;

  //console.log("@@@@ DURATION: ", diff)
  return Math.abs(Math.round(diff));
};

const colMap = {
  0: "id",
  1: "car_name",
  2: "parking_spot_name",
  3: "start_time",
  4: "start_time",
  5: "end_time",
  6: "end_time",
  7: "end_time",
  8: "car_location",
  9: "parking_location",
  10: "parking_consensus",
  11: "parking_charge",
  12: "token_type"
};

function ClosedTxTable({ data, accounts, setAccount, openPopup }) {
  //const [values, setVaules] = useState({});

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
    <Card interactive={false} elevation={Elevation.THREE}>
      <h2>
        Closed/Completed Parking Sessions
        <span
          className="help-icon"
          onClick={() => {
            openPopup(
              <Callout
                title="Closed/Completed Parking Sessions Table"
                intent={Intent.PRIMARY}
              >
                These are the parking session that are completed.
              </Callout>
            );
          }}
        >
          <sup>
            <Icon icon="help" iconSize={10} intent={Intent.PRIMARY} />
          </sup>
        </span>
      </h2>
      <Helpers
        style={{ marginBottom: "10px", marginTop: "5px", maxWidth: "30rem" }}
        title="Transaction Table"
        intent={Intent.PRIMARY}
      >
        This table displays all of the transaction history for the{" "}
        <Code>Node</Code>
      </Helpers>
      <Popover
        position={Position.RIGHT_BOTTOM}
        content={
          <Menu>
            {accounts.map(i => (
              <Menu.Item
                text={`${i.name}`}
                onClick={() => setAccount(i.uuid)}
              />
            ))}
            <Menu.Item text={`All accounts`} onClick={() => setAccount("")} />
          </Menu>
        }
      >
        <Button intent="primary" style={{ marginBottom: "5px" }} icon="filter">
          Filter by account
        </Button>
      </Popover>
      <Table
        numRows={!data.length ? 3 : data.length}
        columnWidths={[
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          100,
          150,
          150,
          120,
          150,
          80
        ]}
        loadingOptions={data.length === 0 ? [TableLoadingOption.CELLS] : []}
        bodyContextMenuRenderer={renderBodyContextMenu}
      >
        <Column
          name="Parking ID"
          cellRenderer={i => (data[i] ? <Cell>{data[i].id}</Cell> : <Cell />)}
        />
        <Column
          name="Car Name"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">{data[i].car_name}</Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="Parking Space Name"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">{data[i].parking_spot_name}</Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="Start Date"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">
                {data[i].start_time.split("T")[0]}
              </Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="Start Time"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">
                {data[i].start_time.split("T")[1]}
              </Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="End Date"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">
                {data[i].end_time.split("T")[0]}
              </Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="End Time"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">
                {data[i].end_time.split("T")[1]}
              </Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="Duration"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">{`${getDuration(
                data[i].start_time,
                data[i].end_time
              )} minutes`}</Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="Car Location"
          cellRenderer={i =>
            data[i] ? <Cell>{data[i].car_location}</Cell> : <Cell />
          }
        />
        <Column
          name="Parking Location"
          cellRenderer={i =>
            data[i] ? <Cell>{data[i].parking_location}</Cell> : <Cell />
          }
        />
        <Column
          name="Parking Consensus"
          cellRenderer={i =>
            data[i] ? (
              <Cell
                className="cell-format"
                intent={
                  data[i].parking_consensus === "Invalid"
                    ? Intent.DANGER
                    : Intent.SUCCESS
                }
              >
                {data[i].parking_consensus}
              </Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="Parking Charge"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">{data[i].parking_charge}</Cell>
            ) : (
              <Cell />
            )
          }
        />
        <Column
          name="Token Type"
          cellRenderer={i =>
            data[i] ? (
              <Cell className="cell-format">{data[i].token_type}</Cell>
            ) : (
              <Cell />
            )
          }
        />
      </Table>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    data: state.mainReducer.closedSessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPopup: payload => dispatch(openPopup(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClosedTxTable);

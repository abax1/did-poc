// eslint-disable-next-line
import React, { useState } from "react";
import { connect } from "react-redux";
import { Cell, Column, Table, TableLoadingOption } from "@blueprintjs/table";
import {
  Card,
  Elevation,
  Icon,
  Intent,
  Code,
  Callout
} from "@blueprintjs/core";
import { openPopup } from "../../actions/popupActionCreators";
import Helpers from "../Helpers/Helpers";
import "../../App.css";

function TxTable({ data, openPopup }) {
  //const [values, setVaules] = useState({});
  return (
    <Card interactive={false} elevation={Elevation.THREE}>
      <h2>
        Transaction Table
        <span
          className="help-icon"
          onClick={() => {
            openPopup(
              <Callout title="Transaction Table" intent={Intent.PRIMARY}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt eaque aut, facere mollitia esse, nulla tempora
                voluptates, nihil quidem quibusdam voluptatum veritatis commodi
                accusantium repellat! Corporis provident vel cumque nulla.
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
        <Table
          numRows={!data.length ? 3 : data.length}
          columnWidths={[100, 200, 200, 200, 100, 200, 100, 100, 100, 100, 100, 100]}
          loadingOptions={data.length === 0 ? [TableLoadingOption.CELLS] : []}
        >
          <Column
            name="ID"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].linear_id}</Cell> : <Cell />
            }
          />
          <Column
            name="TX Hash"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].tx_hash}</Cell> : <Cell />
            }
          />
          <Column
            name="Start Time"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].start_time}</Cell> : <Cell />
            }
          />
          <Column
            name="End Time"
            cellRenderer={i => (data[i] ? <Cell>{data[i].end_time}</Cell> : <Cell />)}
          />
          <Column
            name="Amount Paid"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].parkingCost}</Cell> : <Cell />
            }
          />
          <Column
            name="Token Type"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].token_type}</Cell> : <Cell />
            }
          />
          <Column
            name="Car Location"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].car_location}</Cell> : <Cell />
            }
          />
          <Column
            name="Parking Bay Location"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].parking_location}</Cell> : <Cell />
            }
          />
          <Column
            name="Consensus"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].parking_consensus}</Cell> : <Cell />
            }
          />
          <Column
            name="Car Owner"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].car_owner}</Cell> : <Cell />
            }
          />
          <Column
            name="Parking Bay Owner"
            cellRenderer={i =>
              data[i] ? <Cell>{data[i].parking_spot_owner}</Cell> : <Cell />
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
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    data: state.mainReducer.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPopup: payload => dispatch(openPopup(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TxTable);

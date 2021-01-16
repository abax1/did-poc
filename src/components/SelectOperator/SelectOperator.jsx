import * as React from "react";
import { Button, MenuItem, H5 } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import * as Tadigs from "./tagids";
import "./SelectOperator.css";

const OperatorSelect = Select.ofType();

const popoverProps = {
  boundary: "window",
  canEscapeKeyClose: true,
  exampleIndex: 0,
  hasBackdrop: false,
  inheritDarkTheme: true,
  modifiers: {
      arrow: { enabled: true },
      flip: { enabled: true },
      keepTogether: { enabled: true },
      preventOverflow: { enabled: true },
  },
  position: "auto",
  sliderValue: 5,
  usePortal: false,
}

class SelectOperator extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tadig: Tadigs.NETWORKS[0]
    };
  }
  render() {
    const buttonText = this.state.tadig.operator_name;
    return (
      <div className="operator-label">
        {this.props.label && <H5>{this.props.label}</H5>}
        <OperatorSelect
          fill
          items={Tadigs.NETWORKS}
          itemPredicate={Tadigs.filterTadig}
          itemRenderer={Tadigs.renderTadig}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleValueChange}
          popoverProps={{...popoverProps}}
        >
          <Button
            disabled={this.props.disabled}
            intent={this.props.intent}
            text={buttonText}
            rightIcon="caret-down"
          />
        </OperatorSelect>
      </div>
    );
  }

  handleValueChange = tadig => {
    console.log(tadig);
    this.setState({ tadig: tadig });
    if (this.props.setTadig) {
      this.props.setTadig(tadig);
    }
  };
}

export default SelectOperator;

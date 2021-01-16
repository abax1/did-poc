import * as React from "react";
import { Button, MenuItem, H5 } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

import * as Tadigs from "./tagids";
import "./SelectTADIG.css";

const TadigSelect = Select.ofType();

class SelectTadig extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tadig: Tadigs.TADIG_CODES[0]
    };
  }
  render() {
    const buttonText = this.state.tadig.code;
    return (
      <div className="tadig-label">
        {this.props.label && <H5>{this.props.label}</H5>}
        <TadigSelect
          fill
          items={Tadigs.TADIG_CODES}
          itemPredicate={Tadigs.filterTadig}
          itemRenderer={Tadigs.renderTadig}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleValueChange}
        >
          <Button
            disabled={this.props.disabled}
            intent={this.props.intent}
            text={buttonText}
            rightIcon="caret-down"
          />
        </TadigSelect>
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

export default SelectTadig;

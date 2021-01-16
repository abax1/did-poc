import * as React from "react";
import { Card } from "@blueprintjs/core";

export class Example extends React.PureComponent {
  render() {
    return (
      <Card style={{ width: "50%" }}>
        <div className="example-header">{this.props.header}</div>
        {this.props.children}
      </Card>
    );
  }
}

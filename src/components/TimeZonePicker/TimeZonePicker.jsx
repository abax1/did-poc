/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { Position } from "@blueprintjs/core";
import { TimezoneDisplayFormat, TimezonePicker } from "@blueprintjs/timezone";

export class TimeZonePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      showCustomTarget: false,
      showLocalTimezone: true,
      targetDisplayFormat: TimezoneDisplayFormat.COMPOSITE,
      timezone: ""
    };
  }

  render() {
    const {
      timezone,
      targetDisplayFormat,
      disabled,
      showLocalTimezone
    } = this.state;

    return (
      <TimezonePicker
        value={timezone}
        onChange={this.handleTimezoneChange}
        valueDisplayFormat={targetDisplayFormat}
        popoverProps={{ position: Position.TOP, boundary: "scrollParent" }}
        showLocalTimezone={showLocalTimezone}
        disabled={this.props.disabled}
      />
    );
  }

  handleTimezoneChange = timezone => {
    this.setState({ timezone });
    if (this.props.setTime) {
      this.props.setTime(timezone);
      //console.log(timezone);
    }
  };
}

import React, { useState } from "react";
import { Intent, MultiSlider, FormGroup } from "@blueprintjs/core";

const UsageTolerance = ({amberVal, amberOnChange, redVal, redOnChange, disabled}) => {

  const renderLabel2 = val => {
    return `${Math.round(val * 100)}%`;
  };

  return (
    <div style={{ margin: "5px" }}>
      <FormGroup
        helperText="Select amber/red thresholds for tolerance settings..."
        label="Usage Tolerance Thresholds "
        labelInfo="(required)"
      >
        <MultiSlider
          disabled={disabled}
          labelRenderer={renderLabel2}
          max={0.5}
          stepSize={0.01}
          labelStepSize={0.10}
          min={0}
          showTrackFill={true}
          vertical={false}
        >
          <MultiSlider.Handle
            onChange={val => {
              amberOnChange(parseFloat(val.toFixed(4), 10));
            }}
            value={amberVal}
            type="start"
            intentBefore={Intent.SUCCESS}
            intentAfter={Intent.WARNING}
          />
          <MultiSlider.Handle
            onChange={val => {
              redOnChange(parseFloat(val.toFixed(4), 10));
            }}
            value={redVal}
            type="end"
            intentAfter={Intent.DANGER}
          />
        </MultiSlider>
      </FormGroup>
    </div>
  );
};

export default UsageTolerance;

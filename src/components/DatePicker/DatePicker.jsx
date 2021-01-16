import React, { useState } from "react";
import { DateInput } from "@blueprintjs/datetime";
import { H5 } from "@blueprintjs/core";

const jsDateFormatter = {
  // note that the native implementation of Date functions differs between browsers
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: "D/M/YYYY"
};

function VRSDatePicker({ label, value, setDate, intent, min, max, disabled }) {
  return (
    <>
      {label && <H5>{label}</H5>}
      <DateInput
        disabled={disabled}
        maxDate={max}
        intent={intent}
        value={value}
        highlightCurrentDay
        {...jsDateFormatter}
        onChange={date => {
          setDate(date);
        }}
      />
    </>
  );
}

export default VRSDatePicker;

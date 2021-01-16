/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { TADIGS } from "../../constants";

/** Network TADIG codes as per GSMA */
export const TADIG_CODES = TADIGS.map((m, index) => ({ ...m, rank: index + 1 }));

export const renderTadig = (tadig, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${tadig.rank}. ${tadig.code}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={`${tadig.x500} ${tadig.country}`}
      key={tadig.rank}
      onClick={handleClick}
      text={highlightText(text, query)}
    />
  );
};

export const filterTadig = (query, tadig) => {
  return (
    `${
      tadig.rank
    }. ${tadig.code.toLowerCase()} ${tadig.country.toLowerCase()} ${tadig.x500.toLowerCase()}`.indexOf(
      query.toLowerCase()
    ) >= 0
  );
};

function highlightText(text, query) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export const tadigSelectProps = {
  itemPredicate: filterTadig,
  itemRenderer: renderTadig,
  items: TADIG_CODES
};

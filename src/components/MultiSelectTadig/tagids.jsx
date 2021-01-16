/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { MenuItem } from "@blueprintjs/core";
import * as React from "react";
import { NETWORK_LIST } from "../../constants";

/** Network TADIG codes as per GSMA */
export const NETWORKS = NETWORK_LIST.map((m, index) => ({ ...m, rank: index + 1 }));

export const renderTadig = (tadig, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${tadig.rank}. ${tadig.operator_name}, ${tadig.country_code}, MCCMNC=${tadig.mcc}${tadig.mnc}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={`${tadig.x500}`}
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
    }. ${tadig.tadig.toLowerCase()} ${tadig.country_code.toLowerCase()}`.indexOf(
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
  items: NETWORKS
};

export function createTadig(tadig) {
  return {
      rank: 100 + Math.floor(Math.random() * 100 + 1),
      tadig
  };
}

export const renderCreateFilmOption = (
  query,
  active,
  handleClick,
) => (
  <MenuItem
      icon="add"
      text={`Create "${query}"`}
      active={active}
      onClick={handleClick}
      shouldDismissPopover={false}
  />
);

export function areFilmsEqual(filmA, filmB) {
  // Compare only the titles (ignoring case) just for simplicity.
  return filmA.tadig.toLowerCase() === filmB.tadig.toLowerCase();
}

export function doesFilmEqualQuery(film, query) {
  return film.tadig.toLowerCase() === query.toLowerCase();
}

export function arrayContainsFilm(films, filmToFind) {
  return films.some((film) => film.tadig === filmToFind.tadig);
}

export function addFilmToArray(films, filmToAdd) {
  return [...films, filmToAdd];
}

export function deleteFilmFromArray(films, filmToDelete) {
  return films.filter(film => film !== filmToDelete);
}

export function maybeAddCreatedFilmToArrays(
  items,
  createdItems,
  film,
) {
  const isNewlyCreatedItem = !arrayContainsFilm(items, film);
  return {
      createdItems: isNewlyCreatedItem ? addFilmToArray(createdItems, film) : createdItems,
      // Add a created film to `items` so that the film can be deselected.
      items: isNewlyCreatedItem ? addFilmToArray(items, film) : items,
  };
}

export function maybeDeleteCreatedFilmFromArrays(
  items,
  createdItems,
  film,
) {
  const wasItemCreatedByUser = arrayContainsFilm(createdItems, film);

  // Delete the item if the user manually created it.
  return {
      createdItems: wasItemCreatedByUser ? deleteFilmFromArray(createdItems, film) : createdItems,
      items: wasItemCreatedByUser ? deleteFilmFromArray(items, film) : items,
  };
}

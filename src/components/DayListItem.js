import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  function formatSpots(arg) {
    if (arg === 0) {
      return "no spots remaining";
    }
    if (arg === 1) {
      return `${arg} spot remaining`;
    }
    if (arg > 1) {
      return `${arg} spots remaining`;
    }
  }

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid="day"
    >
      {/* {console.log(dayClass)} */}
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChooseNbPerson({ nbPerson, changeNbPerson, recipe }) {
  let minusNotAllowed = nbPerson === 1 ? "notAllowed" : "";
  return (
    <div className="chooseNbPerson">
      <span
        className={`nbPersonMinus ${minusNotAllowed}`}
        onClick={() => changeNbPerson(nbPerson - 1, recipe)}
      >
        <FontAwesomeIcon icon="minus-circle" />
      </span>
      <div className="nbPerson">
        <FontAwesomeIcon icon="users" /> {nbPerson}
      </div>
      <span
        className="nbPersonPlus"
        onClick={() => changeNbPerson(nbPerson + 1, recipe)}
      >
        <FontAwesomeIcon icon="plus-circle" />
      </span>
    </div>
  );
}

export default ChooseNbPerson;

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChooseNbPerson({ nbPerson, changeNbPerson }) {
  return (
    <div className="title">
      <span className="nbPersonMinus" onClick={() => changeNbPerson(false)}>
        <FontAwesomeIcon icon="minus-circle" />
      </span>
      <div className="nbPerson">
        <FontAwesomeIcon icon="users" /> {nbPerson}
      </div>
      <span className="nbPersonPlus" onClick={() => changeNbPerson(true)}>
        <FontAwesomeIcon icon="plus-circle" />
      </span>
    </div>
  );
}

export default ChooseNbPerson;

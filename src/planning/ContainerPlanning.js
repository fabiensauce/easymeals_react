import React from "react";

import "./ContainerPlanning.scss";
import Planning from "./Planning";
import ChooseNbPerson from "./ChooseNbPerson";

function ContainerPlanning({ meals, nbPerson, changeNbPerson, onClickMeal }) {
  return (
    <div className="containerPlanning">
      <ChooseNbPerson nbPerson={nbPerson} changeNbPerson={changeNbPerson} />
      <Planning
        meals={meals}
        nbPersonGlobal={nbPerson}
        onClickMeal={onClickMeal}
      />
    </div>
  );
}

export default ContainerPlanning;

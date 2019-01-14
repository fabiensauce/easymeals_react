import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./home.scss";

function ContainerHome({ cssPage, setCssPage }) {
  if (cssPage !== "home") setCssPage("home");
  return (
    <div className="home_container">
      <h2 className="titleWelcome">Welcome in EasyMeals </h2>

      <div className="quotePhrase">
        I have 4 children at home, it is a headache to organize every meals for
        the week <FontAwesomeIcon icon="angry" />
      </div>
      <div className="quotePhrase">
        It is always hard to find ideas of meals we could cook this week
      </div>
      <div className="quotePhrase">
        Organize meals on holidays for a group of people is never simple{" "}
        <FontAwesomeIcon icon={["far", "frown"]} />
      </div>

      <div className="divCatchPhrase">
        <div className="catchPhraseBig">
          But with <b>EasyMeals</b> all of that is going to change !!!
        </div>
      </div>
    </div>
  );
}

export default ContainerHome;

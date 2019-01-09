import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./AppRouter.scss";

import Home from "./home/Home.js";
import Recipe from "./recipe/ContainerRecipe.js";
import ContainerPlanning from "./planning/ContainerPlanning.js";

import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMinusCircle,
//   faPlusCircle,
//   faPlusSquare,
//   faUsers,
//   faHeart as fasHeart,
// } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

function AppRouter() {
  return (
    <Router>
      <div className="app">
        <ul className="nav">
          <li className="liEasyMeal">EasyMeals</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipe">Recipe</Link>
          </li>
          <li>
            <Link to="/planning">ContainerPlanning</Link>
          </li>
        </ul>

        <div className="route">
          <Route exact path="/" component={Home} />
          <Route path="/recipe" component={Recipe} />
          <Route path="/planning" component={ContainerPlanning} />
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./AppRouter.scss";

import Home from "./home/Home.js";
import Recipe from "./recipe/Recipe.js";
import Planning from "./planning/Planning.js";

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
            <Link to="/planning">Planning</Link>
          </li>
        </ul>

        <div className="route">
          <Route exact path="/" component={Home} />
          <Route path="/recipe" component={Recipe} />
          <Route path="/planning" component={Planning} />
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;

import React from "react";
import Meal from "./Meal";

function Planning({ meals }) {
  const isLunch = idMeal => idMeal < 20;
  const isDinner = idMeal => idMeal >= 20;

  return (
    <div className="wrapPlanning">
      <div className="table_whole">
        <div className="table_head">
          <table>
            <thead>
              <tr className="rowHead">
                <th>_</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="table_body">
          <table>
            <tbody>
              <tr className="rowLunch">
                <th>Lunch</th>
                {meals.map(
                  (meal, index) =>
                    isLunch(meal.id) && (
                      <Meal className="mealsBox" key={index} meal={meal} />
                    )
                )}
              </tr>
              <tr className="rowDinner">
                <th>Dinner</th>
                {meals.map(
                  (meal, index) =>
                    isDinner(meal.id) && (
                      <Meal className="mealsBox" key={index} meal={meal} />
                    )
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Planning;

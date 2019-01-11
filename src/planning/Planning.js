import React from "react";
import MealsBox from "./MealsBox";

function Planning({ planning }) {
  console.log("COMPOIET Eplanning ------ ", planning);
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
                {planning.lunchs.map((recipes, index) => (
                  <MealsBox
                    className="mealsBox"
                    key={index}
                    recipes={recipes}
                  />
                ))}
              </tr>
              <tr className="rowDinner">
                <th>Dinner</th>
                {planning.dinners.map((recipes, index) => (
                  <MealsBox
                    className="mealsBox"
                    key={index}
                    recipes={recipes}
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Planning;

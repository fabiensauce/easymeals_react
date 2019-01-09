import React, { Component } from "react";

import "./ContainerPlanning.scss";

class ContainerPlanning extends Component {
  render() {
    return (
      <div className="containerPlanning">
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
                    <td>Crepes</td>
                    <td>Omelette</td>
                    <td>Pizza</td>
                    <td>Gratin de brocolis</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr className="rowDinner">
                    <th>Dinner</th>
                    <td>Lasagna</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContainerPlanning;

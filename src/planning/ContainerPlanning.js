import React, { Component } from "react";

import "./ContainerPlanning.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ContainerPlanning extends Component {
  state = {
    nbPerson: 4
  };

  changeNbPerson(isIncrement) {
    const { nbPerson } = this.state;
    if (nbPerson === 1 && !isIncrement) return;
    let newNbPerson = isIncrement ? nbPerson + 1 : nbPerson - 1;
    this.setState({ nbPerson: newNbPerson });
  }
  render() {
    return (
      <div className="containerPlanning">
        <div className="title">
          <span
            className="nbPersonMinus"
            onClick={() => this.changeNbPerson(false)}
          >
            <FontAwesomeIcon icon="minus-circle" />
          </span>

          <div className="nbPerson">
            <FontAwesomeIcon icon="users" /> {this.state.nbPerson}
          </div>

          <span
            className="nbPersonPlus"
            onClick={() => this.changeNbPerson(true)}
          >
            <FontAwesomeIcon icon="plus-circle" />
          </span>
        </div>
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

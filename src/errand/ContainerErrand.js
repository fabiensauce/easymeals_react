import React, { Component } from "react";
import Services from "../services/Services";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./containerErrand.scss";
import { _computeErrands } from "./UtilsErrand";

class ContainerErrand extends Component {
  state = {
    customErrands: []
  };

  componentDidMount() {
    let { cssPage, setCssPage } = this.props;
    if (cssPage !== "errand") setCssPage("errand");

    this.inputCustom = React.createRef();

    Services.getCustomErrands().then(dataCustomErrands => {
      this.setState({ customErrands: dataCustomErrands });
    });
  }

  // Arrow fx for binding
  addCustom = () => {
    const inputCustomValue = this.inputCustom.current.value;
    Services.createCustomErrand({ value: inputCustomValue }).then(
      dataCustomErrand => {
        this.inputCustom.current.value = "";
        this.setState({
          customErrands: [...this.state.customErrands, dataCustomErrand]
        });
      }
    );
  };
  delete(customErrand) {
    let { customErrands } = this.state;
    _.remove(customErrands, elem => elem.id === customErrand.id);
    Services.deleteCustomErrand(customErrand.id).then(() => {
      this.setState({ customErrands });
    });
  }

  render() {
    let { meals } = this.props;
    let errands = _computeErrands(meals);
    return (
      <div className="container_errand">
        <div className="listErrand">
          {errands.map((errand, index) => (
            <div className="errand classic" key={index}>
              {errand.qty + " " + errand.unit + " " + errand.food}
            </div>
          ))}

          {this.state.customErrands.map((custom, index) => (
            <div className="errand custom" key={custom.id}>
              <span className="value">{custom.value} </span>
              <span className="delete" onClick={() => this.delete(custom)}>
                <FontAwesomeIcon icon={["fas", "trash-alt"]} />
              </span>
            </div>
          ))}
        </div>
        <div className="addCustom">
          <input
            className="input"
            type="text"
            ref={this.inputCustom}
            placeholder="custom"
          />
          <span className="add" onClick={this.addCustom}>
            <FontAwesomeIcon icon="plus-square" />
          </span>
        </div>
      </div>
    );
  }
}

export default ContainerErrand;

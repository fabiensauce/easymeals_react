import React, { Component } from "react";
import Services from "../services/Services";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./containerErrand.scss";
import { _computeErrands } from "./utilsErrand";

class ContainerErrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classicErrands: [],
      customErrands: [],
      isLoadClassicErrands: false
    };
  }

  componentDidMount() {
    let { cssPage, setCssPage } = this.props;
    if (cssPage !== "errand") setCssPage("errand");

    this.inputCustom = React.createRef();
    Services.getCustomErrands().then(dataCustomErrands => {
      this.setState({ customErrands: dataCustomErrands });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.hasLoadClassicErrands && nextProps.meals.length > 0) {
      let classicErrands = _computeErrands(nextProps.meals);
      this.setState({ classicErrands, hasLoadClassicErrands: true });
    }
    return true;
  }

  handleKeyPress = event => {
    if (event.key === "Enter") this.addCustom();
  };
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
  toggleChk(custom) {
    custom.isChecked = !custom.isChecked;
    let { classicErrands, customErrands } = this.state;
    this.setState({ classicErrands, customErrands });
  }

  render() {
    let isChecked = errand => (errand.isChecked ? "checked " : "");
    const faIconCheck = errand =>
      errand.isChecked ? (
        <FontAwesomeIcon icon={["far", "check-square"]} />
      ) : (
        <FontAwesomeIcon icon={["far", "square"]} />
      );

    return (
      <div className="container_errand">
        <div className="listErrand">
          <div className="title">Errand List</div>
          <div className="classicList">
            {this.state.classicErrands.map((errand, index) => (
              <div className="errand classic" key={index}>
                <div
                  className="faChecked"
                  onClick={() => this.toggleChk(errand)}
                >
                  {faIconCheck(errand)}
                </div>
                <span
                  className={`value ${isChecked(errand)}`}
                  onClick={() => this.toggleChk(errand)}
                >
                  {errand.qty + " " + errand.unit + " " + errand.food}
                </span>
              </div>
            ))}
          </div>

          <div className="customList">
            {this.state.customErrands.map((custom, index) => (
              <div className="errand custom" key={custom.id}>
                <div
                  className="faChecked"
                  onClick={() => this.toggleChk(custom)}
                >
                  {faIconCheck(custom)}
                </div>
                <span
                  className={`value ${isChecked(custom)}`}
                  onClick={() => this.toggleChk(custom)}
                >
                  {custom.value}
                </span>
                <span className="delete" onClick={() => this.delete(custom)}>
                  <FontAwesomeIcon icon={["fas", "trash-alt"]} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="addCustom">
          <input
            className="input"
            type="text"
            ref={this.inputCustom}
            placeholder="custom"
            onKeyPress={this.handleKeyPress}
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

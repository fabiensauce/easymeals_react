import React, { Component } from "react";

import "./ContainerPlanning.scss";
import Planning from "./Planning";
import ChooseNbPerson from "./ChooseNbPerson";

class ContainerPlanning extends Component {
  state = {
    nbPerson: 4
  };

  // Arrow fx for binding
  changeNbPerson = isIncrement => {
    const { nbPerson } = this.state;
    if (nbPerson === 1 && !isIncrement) return;
    let newNbPerson = isIncrement ? nbPerson + 1 : nbPerson - 1;
    this.setState({ nbPerson: newNbPerson });
  };

  render() {
    console.log("COMPONENT ContainerPlanning ------ ", this.props.planning);

    const { planning } = this.props;
    return (
      <div className="containerPlanning">
        <ChooseNbPerson
          nbPerson={this.state.nbPerson}
          changeNbPerson={this.changeNbPerson}
        />
        <Planning planning={planning} />
      </div>
    );
  }
}

export default ContainerPlanning;

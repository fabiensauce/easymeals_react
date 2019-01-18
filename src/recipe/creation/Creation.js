import React, { Component } from "react";
// import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreationForm from "./CreationForm";

class Creation extends Component {
  constructor(props) {
    super(props);
    this.state = { onCreationForm: false };
  }

  // Arrow fx for binding
  toggleCreation = custom => {
    let onCreationForm = !this.state.onCreationForm;
    this.setState({ onCreationForm });
  };

  render() {
    const { createRecipe } = this.props;
    const faIconToogleCreate = this.state.onCreationForm ? (
      <FontAwesomeIcon icon="minus-square" />
    ) : (
      <FontAwesomeIcon icon="plus-square" />
    );
    return (
      <div className="containerCreation">
        <div className="createRecipe">
          <div className="divBtnCreate">
            <span className="txtCreate">Create New Recipe</span>
            <span className="btnCreate" onClick={this.toggleCreation}>
              {faIconToogleCreate}
            </span>
          </div>
          {this.state.onCreationForm && (
            <CreationForm
              createRecipe={createRecipe}
              toggleCreation={this.toggleCreation}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Creation;

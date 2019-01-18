import React from "react";

import ListRecipe from "../recipe/ListRecipe";

import Modal from "react-modal";
Modal.setAppElement("#root");

function ModalRecipe({
  recipesOfMeal,
  isOpen,
  close,
  changeNbPersonMeal,
  removeRecipe
}) {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={close}
      className="modal modalRecipe"
      overlayClassName="modalOverlay"
    >
      <ListRecipe
        recipes={recipesOfMeal}
        removeRecipeOfPlanning={removeRecipe}
        isIntoModal={true}
        changeNbPerson={changeNbPersonMeal}
      />
    </Modal>
  );
}

export default ModalRecipe;

import React from "react";
import Planning from "../planning/Planning";
import Modal from "react-modal";
Modal.setAppElement("#root");

function ModalPlanning({ meals, isOpen, close, mealPlanningChosen }) {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={close}
      className="modal modalPlanning"
      overlayClassName="modalOverlay"
    >
      <Planning meals={meals} onClickMeal={mealPlanningChosen} />
    </Modal>
  );
}

export default ModalPlanning;

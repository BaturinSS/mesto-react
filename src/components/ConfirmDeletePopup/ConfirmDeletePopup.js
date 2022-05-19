import React from "react";

import PopupWithForm from "../popupWithForm/PopupWithForm";

function ConfirmDeletePopup({ isOpen, isConfirm, card, downloadText }) {
  function handleSubmit(event) {
    event.preventDefault();
    isConfirm(card);
  }
  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      buttonText={downloadText ? "Удаляем карточку..." : "Да"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup;
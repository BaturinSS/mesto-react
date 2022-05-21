import React from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import FormValidator from "../FormValidator/FormValidator";

function ConfirmDeletePopup({
  isOpen,
  isConfirm,
  card,
  downloadText,
  setIsButtonDisabled,
  isButtonDisabled
}) {
  const { isValidForm } = FormValidator();
  function handleSubmit(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    isConfirm(card);
  }
  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      buttonText={downloadText ? "Удаляем карточку..." : "Да"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
      isValidForm={isValidForm}
    >
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup;
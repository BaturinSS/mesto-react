import React from "react";
import './PopupWithForm.css';
import cross from '../../images/image-cross.svg';

function PopupWithForm({
  name,
  isOpen,
  title,
  buttonText,
  children,
  onSubmit,
  isButtonDisabled
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close" type="button">
          <img className="popup__image-cross" src={cross} alt="иконка" />
        </button>
        <h3 className="popup__title popup__title_delete-confirm">{title}</h3>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__save-button"
            type="submit"
            disabled={isButtonDisabled ? true : false}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
import React from "react";
import './PopupWithForm.css';
import cross from '../../images/image-cross.svg';

function PopupWithForm({ name, isOpen, onClose, title, buttonText, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close" type="button"><img className="popup__image-cross"
          src={cross} alt="иконка" onClick={onClose} /></button>
        <h3 className="popup__title">{title}</h3>
        <form className={`popup__form popup__form_type_${name}`} name="addCard" action="#" method="get" noValidate>
          {children}
          <button className="popup__save-button" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
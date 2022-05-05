import React from "react";
import cross from '../../images/image-cross.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : " "}`}>
      <div className="popup__container">
        <button className="popup__close" type="button"><img className="popup__image-cross"
          src={cross} alt="иконка" onClick={props.onClose} /></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className={`popup__form popup__form_type_${props.name}`} name="addCard" action="#" method="get" noValidate>
          {props.children}
          <button className="popup__save-button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
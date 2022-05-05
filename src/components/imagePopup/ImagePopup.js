import React from "react";
import './ImagePopup.css';
import cross from '../../images/image-cross.svg';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image-zoom ${card && "popup_opened"}`} >
      <div className="popup__box">
        <button className="popup__close" type="button" onClick={onClose}><img className="popup__image-cross"
          src={cross} alt="иконка" /></button>
        <img className="popup__image" src={card && card.link} alt={card && card.name} />
        <h2 className="popup__subtitle">{card && card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;
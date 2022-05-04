import React from "react";
import cross from '../../images/image-cross.svg';

function ImagePopup() {
  return (
    <div className="popup popup_type_image-zoom">
      <div className="popup__box">
        <button className="popup__close" type="button"><img className="popup__image-cross"
          src={cross} alt="иконка" /></button>
        <img className="popup__image" src="#" alt="фотография" />
        <h2 className="popup__subtitle"></h2>
      </div>
    </div>
  )
}

export default ImagePopup;
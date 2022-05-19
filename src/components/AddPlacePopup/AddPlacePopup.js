import React, { useState, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id='cardTitle-input'
        className="popup__input popup__input_card-title"
        required
        placeholder="Название"
        spellCheck="true"
        type="text"
        name="cardTitle"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span className="cardTitle-input-error popup__input-error"></span>
      <input
        id="cardLink-input"
        className="popup__input popup__input_card-link"
        required
        placeholder="Ссылка на картинку"
        spellCheck="true"
        type="url"
        name="cardLink"
        value={link}
        onChange={handleLinkChange}
      />
      <span className="cardLink-input-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
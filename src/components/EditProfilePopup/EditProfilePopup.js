import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import { TranslationContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  downloadText,
  isButtonDisabled,
  disableButtonSubmit
}) {
  const [name, setName] = useState({});

  const [description, setDescription] = useState({});

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleJobChange(event) {
    setDescription(event.target.value);
  }

  const currentUser = useContext(TranslationContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    disableButtonSubmit();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText={downloadText ? 'Сохраняем...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <input
        id="userName-input"
        className="popup__input popup__input_user-name"
        required
        placeholder="Имя"
        spellCheck="true"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        value={name || ''}
      />
      <span className="userName-input-error popup__input-error"></span>
      <input
        id="userProfession-input"
        className="popup__input popup__input_user-profession"
        required
        placeholder="О себе"
        spellCheck="true"
        type="text"
        name="job"
        minLength="2"
        maxLength="200"
        onChange={handleJobChange}
        value={description || ''}
      />
      <span className="userProfession-input-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
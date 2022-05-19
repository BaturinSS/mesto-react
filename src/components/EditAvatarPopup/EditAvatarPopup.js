import React, { useRef, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, downloadText }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText={downloadText ? "Загружаем аватар..." : "Загрузить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarUrl-input"
        className="popup__input popup__input_avatar-url"
        required
        placeholder="Ссылка на картинку"
        spellCheck="true"
        type="url"
        name="avatarUrl"
        ref={avatarRef}
      />
      <span className="avatarUrl-input-error popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
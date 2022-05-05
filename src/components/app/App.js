import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import ImagePopup from '../imagePopup/ImagePopup';
import { useState } from "react";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpened: true,
      name: card.name,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input id="userName-input" className="popup__input popup__input_user-name" required
          placeholder="Имя" spellCheck="true" type="text" name="name" minLength="2" maxLength="40" />
        <span className="userName-input-error popup__input-error"></span>
        <input id="userProfession-input" className="popup__input popup__input_user-profession" required
          placeholder="О себе" spellCheck="true" type="text" name="job" minLength="2" maxLength="200" />
        <span className="userProfession-input-error popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="card-add"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input id='cardTitle-input' className="popup__input popup__input_card-title" required
          placeholder="Название" spellCheck="true" type="text" name="cardTitle" minLength="2" maxLength="30" />
        <span className="cardTitle-input-error popup__input-error"></span>
        <input id="cardLink-input" className="popup__input popup__input_card-link" required
          placeholder="Ссылка на картинку" spellCheck="true" type="url" name="cardLink" />
        <span className="cardLink-input-error popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar-edit"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input id="avatarUrl-input" className="popup__input popup__input_avatar-url" required
          placeholder="Ссылка на картинку" spellCheck="true" type="url" name="avatarUrl" />
        <span className="avatarUrl-input-error popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="delete-confirm"
        title="Вы уверены?"
        buttonText="Да"
      >
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
    </>
  );
}

export default App;

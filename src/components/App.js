import '../index.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import cross from '../images/image-cross.svg';
import PopupWithForm from './popupWithForm/PopupWithForm';
import PopupImage from './imagePopup/ImagePopup';
import { useState } from "react";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
  }

  return (
    <>
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
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
          placeholder="Имя" spellcheck="true" type="text" name="name" minlength="2" maxlength="40" />
        <span className="userName-input-error popup__input-error"></span>
        <input id="userProfession-input" className="popup__input popup__input_user-profession" required
          placeholder="О себе" spellcheck="true" type="text" name="job" minlength="2" maxlength="200" />
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
          placeholder="Название" spellcheck="true" type="text" name="cardTitle" minlength="2" maxlength="30" />
        <span className="cardTitle-input-error popup__input-error"></span>
        <input id="cardLink-input" className="popup__input popup__input_card-link" required
          placeholder="Ссылка на картинку" spellcheck="true" type="url" name="cardLink" />
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
          placeholder="Ссылка на картинку" spellcheck="true" type="url" name="avatarUrl" />
        <span className="avatarUrl-input-error popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="delete-confirm"
        title="Вы уверены?"
        buttonText="Да"
      >
      </PopupWithForm>

      <PopupImage />

      <template id="elements-template">
        <li className="elements__element">
          <button type="button" className="elements__delete"><img className="elements__image-delete"
            src={cross} alt="иконка" /></button>
          <figure className="elements__rectangle">
            <img className="elements__mask-group" src="#" alt="фотография" />
            <figcaption>
              <h2 className="elements__title"></h2>
            </figcaption>
          </figure>
          <div className="elements__group-likes">
            <button type="button" className="elements__group"></button>
            <span className="elements__number-likes"></span>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;

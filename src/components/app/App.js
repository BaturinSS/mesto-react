import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import ImagePopup from '../imagePopup/ImagePopup';
import { useState, useEffect } from "react";
import { api } from '../utils/api';
import { TranslationContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }, []);


  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleOverley(e) {
      if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__image-cross')) {
        closeAllPopups();
      }
    }
    document.addEventListener("mousedown", handleOverley);
    return () => document.removeEventListener("mousedown", handleOverley);
  }, [isOpen]);

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

  const handleUpdateUser = (name, about) => {
    api
      .editUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
  }

  const handleEditAvatar = ({ avatar }) => {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  return (
    <>
      <TranslationContext.Provider value={currentUser}>

        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name="card-add"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
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
          />
          <span className="cardLink-input-error popup__input-error"></span>
        </PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleEditAvatar}
        />

        <PopupWithForm
          name="delete-confirm"
          title="Вы уверены?"
          buttonText="Да"
        >
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </TranslationContext.Provider>
    </>
  );
}

export default App;

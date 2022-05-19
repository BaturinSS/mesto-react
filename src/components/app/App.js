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
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [updateCards, setUpdateCards] = useState(false);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const changeLikeCardStatus =
      !isLiked
        ? api.addLike(card._id)
        : api.deleteLike(card._id)

    changeLikeCardStatus
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        //setCards((cards) => cards.filter((c) => c._id !== card._id));
        setUpdateCards(!updateCards)
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }

  useEffect(() => {
    api
      .getCards()
      .then((cardList) => {
        setCards(cardList);
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }, [updateCards])

  const handleAddPlaceSubmit = (name, link) => {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  };

  return (
    <>
      <TranslationContext.Provider value={currentUser}>

        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />

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
        />

      </TranslationContext.Provider>
    </>
  );
}

export default App;

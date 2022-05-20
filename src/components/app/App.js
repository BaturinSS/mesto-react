import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import ImagePopup from '../imagePopup/ImagePopup';
import { useState, useEffect } from "react";
import { api } from '../utils/Api';
import { TranslationContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ConfirmDeletePopup from '../ConfirmDeletePopup/ConfirmDeletePopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

  const [isDownload, setIsDownload] = useState(false);

  const [isDeleteCard, setIsDeleteCard] = useState({});

  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [isUpdateCards, setIsUpdateCards] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isConfirmDeletePopupOpen;

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }, [isUpdateCards]);

  useEffect(() => {
    function closeByEscape(event) {
      if (event.key === 'Escape') {
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
    function handleOverley(event) {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__image-cross')) {
        closeAllPopups();
      }
    };
    document.addEventListener("mousedown", handleOverley);
    return () => document.removeEventListener("mousedown", handleOverley);
  }, [isOpen]);

  const handleEditAvatarClick = () => {
    setIsButtonDisabled(false)
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsButtonDisabled(false)
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsButtonDisabled(false)
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = () => {
    setIsButtonDisabled(false)
    setIsConfirmDeletePopupOpen(true);
  };

  const updateDeleteCard = (card) => {
    setIsButtonDisabled(false)
    setIsDeleteCard(card);
    handleDeleteCardClick();
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
  }

  const handleUpdateUser = (name, about) => {
    setIsDownload(true);
    api
      .editUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => setIsDownload(false))
  }

  const handleEditAvatar = ({ avatar }) => {
    setIsDownload(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => setIsDownload(false))
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
    setIsDownload(true);
    api
      .deleteCard(card._id)
      .then(() => {
        closeAllPopups();
        setIsUpdateCards(!isUpdateCards)
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => setIsDownload(false))
  }

  const handleAddPlaceSubmit = (name, link) => {
    setIsDownload(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsUpdateCards(!isUpdateCards)
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => setIsDownload(false))
  };

  return (
    <TranslationContext.Provider value={currentUser}>

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardDelete={updateDeleteCard}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        cards={cards}
      />

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        downloadText={isDownload}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />

      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        downloadText={isDownload}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />

      <EditAvatarPopup
        onUpdateAvatar={handleEditAvatar}
        isOpen={isEditAvatarPopupOpen}
        downloadText={isDownload}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />

      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        card={isDeleteCard}
        isConfirm={handleCardDelete}
        downloadText={isDownload}
        isButtonDisabled={isButtonDisabled}
        setIsButtonDisabled={setIsButtonDisabled}
      />

      <ImagePopup
        card={selectedCard}
      />

    </TranslationContext.Provider>
  );
}

export default App;
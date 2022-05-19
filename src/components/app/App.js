import './App.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import ImagePopup from '../imagePopup/ImagePopup';
import { useState, useEffect } from "react";
import { api } from '../utils/api';
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

  const [isDeleteCard, setIsDeleteCard] = useState({});

  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [updateCards, setUpdateCards] = useState(false);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isConfirmDeletePopupOpen;

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
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = () => {
    setIsConfirmDeletePopupOpen(true);
  };

  const updateDeleteCard = (card) => {
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
  }

  const handleEditAvatar = ({ avatar }) => {
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
        setUpdateCards(!updateCards);
        closeAllPopups();
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
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleEditAvatar}
          isOpen={isEditAvatarPopupOpen}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          card={isDeleteCard}
          isConfirm={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
        />

      </TranslationContext.Provider>
    </>
  );
}

export default App;
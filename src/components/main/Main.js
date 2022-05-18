import React, { useState, useEffect } from "react";
import './Main.css';
import { api } from '../utils/api';
import Card from "../card/Card";
import { TranslationContext } from '../../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const currentUser = React.useContext(TranslationContext);

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card.cardId, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          state.map((c) =>
            c._id === card._id
              ? newCard
              : c
          )
        });
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }

  function handleCardDelete() {
    console.log('delete')
  }

  useEffect(() => {
    api
      .getCards()
      .then((cardList) => {
        const usersCard = cardList.map(card => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            cardId: card._id,
            ownerId: card.owner._id,
          };
        });
        setCards(usersCard);
      })
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
  }, [])

  return (
    <div className="content">
      <section className="profile">
        <div className="profile__figure">
          <div className="profile__ellipse" onClick={onEditAvatar}>
            <img className="plofile__avatar" src={currentUser.avatar} alt="аватар" /></div>
          <div className="profile__info">
            <div className="profile__group">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__button-edit" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__cards">
          {cards.map(card => {
            return (
              <Card
                key={card.cardId}
                card={card}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </div>
  )
}

export default Main;
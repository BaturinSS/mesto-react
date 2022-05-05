import React, { useState, useEffect } from "react";
import './Main.css';
import { api } from '../utils/Api';
import Card from "../card/Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardList]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        const usersCard = cardList.map(card => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            cardId: card._id,
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
            <img className="plofile__avatar" src={userAvatar} alt="аватар" /></div>
          <div className="profile__info">
            <div className="profile__group">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__button-edit" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
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
              />
            );
          })}
        </ul>
      </section>
    </div>
  )
}

export default Main;
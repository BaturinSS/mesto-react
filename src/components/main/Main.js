import React, { useContext } from "react";
import './Main.css';
import Card from "../card/Card";
import { TranslationContext } from '../../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete
}) {
  const currentUser = useContext(TranslationContext);

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
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </div>
  )
}

export default Main;

import React from "react";
import './Main.css';

function Main({ onEditAvatar, onEditProfile, onAddPlace }) {
  return (
    <div className="content">
      <section className="profile">
        <div className="profile__figure">
          <div className="profile__ellipse" onClick={onEditAvatar}><img className="plofile__avatar" src="#" alt="аватар" /></div>
          <div className="profile__info">
            <div className="profile__group">
              <h1 className="profile__name">Жак-Ив-Кусто</h1>
              <button type="button" className="profile__button-edit" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">Исследователь океана</p>
          </div>
        </div>
        <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__cards"></ul>
      </section>
    </div>
  )
}
export default Main;
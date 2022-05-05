import React from "react";
import imageBasket from '../../images/delete.svg';

function Card({ card, onCardClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <li className="elements__element">
      <button type="button" className="elements__delete"><img className="elements__image-delete"
        src={imageBasket} alt="иконка" /></button>
      <figure className="elements__rectangle">
        <img className="elements__mask-group" src={card.link} alt={card.name} onClick={handleClick} />
        <figcaption>
          <h2 className="elements__title">{card.name}</h2>
        </figcaption>
      </figure>
      <div className="elements__group-likes">
        <button type="button" className="elements__group"></button>
        <span className="elements__number-likes">{card.likes.length}</span>
      </div>
    </li>
  )
}

export default Card;
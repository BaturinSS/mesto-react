import React from "react";
import './Header.css';
import logo from '../../logo.svg';

function Header() {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="логотип" />
    </div>
  )
}

export default Header;
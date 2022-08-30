import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()}. Батурин Сергей
      </p>
    </div>
  );
}

export default Footer;

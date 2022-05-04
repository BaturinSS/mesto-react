import '../index.css';
import Header from './header/Header';

function App() {
  return (
    <>
      <Header />
      <main className="content">
        <section className="profile">
          <div className="profile__figure">
            <div className="profile__ellipse"><img className="plofile__avatar" src="#" alt="аватар" /></div>
            <div className="profile__info">
              <div className="profile__group">
                <h1 className="profile__name">Жак-Ив-Кусто</h1>
                <button type="button" className="profile__button-edit"></button>
              </div>
              <p className="profile__subtitle">Исследователь океана</p>
            </div>
          </div>
          <button type="button" className="profile__button-add"></button>
        </section>
        <section className="elements">
          <ul className="elements__cards"></ul>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copyright">© 2022. Батурин Сергей</p>
      </footer>
      <div className="popup popup_type_profile-edit">
        <div className="popup__container">
          <button className="popup__close" type="button"><img className="popup__image-cross"
            src="<%=require('./images/image-cross.svg')%>" alt="иконка" /></button>
          <h3 className="popup__title">Редактировать профиль</h3>
          <form className="popup__form popup__form_type_profile-edit" name="editProfile" action="#" method="get" novalidate>
            <input id="userName-input" className="popup__input popup__input_user-name" required placeholder="Имя"
              spellcheck="true" type="text" name="name" minlength="2" maxlength="40" />
            <span className="userName-input-error popup__input-error"></span>
            <input id="userProfession-input" className="popup__input popup__input_user-profession" required
              placeholder="О себе" spellcheck="true" type="text" name="job" minlength="2" maxlength="200" />
            <span className="userProfession-input-error popup__input-error"></span>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_card-add">
        <div className="popup__container">
          <button className="popup__close" type="button"><img className="popup__image-cross"
            src="<%=require('./images/image-cross.svg')%>" alt="иконка" /></button>
          <h3 className="popup__title">Новое место</h3>
          <form className="popup__form popup__form_type_card-add" name="addCard" action="#" method="get" novalidate>
            <input id='cardTitle-input' className="popup__input popup__input_card-title" required placeholder="Название"
              spellcheck="true" type="text" name="cardTitle" minlength="2" maxlength="30" />
            <span className="cardTitle-input-error popup__input-error"></span>
            <input id="cardLink-input" className="popup__input popup__input_card-link" required
              placeholder="Ссылка на картинку" spellcheck="true" type="url" name="cardLink" />
            <span className="cardLink-input-error popup__input-error"></span>
            <button className="popup__save-button" type="submit">Создать</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_delete-confirm">
        <div className="popup__container">
          <button className="popup__close" type="button"><img className="popup__image-cross"
            src="<%=require('./images/image-cross.svg')%>" alt="иконка" /></button>
          <h3 className="popup__title popup__title_delete-confirm">Вы уверены?</h3>
          <button className="popup__save-button popup__save-button_delete-confirm" type="submit">Да</button>
        </div>
      </div>
      <div className="popup popup_type_avatar-edit">
        <div className="popup__container">
          <button className="popup__close" type="button"><img className="popup__image-cross"
            src="<%=require('./images/image-cross.svg')%>" alt="иконка" /></button>
          <h3 className="popup__title">Обновить аватар</h3>
          <form className="popup__form popup__form_type_avatar-edit" name="addAvatar" action="#" method="get" novalidate>
            <input id="avatarUrl-input" className="popup__input popup__input_avatar-url" required
              placeholder="Ссылка на картинку" spellcheck="true" type="url" name="avatarUrl" />
            <span className="avatarUrl-input-error popup__input-error"></span>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_image-zoom">
        <div className="popup__box">
          <button className="popup__close" type="button"><img className="popup__image-cross"
            src="<%=require('./images/image-cross.svg')%>" alt="иконка" /></button>
          <img className="popup__image" src="#" alt="фотография" />
          <h2 className="popup__subtitle"></h2>
        </div>
      </div>
      <template id="elements-template">
        <li className="elements__element">
          <button type="button" className="elements__delete"><img className="elements__image-delete"
            src="<%=require('./images/delete.svg')%>" alt="иконка" /></button>
          <figure className="elements__rectangle">
            <img className="elements__mask-group" src="#" alt="фотография" />
            <figcaption>
              <h2 className="elements__title"></h2>
            </figcaption>
          </figure>
          <div className="elements__group-likes">
            <button type="button" className="elements__group"></button>
            <span className="elements__number-likes"></span>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;

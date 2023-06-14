import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({ props }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, items]) => {
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
        setCards(items);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <button
            className="profile__avatar-edit"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__block">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              aria-label="Редактирование профиля пользователя"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <h2 className="profile__profession">{userDescription}</h2>
        </div>
        <button
          type="button"
          aria-label="Добавление новых фотографий"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="photo-grid">
        <ul className="photo-grid__container">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                onCardClick={props.onCardClick}
                card={card}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

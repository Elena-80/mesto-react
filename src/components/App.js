import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

 React.useEffect(() => {
    api.getInitialCards()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(() => {
      api.getUserInfo()
        .then((info) => {
            setCurrentUser(info);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
         });
    } 

function handleCardDelete(card) {
  api.deleteCard(card._id)
      .then((info) => {
        setCards((state) => state.filter((c) => {return c._id != card._id}))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
       });    
  } 

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    for (var key in selectedCard) console.log(key + ": " + selectedCard[key]);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.sendUserInfo(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
       });
  }

  function handleUpdateAvatar(avatarLink) {
    api.sendNewAvatar(avatarLink)
    .then((info) => {
      setCurrentUser(info);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
     });
  }
 
  function handleAddPlaceSubmit(data) {
    api.sendPictureInfo(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <div className="main">
        <Header />
        <Main
            props={{
              cards: cards,
              onEditProfile: handleEditProfileClick,
              onAddPlace: handleAddPlaceClick,
              onEditAvatar: handleEditAvatarClick,
              onCardClick: handleCardClick,
              onCardLike: handleCardLike,
              onCardDelete: handleCardDelete
            }}
        />
        <Footer />
        <ImagePopup />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser = {handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace = {handleAddPlaceSubmit}/>

        <PopupWithForm
          props={{
            title: "Вы уверены?",
            name: "delete",
            isOpen: false,
            onClose: closeAllPopups,
            buttonTitle: 'Да',
            children: (
              <>
              </>
            ),
          }}
        />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar = {handleUpdateAvatar}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

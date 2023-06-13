import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
    for(var key in selectedCard)
      console.log(key + ": " + selectedCard[key]);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }


  return (
  <div className = 'root'>
    <div className="main">
      <Header />
      <Main props = {{onEditProfile: handleEditProfileClick, onAddPlace: handleAddPlaceClick, onEditAvatar: handleEditAvatarClick, onCardClick: handleCardClick}} />
      <Footer />
      <ImagePopup />
      <PopupWithForm  props = {{title: 'Редактировать профиль', name: 'edit', isOpen: isEditProfilePopupOpen, onClose: closeAllPopups, children:
                <>
                <input type="text" className="popup__input popup__input_type_name" id="name" name="name"  placeholder = "Имя" required minLength="2" maxLength="40"/>
                <span className="popup__input-error name-error"></span> 
                <input type="text" className = "popup__input popup__input_type_profession" id = "profession" name = "about" placeholder = "Профессия" required minLength="2" maxLength="200"/> 
                <span className="popup__input-error profession-error"></span> 
                <button type="submit" className = "popup__submit-button popup-edit__submit-button">Сохранить</button>
                </>
      }}/>

      <PopupWithForm  props = {{title: 'Новое место', name: 'photo', isOpen: isAddPlacePopupOpen, onClose: closeAllPopups, children:
                <>
                <input type="text" className="popup__input popup__input_type_title" id="title" name="name"  placeholder = "Название" required minLength="2" maxLength="30"/>
                <span className="popup__input-error title-error"></span>
                <input type="url" className = "popup__input popup__input_type_link" id = "link" name = "link" placeholder = "Ссылка на картинку" required/>
                <span className="popup__input-error link-error"></span>
                <button type="submit" className = "popup__submit-button popup-photo__submit-button">Создать</button>
                </>
      }}/>

      <PopupWithForm  props = {{title: 'Вы уверены?', name: 'delete', isOpen: false, onClose: closeAllPopups, children:
                <>
                <button className = "popup__submit-button popup-delete__submit-button">Да</button>
                </>
      }}/>

      <PopupWithForm  props = {{title: 'Обновить аватар', name: 'avatar', isOpen: isEditAvatarPopupOpen, onClose: closeAllPopups, children:
                <>
                <input type="url" className = "popup__input popup__input_type_avatar" id = "avatar" name = "avatar" placeholder = "Ссылка на картинку профиля" required/>
                <span className="popup__input-error avatar-error"></span>
                <button className = "popup__submit-button popup-avatar__submit-button">Сохранить</button>
                </>
      
      }}/>

      <ImagePopup  card = {selectedCard} onClose = {closeAllPopups}/>

    </div>
  </div>

  );
}

export default App;

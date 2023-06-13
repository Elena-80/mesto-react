import React from "react";

function Card({card, onCardClick}) {

    function handleClick() {      
        onCardClick(card);
      }  

return (<li className  = "photo-grid__grid-element"><img className="photo-grid__image" onClick = {handleClick} style={{backgroundImage: `url(${card.link})`}}/> 
<button type = "button" className = "photo-grid__trash"></button>
<div className = "photo-grid__title">
    <h2 className = "photo-grid__text">{card.name}</h2>
    <div className = "photo-grid__like">
        <button type="button" className="photo-grid__button"></button>
        <div className ="photo-grid__count">{card.likes.length}</div>
    </div>
</div>
</li>
)
}

export default Card;
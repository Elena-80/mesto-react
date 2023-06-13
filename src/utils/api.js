
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  _checkResult(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(endpoint, options) {
    return fetch((`${this._baseUrl}` + endpoint), options).then(this._checkResult)
  }

  getInitialCards() {
    return this._request('cards', {headers: this._headers})
}

  getUserInfo() {
    return this._request('users/me', {headers: this._headers})
  }


  sendUserInfo(data) {
    return this._request('users/me',  {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
}

  sendPictureInfo(data) {
    return this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(data) {
    this._cardId = data.id;
    return this._request(`cards/${this._cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  sendLikes(data) {
    this._cardId = data.id;
    return this._request(`cards/${this._cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  deleteLikes(data) {
    this._cardId = data.id;
    return this._request(`cards/${this._cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  sendNewAvatar(data) {
    return this._request(`users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: data.avatar
    })
  })
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66/',
  headers: {
    authorization: '488ec7bd-79a7-4d81-922b-0d370c35be2b',
    'Content-Type': 'application/json'
  }
});

export default api;
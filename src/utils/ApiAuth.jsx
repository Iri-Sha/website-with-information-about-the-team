class ApiAuth {
  constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
  }

  _checkResponse(res) {
      if(res.ok) {
          return res.json();
      } else {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
  }

  registration(email, password) {
      return fetch(`${this._baseUrl}/register`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({email, password})
      })
      .then((res) => this._checkResponse(res));
  }

  authorization(email, password) {
      return fetch(`${this._baseUrl}/login`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({email, password})
      })
      .then((res) => this._checkResponse(res));
  }

  logout() {
      return fetch(`${this._baseUrl}/signout`, {
          headers: this._headers,
      })
      .then((res) => this._checkResponse(res));
  }

  getContent = (token) => {
    return fetch(`${this._baseUrl}/users`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    }).then((res) => this._checkResponse(res));
}
}

export const apiAuth = new ApiAuth({
  baseUrl: 'https://reqres.in/api',
  headers: {
  'Content-Type': 'application/json',
  },
  credentials: 'include',
});
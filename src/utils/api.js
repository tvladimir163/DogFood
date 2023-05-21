import { getLocalData } from "./localStorage";

const onResponce = (res) => {
   return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

class Api {
   constructor({ baseUrl, headers }) {
      this._headers = headers;
      this._baseUrl = baseUrl;
   }

   getProductList() {
      return fetch(`${this._baseUrl}/products`, {
         headers: { ...this._headers, Authorization: getLocalData('token') }
      }).then(onResponce)
   }

   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
         headers: { ...this._headers, Authorization: getLocalData('token') }
      }).then(onResponce)
   }

   getProductById(idProduct) {
      return fetch(`${this._baseUrl}/products/${idProduct}`, {
         headers: { ...this._headers, Authorization: getLocalData('token') }
      }).then(onResponce)
   }

   setUserInfo(dataUser) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: { ...this._headers, Authorization: getLocalData('token') },
         body: JSON.stringify(dataUser)
      }).then(onResponce)
   }

   createReviewProduct(productId, reviewData) {
      return fetch(`${this._baseUrl}/products/review/${productId}`, {
         method: 'POST',
         headers: { ...this._headers, Authorization: getLocalData('token') },
         body: JSON.stringify(reviewData)
      }).then(onResponce)
   }

   search(searchQuery) {
      return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
         headers: { ...this._headers, Authorization: getLocalData('token') }
      }).then(onResponce)
   }

   changeLikeProduct(productId, isLike) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
         method: isLike ? "DELETE" : "PUT",
         headers: { ...this._headers, Authorization: getLocalData('token') }
      }).then(onResponce)
   }

   register(bodyData) {
      return fetch(`${this._baseUrl}/signup`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify(bodyData)
      }).then(onResponce)
   }

   authorize(bodyData) {
      return fetch(`${this._baseUrl}/signin`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify(bodyData)
      }).then(onResponce)
   }

   checkToken() {
      const token = getLocalData('token');
      return fetch(`${this._baseUrl}/users/me`, {
         headers: {
            ...this._headers, Authorization: `Bearer ${token}`
         },
      }).then(onResponce)
   }
}

const config = {
   baseUrl: 'https://api.react-learning.ru',
   headers: {
      'content-type': 'application/json',
      // Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzljZjIiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDUsImV4cCI6MTY5OTQ0Nzk0NX0.zpBHDTZ-54ViKPHGwvY1FIRGcZCFohP0S-CxPn4T5z4'
   }
}

const api = new Api(config);

export default api;
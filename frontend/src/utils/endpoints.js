import axios from 'axios';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcxMjk1MTc1NiwiZXhwIjoxNzEzMDM4MTU2fQ.GwdLOOgSYOUPRrOyu5aIev38YYpkeeqgNBd9qsdR4wM';
const base = import.meta.env.PROD
  ? ''
  : 'http://localhost:3000'

const postLogin = (creds) => {
  return axios.post(`${base}/auth/login`, creds)
    .then(response => {
      console.log(response);
      return response.data.token;
    })
};

const postRegister = (creds) => {
  creds.phone = creds.phone.replace(/\D/g,'');
  console.log(creds);
  return axios.post(`${base}/auth/register`, creds)
    .then(response => {
      console.log(response);
      return response.data.token;
    })
};

const fetchEvents = () => {
  return axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data.events)
}

export {
  postLogin,
  postRegister,
};
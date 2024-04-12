import axios from 'axios';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcxMjk1MTc1NiwiZXhwIjoxNzEzMDM4MTU2fQ.GwdLOOgSYOUPRrOyu5aIev38YYpkeeqgNBd9qsdR4wM';
const url = import.meta.env.PROD
  ? ''
  : 'http://localhost:3000/events/'

const fetchEvents = () => {
  return axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data.events)
}

export default fetchEvents;
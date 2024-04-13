import axios from 'axios';
const token = sessionStorage.getItem('token');
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
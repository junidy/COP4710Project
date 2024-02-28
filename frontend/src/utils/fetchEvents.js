import axios from 'axios';
const url = import.meta.env.PROD
  ? ''
  : 'http://localhost:3000/getEvents'

const fetchEvents = () => {
  return axios.get(url)
    .then(response => response.data)
}

export default fetchEvents;
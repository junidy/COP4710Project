import axios from 'axios';
const token = sessionStorage.getItem('token');
const url = import.meta.env.PROD
  ? ''
  : 'http://localhost:3000/rsos/'

const fetchClubs = () => {
  return axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
}

export default fetchClubs;
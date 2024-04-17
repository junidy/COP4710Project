import axios from 'axios';
const token = sessionStorage.getItem('token');

const joinRSO = (rsoID) => {
    const url = import.meta.env.PROD
  ? ''
  : `http://localhost:3000/rsos/${rsoID}/join`
    return axios.post(url, {}, {
        headers: {
            'Content-Type': 'json',
            'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
}

export default joinRSO;
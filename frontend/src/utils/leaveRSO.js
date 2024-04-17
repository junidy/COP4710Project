import axios from 'axios';
const token = sessionStorage.getItem('token');

const leaveRSO = (rsoID) => {
    const url = import.meta.env.PROD
  ? ''
  : `http://localhost:3000/rsos/${rsoID}/leave`
    return axios.post(url, {}, {
        headers: {
            'Content-Type': 'json',
            'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.data)
}

export default leaveRSO;
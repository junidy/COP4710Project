import axios from 'axios';
const base = import.meta.env.PROD
  ? ''
  : 'http://localhost:3000'
const url = import.meta.env.PROD
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

// Get Events for a User
const getEvents = (jwtToken) => {
  return axios.get(`${base}/events`, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  })
    .then(response => response.data)
    .catch(error => console.error('Fetching Events Failed:', error.response));
};

// Create a New Event
const postEvent = (eventDetails, jwtToken) => {
  return axios.post(`${base}/events`, eventDetails, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  })
    .then(response => response.data)
    .catch(error => console.error('Creating Event Failed:', error.response));
};

// Get All RSOs
const getRSOs = () => {
  return axios.get(`${base}/rsos`)
    .then(response => response.data)
    .catch(error => console.error('Fetching RSOs Failed:', error.response));
};

// Create a New RSO
const createRSO = (rsoDetails, jwtToken) => {
  return axios.post(`${base}/rsos`, rsoDetails, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  })
    .then(response => response.data)
    .catch(error => console.error('Creating RSO Failed:', error.response));
};

// Join an RSO
const joinRSO = (rsoId, jwtToken) => {
  return axios.post(`${base}/rsos/${rsoId}/join`, {}, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  })
    .then(response => response.data)
    .catch(error => console.error('Joining RSO Failed:', error.response));
};

// Leave an RSO
const leaveRSO = (rsoId, jwtToken) => {
  return axios.post(`${base}/rsos/${rsoId}/leave`, {}, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  })
    .then(response => response.data)
    .catch(error => console.error('Leaving RSO Failed:', error.response));
};
// Get Comments for an Event
const getComments = (eventId) => {
  return axios.get(`${base}/comments/${eventId}`)
    .then(response => response.data)
    .catch(error => console.error('Fetching Comments Failed:', error.response));
};

// Add Comment
const addComment = (commentDetails, jwtToken) => {
  return axios.post(`${base}/comments`, commentDetails, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  })
    .then(response => response.data)
    .catch(error => console.error('Adding Comment Failed:', error.response));
};

// Edit Comment
const editComment = (feedbackId, updatedComment, jwtToken) => {
  return axios.put(`${base}/comments/${feedbackId}`, updatedComment, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  })
    .then(response => response.data)
    .catch(error => console.error('Editing Comment Failed:', error.response));
};

// Remove Comment
const removeComment = (feedbackId, jwtToken) => {
  return axios.delete(`${base}/comments/${feedbackId}`, {
    headers: { Authorization: `Bearer ${jwtToken}` }
  })
    .then(response => response.data)
    .catch(error => console.error('Removing Comment Failed:', error.response));
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
  getEvents,
  postEvent,
  getRSOs,
  createRSO,
  joinRSO,
  leaveRSO,
  getComments,
  addComment,
  editComment,
  removeComment
};

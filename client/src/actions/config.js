// API config
let API = 'http://localhost:3000/api';
if (window.location.hostname === 'vocalize.herokuapp.com') {
  API = 'https://vocalize.herokuapp.com/api';
};

export default API;

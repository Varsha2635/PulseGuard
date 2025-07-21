import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://server-y78j.onrender.com', 
  withCredentials: true, 
});

export default instance;

import axios from 'axios';
const BASE_URL = import.meta.env.BASE_URL;

const api = axios.create({
  baseURL: BASE_URL, // Ensure the API URL is set in your .env file
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:30000/api', // Adjust with NodePort or Ingress
});

export default api;

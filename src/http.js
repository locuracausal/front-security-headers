
import axios from 'axios';

// Puedes configurar las variables de entorno aquí si es necesario
// import { API_URL } from './config';
const apiUrl =  import.meta.env.VITE_API_DOMAIN
const http = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // Aquí puedes establecer opciones globales para Axios
});

export const fetchData = async (endpoint, params) => {
  try {
    const response = await http.get(endpoint, { params });
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await http.post(endpoint, data);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error('Error posting data:', error);
    throw error;
  }
};
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://80tx8b6k-3000.brs.devtunnels.ms', // Asegúrate de que esta URL sea correcta
    headers: {
        'Content-Type': 'application/json'
    }
});


export default api;

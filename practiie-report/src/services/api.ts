import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sh6x62b2-3000.use2.devtunnels.ms/', // URL correcta del backend
    headers: {
        'Content-Type': 'application/json'
    }
});



export default api;

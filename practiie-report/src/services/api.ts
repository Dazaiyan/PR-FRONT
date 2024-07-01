import axios from 'axios';

const api = axios.create({
    baseURL: 'https://23k9vt4z-3000.use.devtunnels.ms/',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;

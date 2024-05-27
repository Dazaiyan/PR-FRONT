// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://s6qc8316-3000.use2.devtunnels.ms/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

// IMPORT LIB AXIOS
import axios from 'axios';

// CREATE GLOBAL ENDPOINT
const Api = axios.create({
    // SET DEFAULT ENDPOINT API
    baseURL: 'http://localhost:8000/api',
});

export default Api;

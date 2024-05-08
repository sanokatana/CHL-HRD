import axios from 'axios';
import store from '@/store'

axios.defaults.baseURL = process.env.VUE_APP_DB_PATH // the prefix of the URL
axios.defaults.headers.get['Accept'] = 'application/json'   // default header for all get request
axios.defaults.headers.post['Accept'] = 'application/json'  // default header for all POST request

axios.interceptors.request.use(function (config) { // Initiate authorization header with token for every request
    const token = store.getters.getJWT;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    // if (config.url.includes("/upload")) config.headers['Content-Type'] = 'multipart/form-data';
    return config;
});

let limit = "_limit=-1&";

export default class Backend {

    get baseURL() {
        return process.env.VUE_APP_DB_PATH
    }
    
    get user() {
        return {
            // Login
            login: (data) => axios.post('/api/auth/login', data),

            // Fetch user data
            findUser: () => axios.get('/api/auth/user')
        }
    }
}

import axios from 'axios';
import useBoundStore from '../store';

const API_URL = process.env.REACT_APP_API_URL;
const API_PREFIX = process.env.REACT_APP_API_PREFIX;


console.log(API_URL, API_PREFIX);
const api = axios.create({
    baseURL: `${API_URL}${API_PREFIX}`,
});


api.interceptors.request.use(
    function (config) {

        useBoundStore.setState({ loading: true });
        try {
            const sessionToken = localStorage.getItem("sessionToken");
            config.headers['Session-ID'] = sessionToken;
        } catch (error) {
            console.log(error);
        }
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    }

);

// Interceptors
api.interceptors.response.use(
    (config) => {
        useBoundStore.setState({ loading: false });
        console.log(config);
        return config;
    },
    async (error) => {

        useBoundStore.setState({ loading: false });
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                const response = await axios.get(`${API_URL}${API_PREFIX}/createSession`)

                const data = await response.data;
                localStorage.setItem('sessionToken', data);
                api.defaults.headers.common['Session-ID'] = data
                return api.request(originalRequest);
            } catch (err) {
                console.error(error.message);
            }
        }
        throw error;
    }
);

export default api;
import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },
})

request.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
        const {headers} = config;
        return {
            ...config,
            headers: {
                ...headers,
                'Access-Token': `Token ${accessToken}`,
            },
        };
    }
    return config;
});
export default request
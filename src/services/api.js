import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

const godataApi = axios.create({
    baseURL: 'https://inclusaodigital.unb.br'
});

axios.defaults.responseType = 'json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

export { api, godataApi };
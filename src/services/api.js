import axios from 'axios';

const baseURL = 'localhost:3001';

axios.defaults.baseURL = baseURL;
axios.defaults.responseType = 'json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

export default axios;
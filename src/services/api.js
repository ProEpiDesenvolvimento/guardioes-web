import axios from 'axios';

// const baseURL = 'http://gds.proepi.org.br';
// const baseURL = 'https://gds.guardioes.lappis.rocks';
const baseURL = 'http://localhost:3001';

axios.defaults.baseURL = baseURL;
axios.defaults.responseType = 'json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

export default axios;
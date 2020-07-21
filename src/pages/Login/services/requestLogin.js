import api from 'services/api';

const requestLogin = async (email, password, userType) => {
    const url = `/${userType}/login`
    api.post(url, {[userType]: {email, password}})
    .then(async (res) => {
        const response = { headers: { authorization }, data: requestData } = res;
        return response
    })
    .catch((e) => {
        alert('Falha no login');
        console.log(e);
    });
}
export default requestLogin;

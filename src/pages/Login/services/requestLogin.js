import { api } from 'services/api';

const requestLogin = async (email, password, userType) =>
    api.post(`/${userType}/login`, { [userType]: { email, password } })
        .then(async (res) => {
            const response = { authorization: res.headers.authorization, user: res.data };
            return response
        })
        .catch((e) => {
            alert('Algo deu errado, tente novamente!');
            console.log(e);
            return { authorization: "", user: {} }
        });
export default requestLogin;

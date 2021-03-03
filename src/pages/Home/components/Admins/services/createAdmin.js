import { api } from 'services/api';

const createAdmin = async (data, token) => {
    await api.post(`/admin/signup`, data, {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        alert('Admin criado!');
        const response = { data: res.data };
        return response;
    })
    .catch((e) => {
        alert('Algo deu errado, tente novamente!');
        console.log(e);
        return { data: {}, errors: e }
    });
}

export default createAdmin;
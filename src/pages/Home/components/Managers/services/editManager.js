import { api } from 'services/api';

const editManager = async (id, data, token) => {
    await api.patch(`/managers/${id}`, data,
    {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        alert('Gerente Editado!');
        const response = { data: res.data };
        return response;
    })
    .catch((e) => {
        alert(e);
        console.log(e);
        return { data: {}, errors: e };
    });
}

export default editManager;
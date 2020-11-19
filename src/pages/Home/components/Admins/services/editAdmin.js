import api from 'services/api';

const editAdmin = async (id, data, token) => {
    await api.patch(`/admin/${id}`, data,
    {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        alert('Admin Editado!');
        const response = { data: res.data };
        return response;
    })
    .catch((e) => {
        alert('Algo deu errado, tente novamente!');
        console.log(e);
        return { data: {}, errors: e };
    });
}

export default editAdmin;
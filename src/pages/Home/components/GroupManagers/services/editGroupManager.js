import api from 'services/api';

const editGroupManager = async (id, data, token) => {
    await api.patch(`/group_managers/${id}`, data,
    {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        alert('Gerente de Instituição Editado!');
        const response = { data: res.data };
        return response;
    })
    .catch((e) => {
        alert(e);
        console.log(e);
        return { data: {}, errors: e };
    });
}

export default editGroupManager;
import { api } from 'services/api';

const editUser = async (id, userType, data, token) =>
    await api.patch(`/${userType}s/${id}`, data,
    {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        alert('Seu Perfil foi Editado!');
        const response = { data: res.data };
        return response;
    })
    .catch((e) => {
        alert(e);
        console.log(e);
        return { data: {}, errors: e };
    });

export default editUser;
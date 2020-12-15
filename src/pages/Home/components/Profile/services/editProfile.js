import api from 'services/api';

const editProfile = async (id, userType, data, token) => {
    await api.patch(`/${userType}/${id}`, data,
    {
        headers: {
            "Authorization": token,
        }
    }
    )
    .then(async (res) => {
        alert('Perfil Editado!');
        const response = { data: res.data };
        return response;
    })
    .catch((e) => {
        alert(e);
        console.log(e);
        return { data: {}, errors: e };
    });
}

export default editProfile;
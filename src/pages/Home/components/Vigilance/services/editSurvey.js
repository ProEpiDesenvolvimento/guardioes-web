import api from 'services/api';

const editSurvey = async (userID, id, data, token) => {
    api.patch(`/users/${userID}/surveys/${id}`, data, {
        headers: {
            "Authorization": token,
        },
    })
    .then(async (res) => {
        const { data } = res;
        return data
    })
    .catch((e) => {
        alert("Erro ao mudar status da Survey.");
        window.location.reload();
        return { data: {}, errors: e };
    });
}

export default editSurvey;

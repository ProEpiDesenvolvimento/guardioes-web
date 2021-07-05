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
        console.log(e);
        return { data: {}, errors: e };
    });
}

export default editSurvey;
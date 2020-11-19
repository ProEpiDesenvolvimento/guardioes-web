import api from 'services/api';

const getAllAdmins = async (token) => {
    api.get('/admin', {
        headers: {
            "Authorization": token,
        },
    }
    )
    .then(async (res) => {
        const { data } = res;
        return data;
    })
    .catch((e) => {
        console.log(e);
        return { data: {}, errors: e }
    });
}

export default getAllAdmins;